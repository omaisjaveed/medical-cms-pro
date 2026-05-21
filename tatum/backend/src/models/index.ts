import sequelize from "../config/database";
import User from "./User";
import Page from "./Page";
import Section from "./Section";
import Setting from "./Setting";
import Media from "./Media";
import Inquiry from "./Inquiry";
import BlogPost from "./BlogPost";
import Service from "./Service";
import Gallery from "./Gallery";
import Testimonial from "./Testimonial";

export {
  sequelize,
  User,
  Page,
  Section,
  Setting,
  Media,
  Inquiry,
  BlogPost,
  Service,
  Gallery,
  Testimonial,
};

const models = {
  sequelize,
  User,
  Page,
  Section,
  Setting,
  Media,
  Inquiry,
  BlogPost,
  Service,
  Gallery,
  Testimonial,
};

export default models;
