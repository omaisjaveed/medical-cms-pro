import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import sequelize from "../config/database";
import { User, Setting, Page, Section, Service, Gallery, Testimonial, BlogPost } from "../models/index";
import { settings, pages, blogPosts, services, galleries, testimonials } from "./seedData";

dotenv.config();

const createAdminUser = async () => {
  const passwordHash = await bcrypt.hash("Admin@1234", 10);
  const [admin] = await User.findOrCreate({
    where: { email: "admin@tatumwellness.com" },
    defaults: {
      name: "Super Admin",
      email: "admin@tatumwellness.com",
      password: passwordHash,
      role: "SuperAdmin",
      status: "Active",
    },
  });
  return admin;
};

const clearData = async () => {
  await Testimonial.destroy({ where: {} });
  await Gallery.destroy({ where: {} });
  await Service.destroy({ where: {} });
  await Section.destroy({ where: {} });
  await Page.destroy({ where: {} });
  await BlogPost.destroy({ where: {} });
  await Setting.destroy({ where: {} });
  await User.destroy({ where: { role: "SuperAdmin" } });
};

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });

    await clearData();
    const admin = await createAdminUser();

    // Seed settings
    for (const item of settings) {
      await Setting.create(item);
    }

    // Seed pages
    for (const page of pages) {
      const { sections, ...pageAttributes } = page;
      const record = await Page.create(
        { 
          ...pageAttributes, 
          status: "Published",
          sections: sections || []
        },
        { 
          include: [{ model: Section, as: "sections" }] 
        }
      );
      if (!record) {
        console.warn(`Page not created: ${page.slug}`);
      }
    }

    // Seed services - first parents, then children
    const parentServices = services.filter(s => s.parent_id === null);
    const childServices = services.filter(s => s.parent_id !== null);
    
    // Create parent services first
    const parentMap: Record<number, number> = {};
    for (const service of parentServices) {
      const created = await Service.create(service) as any;
      parentMap[service.order] = created.id;
    }
    
    // Create child services with correct parent IDs
    for (const service of childServices) {
      const correctParentId = parentMap[service.parent_id] || null;
      await Service.create({ ...service, parent_id: correctParentId });
    }

    // Seed galleries
    for (const gallery of galleries) {
      await Gallery.create(gallery);
    }

    // Seed testimonials
    for (const testimonial of testimonials) {
      await Testimonial.create(testimonial);
    }

    // Seed blog posts
    for (const post of blogPosts) {
      await BlogPost.create({
        ...post,
        author_id: admin.id,
        status: "Published",
        published_at: post.published_at ? new Date(post.published_at) : new Date(),
      });
    }

    console.log("Database seeding completed successfully.");
    console.log("Admin credentials: admin@tatumwellness.com / Admin@1234");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
