import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faImage,
  faChevronDown, 
  faChevronUp, 
  faGripVertical, 
  faEye,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "./components/RichTextEditor";
import api from "../services/api";
import { toast } from "react-hot-toast";
import "./admin.css";

interface Section {
  id?: number;
  type: string;
  title?: string;
  order: number;
  content: any;
}

interface Page {
  id?: number;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  status: string;
  sections: Section[];
}

interface GlobalItem {
  id: number;
  title?: string;
  heading?: string;
  name?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

interface TeamMemberItem {
  name: string;
  designation?: string;
  description: string;
  imageKey?: string;
  readMoreLink?: string;
}

const defaultHeroSlides = [
  {
    id: 1,
    mainHeading: "Disc Injuries Can Cause You to Miss Out on Enjoying Life",
    mainParagraph: "",
    secondHeading: "Get Treatment Today",
    button1Text: "Learn More",
    button1Link: "/disc-injury",
    button2Text: "Text Us",
    button2Link: "sms:4805138900",
    imageKey: "tatum-slider",
  },
  {
    id: 2,
    mainHeading: "99$ New Patient Special",
    mainParagraph: "Include Consultation Exam, and First Treatment",
    secondHeading: "Get Treatment Today",
    button1Text: "Learn More",
    button1Link: "/contact-us",
    button2Text: "Text Us",
    button2Link: "sms:4805138900",
    imageKey: "tatum-slider",
  },
];

const isHomePage = (page: Page | null) => {
  if (!page) return false;
  const slug = (page.slug || "").trim().toLowerCase();
  const title = (page.title || "").trim().toLowerCase();
  return slug === "" || slug === "home" || title === "home";
};

const isAboutPage = (page: Page | null) => {
  if (!page) return false;
  const slug = (page.slug || "").trim().toLowerCase();
  const title = (page.title || "").trim().toLowerCase();
  return slug === "about-us" || title === "about us";
};

const isMeetDoctorPage = (page: Page | null) => {
  if (!page) return false;
  return (page.slug || "").trim().toLowerCase() === "meet-the-doctor";
};

const isToolsPage = (page: Page | null) => {
  if (!page) return false;
  return (page.slug || "").trim().toLowerCase() === "tools-of-the-trade";
};

const isTeamPage = (page: Page | null) => {
  if (!page) return false;
  return (page.slug || "").trim().toLowerCase() === "meet-the-team";
};

const sectionMatchesBlueprint = (section: Section, key: string) => {
  const sectionTitle = section.title?.toLowerCase() || "";
  const contentTitle = section.content?.title?.toLowerCase() || "";

  switch (key) {
    case "hero":
      return section.type === "hero";
    case "infoBoxes":
      return section.type === "infoBoxes";
    case "about":
      return section.type === "content" && !section.content?.reverse && !contentTitle.includes("doctor") && !sectionTitle.includes("doctor");
    case "services":
      return section.type === "servicesCarousel";
    case "chiropractic":
      return section.type === "content" && !!section.content?.reverse && !contentTitle.includes("doctor") && !sectionTitle.includes("doctor");
    case "doctor":
      return section.type === "content" && (contentTitle.includes("doctor") || sectionTitle.includes("doctor"));
    case "gallery":
      return section.type === "gallery";
    case "blogs":
      return section.type === "blogSlider";
    default:
      return false;
  }
};

const buildHomePageBlueprint = (
  services: GlobalItem[],
  blogs: GlobalItem[],
  galleryItems: GlobalItem[]
): Section[] => {
  const featuredServiceIds = services
    .filter((item) => item.is_featured)
    .slice(0, 6)
    .map((item) => item.id);
  const fallbackServiceIds = services.slice(0, 6).map((item) => item.id);
  const blogIds = blogs.slice(0, 3).map((item) => item.id);
  const activeGalleryId = galleryItems.find((item) => item.is_active)?.id;
  const fallbackGalleryId = galleryItems[0]?.id;

  return [
    {
      type: "hero",
      title: "Home Hero",
      order: 0,
      content: [
        {
          id: 1,
          mainHeading: "Experience Better Health",
          mainParagraph: "Tatum Chiropractic and Wellness provides comprehensive care for your entire family.",
          secondHeading: "Wellness for Life",
          button1Text: "Learn More",
          button1Link: "/about-us",
          button2Text: "Book Now",
          button2Link: "https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670",
          imageKey: "tatum-slider",
        }
      ],
    },
    {
      type: "infoBoxes",
      title: "Home Info Boxes",
      order: 1,
      content: {
        items: [
          {
            title: "New Patients",
            desc: "Welcome to Cave Creek, AZ! Welcome to Tatum Chiropractic and Wellness. We focus on your unique health situation.",
            imageKey: "info-1",
          },
          {
            title: "Our Services",
            desc: "Over the years, we have used chiropractic care to improve the lives of countless patients.",
            imageKey: "info-2",
            highlight: true,
          },
          {
            title: "Contact Us",
            desc: "Have questions? Our friendly team is here to help. Reach out to us today for more information.",
            imageKey: "info-3",
          },
        ],
      },
    },
    {
      type: "content",
      title: "Home About",
      order: 2,
      content: {
        title: "CHIROPRACTIC CARE IN CAVE CREEK, AZ",
        text: "Trying to find an experienced chiropractor near you? Welcome to Tatum Chiropractic and Wellness, located in Cave Creek, Arizona! Chiropractic is one of the most amazing healthcare professions, but very few people understand what it's all about. We are here to help you gain a basic understanding of how our Cave Creek chiropractors can help you and your family.\n\n<strong>HOW CAN WE HELP?</strong>\nOver the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas.",
        imageKey: "about-img",
      },
    },
    {
      type: "servicesCarousel",
      title: "Home Services",
      order: 3,
      content: {
        title: "Our Professional Services",
        description: "Over the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas.",
        serviceIds: featuredServiceIds.length ? featuredServiceIds : fallbackServiceIds,
      },
    },
    {
      type: "content",
      title: "Home Advanced Techniques",
      order: 4,
      content: {
        title: "Advanced Chiropractic Techniques",
        text: "At Tatum Chiropractic and Wellness, we use a variety of proven techniques to help you achieve optimal health. Whether you are dealing with chronic pain or a recent injury, our personalized approach ensures you get the care you need.",
        imageKey: "chiro-img",
        reverse: true,
      },
    },
    {
      type: "content",
      title: "Home Meet Doctor",
      order: 5,
      content: {
        title: "MEET THE DOCTOR",
        text: "Dr. Tim Lind is originally from Central Oregon, where he practiced chiropractic for 28 years. He recently relocated to Phoenix with his wife, Shelley, to spend more time with their grown daughters and enjoy all Arizona has to offer.\n\n<strong>Dr. Tim Lind D.C.</strong>\nChiropractor",
        imageKey: "doctor",
      },
    },
    {
      type: "gallery",
      title: "Home Gallery",
      order: 6,
      content: {
        title: "CLINIC GALLERY",
        galleryIds: activeGalleryId ? [activeGalleryId] : fallbackGalleryId ? [fallbackGalleryId] : [],
      },
    },
    {
      type: "blogSlider",
      title: "Home Blogs",
      order: 7,
      content: {
        title: "OUR BLOGS",
        blogIds,
      },
    },
  ];
};

const buildAboutPageBlueprint = (): Section[] => {
  return [
    {
      type: "hero",
      title: "About Hero",
      order: 0,
      content: {
        title: "About Us",
        subtitle: "Discover why patients trust Tatum Chiropractic and Wellness for holistic care in Cave Creek.",
        imageKey: "inner-about-1",
      },
    },
    {
      type: "content",
      title: "About Intro",
      order: 1,
      content: {
        title: "Chiropractic Care in Cave Creek, AZhiropractic & Wellness",
        text: "Trying to find an experienced chiropractor near you? Welcome to Tatum Chiropractic and Wellness, located in Cave Creek, Arizona! Chiropractic is one of the most amazing healthcare professions, but very few people understand what it's all about. We are here to help you gain a basic understanding of how our Cave Creek chiropractors can help you and your family.",
        imageKey: "inner-about-1",
      },
    },
    {
      type: "content",
      title: "About Help",
      order: 2,
      content: {
        title: "How Can We Help?",
        text: "Over the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas. Chiropractic care is the practice of using spinal alignment to alleviate a wide variety of physical ailments, including muscle strain, neck pain, chronic back pain, and more. This is accomplished by adjusting the position of the spinal column to its proper shape, providing a non-invasive solution for pain relief.",
        imageKey: "inner-about-2",
        reverse: true,
      },
    },
  ];
};

const buildMeetDoctorBlueprint = (): Section[] => {
  return [
    {
      type: "hero",
      title: "Meet Doctor Hero",
      order: 0,
      content: {
        title: "Meet The Doctor",
        subtitle: "Learn more about Dr. Tim Lind and his approach to patient-centered chiropractic care.",
        imageKey: "doctor",
      },
    },
    {
      type: "content",
      title: "Meet Doctor Content",
      order: 1,
      content: {
        title: "Dr. Tim Lind D.C.",
        text: "Dr. Tim Lind is originally from Central Oregon, where he practiced chiropractic for 28 years. He recently relocated to Phoenix with his wife, Shelley, to spend more time with their grown daughters and enjoy all Arizona has to offer.\n\nDr. Lind graduated from Los Angeles Chiropractic College in 1990. He enjoys treating individuals based on their particular needs, using a variety of techniques to help with both acute and chronic conditions.\n\nDr. Lind is skilled in adjusting techniques including Gonstead, Thompson drop table, flexion/distraction, diversified, and the use of instrument adjusting. He has completed over 300 hours of post-graduate studies, including functional neurology, functional medicine, functional blood work analysis, endocrinology, neurotransmitters, and the non-surgical treatment of disc degeneration, herniation, and bulging spinal discs. He also utilizes trigenics, which helps restore joint and extremity function.\n\nDr. Lind enjoys playing golf, fly fishing and fly tying, hiking, and time with his family and friends.",
        imageKey: "doctor",
      },
    },
  ];
};

const buildToolsBlueprint = (): Section[] => {
  return [
    {
      type: "hero",
      title: "Tools Hero",
      order: 0,
      content: {
        title: "Tools of the Trade",
        subtitle: "Learn about the chiropractic tools and technologies used to support treatment and recovery.",
        imageKey: "gallery-5",
      },
    },
    {
      type: "content",
      title: "Tools Intro",
      order: 1,
      content: {
        title: "Tools of the Trade",
        text: "When you have pain and discomfort in the body, chiropractic treatment can help offer solutions. Based on your situation, a chiropractor in Phoenix, AZ can plan a treatment plan tailored to help ease or alleviate symptoms related to injuries, health complications, or for overall wellness. A treatment plan created by Dr. Tim Lind and his team might involve the use of one or multiple chiropractic tools, as briefly described below. A visit to Tatum Chiropractic allows you to get chiropractic therapy backed by innovative technologies, tools, and a trained and knowledgeable team.",
        imageKey: "gallery-5",
      },
    },
    {
      type: "content",
      title: "Tools Details",
      order: 2,
      content: {
        title: "Chiropractic Care Backed by Inventive Tools and Technologies",
        text: "Dr. Lind uses an Arthrostim, which provides relief in particular parts of the body. The tool helps to provide adjustments and manipulations in a precise, low-force, and comfortable way. Individuals experiencing severe pain are able to benefit from Arthrostim.\n\nFor those with chronic low back pain, the chiropractic team at Tatum Chiropractic may choose to utilize the Flexion Distraction Table. This allows the team to utilize chiropractic technique to safely adjust the spine therapeutically to alleviate pain and take off pressure from the lumbar. The Flexion-Distraction Table is suitable for use in reducing disc protrusion, increasing flexibility of tendons and ligaments, and reducing the effects of sciatica.",
        imageKey: "about-img",
        reverse: true,
      },
    },
    {
      type: "richText",
      title: "Tools Extra Text",
      order: 3,
      content: {
        title: "More Tools and Technologies",
        text: "<p>We may use our <strong>Drop Table</strong> when choosing to treat pain with less force to get the spinal column in place. This body manipulation and adjustment technique mostly uses gravity to enhance the movement.</p><p>Tatum Chiropractic also has a <strong>Percussor</strong>. This device helps distribute waves into the tissues of the body. The percussive impulses from the waves promote the flow and circulation of lymphatic fluid. We are able to treat a variety of conditions with this handheld tool, including loosening fixed areas like scar tissue, loosening tight muscles, releasing joints, and reducing muscle spasms. We also employ Release Muscle Stimulation, which helps improve pain and swelling in joints.</p><p>To find out more about our chiropractic techniques and the tools and technologies we utilize to facilitate effective treatment, talk to us at Tatum Chiropractic. Dr. Tim Lind's team will be happy to discuss ways they can help alleviate pain and restore comfort in your body.</p>",
      },
    },
  ];
};

const buildTeamBlueprint = (): Section[] => {
  return [
    {
      type: "hero",
      title: "Meet Team Hero",
      order: 0,
      content: {
        title: "Meet The Team",
        subtitle: "Meet the people behind Tatum Wellness and learn more about their care experience.",
        imageKey: "jessica-fields",
      },
    },
    {
      type: "teamMembers",
      title: "Team Members",
      order: 1,
      content: {
        members: [
          {
            name: "Jessica Fields",
            description: "Jessica Fields was born in Illinois. She moved to Arizona in 1990, from Davenport, IA, after her Mother completed Palmer College of Chiropractic. Jessica's family has four generations of Chiropractors.",
            imageKey: "jessica-fields",
            readMoreLink: "/jessica-fields",
          },
          {
            name: "Angela Ajamie",
            designation: "Massage Therapist LMT",
            description: "Angela Ajamie, LMT, has been practicing massage for over 25 years. Her journey began when...",
            imageKey: "angela-ajamie",
            readMoreLink: "/angela-ajamie",
          },
        ] as TeamMemberItem[],
      },
    },
  ];
};

const cloneContent = (value: any) => JSON.parse(JSON.stringify(value ?? {}));

const isNumericKeyObject = (value: any) => {
  if (!value || Array.isArray(value) || typeof value !== "object") return false;
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((key) => /^\d+$/.test(key));
};

const rebuildStringFromNumericObject = (value: Record<string, string>) =>
  Object.keys(value)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => value[key] ?? "")
    .join("");

const normalizeSectionContent = (value: any): any => {
  if (typeof value === "string") {
    try {
      return normalizeSectionContent(JSON.parse(value));
    } catch {
      return value;
    }
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeSectionContent(item));
  }

  if (isNumericKeyObject(value)) {
    return normalizeSectionContent(rebuildStringFromNumericObject(value as Record<string, string>));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [key, normalizeSectionContent(entryValue)])
    );
  }

  return value;
};

const normalizeSection = (section: Section): Section => ({
  ...section,
  content: section.type === "hero"
    ? (() => {
        const normalizedHeroContent = normalizeSectionContent(section.content);
        if (Array.isArray(normalizedHeroContent)) {
          const validSlides = normalizedHeroContent.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              (
                "mainHeading" in item ||
                "title" in item ||
                "secondHeading" in item ||
                "subtitle" in item ||
                "imageKey" in item
              )
          );
          return validSlides.length > 0 ? validSlides : cloneContent(defaultHeroSlides);
        }
        if (
          normalizedHeroContent &&
          typeof normalizedHeroContent === "object" &&
          (
            "mainHeading" in normalizedHeroContent ||
            "title" in normalizedHeroContent ||
            "secondHeading" in normalizedHeroContent ||
            "subtitle" in normalizedHeroContent ||
            "imageKey" in normalizedHeroContent
          )
        ) {
          return normalizedHeroContent;
        }
        return cloneContent(defaultHeroSlides);
      })()
    : normalizeSectionContent(section.content),
});

const normalizePage = (page: Page): Page => ({
  ...page,
  sections: Array.isArray(page.sections) ? page.sections.map(normalizeSection) : [],
});

const normalizeSectionPayload = (section: Section) => ({
  type: section.type,
  title: section.title || "",
  order: Number.isFinite(section.order) ? section.order : 0,
  content: normalizeSectionContent(cloneContent(section.content)),
});

function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editPage, setEditPage] = useState<Page | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [sectionForm, setSectionForm] = useState<Section | null>(null);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
  const [mediaTarget, setMediaTarget] = useState<any>(null);
  
  // Global items for mapping
  const [services, setServices] = useState<GlobalItem[]>([]);
  const [blogs, setBlogs] = useState<GlobalItem[]>([]);
  const [testimonials, setTestimonials] = useState<GlobalItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GlobalItem[]>([]);

  useEffect(() => {
    fetchPages();
    fetchGlobalData();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await api.getAllPages();
      setPages(Array.isArray(data.data) ? data.data.map(normalizePage) : []);
    } catch (err: any) {
      setError(err.message || "Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalData = async () => {
    try {
      const [sRes, bRes, tRes, gRes] = await Promise.all([
        api.getServices(),
        api.getBlogs(),
        api.getTestimonials(),
        api.getGallery()
      ]);
      setServices(sRes.data || []);
      setBlogs(bRes.data || []);
      setTestimonials(tRes.data || []);
      setGalleryItems(gRes.data || []);
    } catch (err) {
      console.error("Failed to load global data for mapping", err);
    }
  };

  const fetchMedia = async (target: any) => {
    try {
      const response = await api.getMedia();
      setMediaLibrary(response.data || []);
      setMediaTarget(target);
      setShowMediaPicker(true);
    } catch (err) {
      console.error("Failed to load media", err);
      toast.error("Failed to load media library");
    }
  };

  const applySelectedMedia = (item: any) => {
    if (!mediaTarget) return;
    const mediaKey = item.url?.replace(/\.[^/.]+$/, "") || "";

    setSectionForm((prev) => {
      if (!prev) return prev;

      if (mediaTarget.type === "hero") {
        const heroSlides = Array.isArray(prev.content) ? [...prev.content] : [];
        heroSlides[mediaTarget.index] = {
          ...heroSlides[mediaTarget.index],
          imageKey: mediaKey,
        };
        return { ...prev, content: heroSlides };
      }

      if (mediaTarget.type === "content") {
        return {
          ...prev,
          content: {
            ...prev.content,
            imageKey: mediaKey,
          },
        };
      }

      if (mediaTarget.type === "infoBox") {
        const items = Array.isArray(prev.content?.items) ? [...prev.content.items] : [];
        items[mediaTarget.index] = {
          ...items[mediaTarget.index],
          imageKey: mediaKey,
        };
        return {
          ...prev,
          content: {
            ...prev.content,
            items,
          },
        };
      }

      if (mediaTarget.type === "teamMember") {
        const members = Array.isArray(prev.content?.members) ? [...prev.content.members] : [];
        members[mediaTarget.index] = {
          ...members[mediaTarget.index],
          imageKey: mediaKey,
        };
        return {
          ...prev,
          content: {
            ...prev.content,
            members,
          },
        };
      }

      return prev;
    });

    setShowMediaPicker(false);
    setMediaTarget(null);
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPage) return;
    const loadingToast = toast.loading(editPage.id ? "Updating page..." : "Creating page...");
    try {
      if (editPage.id) {
        await api.updatePage(editPage.id, editPage);
        toast.success("Page updated successfully", { id: loadingToast });
      } else {
        await api.createPage(editPage);
        toast.success("Page created successfully", { id: loadingToast });
      }
      setShowEditor(false);
      setEditPage(null);
      fetchPages();
    } catch (err: any) {
      toast.error(err.message || "Failed to save page", { id: loadingToast });
    }
  };

  const handleAddSection = () => {
    setSectionForm({ 
      type: "content", 
      title: "New Section", 
      order: editPage?.sections.length || 0, 
      content: { title: "", text: "" } 
    });
    setShowSectionModal(true);
  };

  const handleGenerateHomeSections = async () => {
    if (!editPage?.id) return;

    const blueprint = buildHomePageBlueprint(services, blogs, galleryItems);
    const keys = ["hero", "infoBoxes", "about", "services", "chiropractic", "doctor", "gallery", "blogs"];
    const loadingToast = toast.loading("Importing old home page content...");
    try {
      for (let index = 0; index < blueprint.length; index += 1) {
        const blueprintSection = { ...blueprint[index], order: index };
        const existingSection = editPage.sections.find((section) => sectionMatchesBlueprint(section, keys[index]));

        if (existingSection?.id) {
          await api.updateSection(existingSection.id, {
            ...existingSection,
            title: blueprintSection.title,
            order: blueprintSection.order,
            content: blueprintSection.content,
          });
        } else {
          await api.addSection(editPage.id!, blueprintSection);
        }
      }

      const data = await api.getPageById(editPage.id);
      setEditPage(normalizePage(data.data));
      toast.success("Old frontend home content imported successfully.", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to import old home content", { id: loadingToast });
    }
  };

  const handleGenerateAboutSections = async () => {
    if (!editPage?.id) return;

    const blueprint = buildAboutPageBlueprint();
    const loadingToast = toast.loading("Importing old about page content...");

    try {
      const existingHero = editPage.sections.find((section) => section.type === "hero");
      const contentSections = [...editPage.sections]
        .filter((section) => section.type === "content")
        .sort((a, b) => a.order - b.order);

      for (let index = 0; index < blueprint.length; index += 1) {
        const blueprintSection = { ...blueprint[index], order: index };
        const existingSection =
          blueprintSection.type === "hero"
            ? existingHero
            : contentSections[index - 1];

        if (existingSection?.id) {
          await api.updateSection(existingSection.id, {
            ...existingSection,
            title: blueprintSection.title,
            order: blueprintSection.order,
            content: blueprintSection.content,
          });
        } else {
          await api.addSection(editPage.id, blueprintSection);
        }
      }

      const data = await api.getPageById(editPage.id);
      setEditPage(normalizePage(data.data));
      toast.success("Old about page content imported successfully.", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to import old about content", { id: loadingToast });
    }
  };

  const handleGenerateMeetDoctorSections = async () => {
    if (!editPage?.id) return;

    const blueprint = buildMeetDoctorBlueprint();
    const loadingToast = toast.loading("Importing old meet the doctor content...");

    try {
      const existingHero = editPage.sections.find((section) => section.type === "hero");
      const existingContent = editPage.sections.find((section) => section.type === "content");

      for (let index = 0; index < blueprint.length; index += 1) {
        const blueprintSection = { ...blueprint[index], order: index };
        const existingSection = blueprintSection.type === "hero" ? existingHero : existingContent;

        if (existingSection?.id) {
          await api.updateSection(existingSection.id, {
            ...existingSection,
            title: blueprintSection.title,
            order: blueprintSection.order,
            content: blueprintSection.content,
          });
        } else {
          await api.addSection(editPage.id, blueprintSection);
        }
      }

      const data = await api.getPageById(editPage.id);
      setEditPage(normalizePage(data.data));
      toast.success("Old meet the doctor content imported successfully.", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to import meet the doctor content", { id: loadingToast });
    }
  };

  const handleGenerateToolsSections = async () => {
    if (!editPage?.id) return;

    const blueprint = buildToolsBlueprint();
    const loadingToast = toast.loading("Importing old tools of the trade content...");

    try {
      const existingHero = editPage.sections.find((section) => section.type === "hero");
      const contentSections = [...editPage.sections]
        .filter((section) => section.type === "content")
        .sort((a, b) => a.order - b.order);
      const existingRichText = editPage.sections.find((section) => section.type === "richText");

      for (let index = 0; index < blueprint.length; index += 1) {
        const blueprintSection = { ...blueprint[index], order: index };
        let existingSection: Section | undefined;

        if (blueprintSection.type === "hero") {
          existingSection = existingHero;
        } else if (blueprintSection.type === "content") {
          existingSection = contentSections.shift();
        } else if (blueprintSection.type === "richText") {
          existingSection = existingRichText;
        }

        if (existingSection?.id) {
          await api.updateSection(existingSection.id, {
            ...existingSection,
            title: blueprintSection.title,
            order: blueprintSection.order,
            content: blueprintSection.content,
          });
        } else {
          await api.addSection(editPage.id, blueprintSection);
        }
      }

      const data = await api.getPageById(editPage.id);
      setEditPage(normalizePage(data.data));
      toast.success("Old tools content imported successfully.", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to import tools content", { id: loadingToast });
    }
  };

  const handleGenerateTeamSections = async () => {
    if (!editPage?.id) return;

    const blueprint = buildTeamBlueprint();
    const loadingToast = toast.loading("Importing old meet the team content...");

    try {
      const existingHero = editPage.sections.find((section) => section.type === "hero");
      const existingTeamMembers = editPage.sections.find((section) => section.type === "teamMembers");

      for (let index = 0; index < blueprint.length; index += 1) {
        const blueprintSection = { ...blueprint[index], order: index };
        const existingSection = blueprintSection.type === "hero" ? existingHero : existingTeamMembers;

        if (existingSection?.id) {
          await api.updateSection(existingSection.id, {
            ...existingSection,
            title: blueprintSection.title,
            order: blueprintSection.order,
            content: blueprintSection.content,
          });
        } else {
          await api.addSection(editPage.id, blueprintSection);
        }
      }

      const data = await api.getPageById(editPage.id);
      setEditPage(normalizePage(data.data));
      toast.success("Old meet the team content imported successfully.", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to import meet the team content", { id: loadingToast });
    }
  };

  const handleEditSection = (section: Section) => {
    setSectionForm({
      ...section,
      content: normalizeSectionContent(cloneContent(section.content)),
    });
    setShowSectionModal(true);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPage || !sectionForm) return;
    const loadingToast = toast.loading(sectionForm.id ? "Updating section..." : "Adding section...");
    const payload = normalizeSectionPayload(sectionForm);
    try {
      if (sectionForm.id) {
        await api.updateSection(sectionForm.id, payload);
        toast.success("Section updated successfully", { id: loadingToast });
      } else if (editPage.id) {
        await api.addSection(editPage.id, payload);
        toast.success("Section added successfully", { id: loadingToast });
      }
      
      setShowSectionModal(false);
      setSectionForm(null);
      
      // Refresh editPage
      if (editPage.id) {
        const data = await api.getPageById(editPage.id);
        setEditPage(normalizePage(data.data));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save section", { id: loadingToast });
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm("Delete this section?")) return;
    const loadingToast = toast.loading("Deleting section...");
    try {
      await api.deleteSection(sectionId);
      toast.success("Section deleted successfully", { id: loadingToast });
      if (editPage?.id) {
        const data = await api.getPageById(editPage.id);
        setEditPage(normalizePage(data.data));
      }
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: loadingToast });
    }
  };

  const openPageEditor = async (page: Page) => {
    if (page.id) {
      try {
        const data = await api.getPageById(page.id);
        if (data.success) {
          setEditPage(normalizePage(data.data));
          setShowEditor(true);
        } else {
          alert("Page data not found on server.");
        }
      } catch (err) {
        alert("Error loading page. It might have been deleted or the server is down.");
        console.error(err);
      }
    } else {
      setEditPage({ slug: "", title: "", status: "Published", sections: [] });
      setShowEditor(true);
    }
  };

  const moveSection = async (sectionId: number, direction: 'up' | 'down') => {
    if (!editPage) return;
    const index = editPage.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === editPage.sections.length - 1) return;

    const newSections = [...editPage.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];

    // Update orders locally first
    newSections.forEach((s, idx) => s.order = idx);
    setEditPage({ ...editPage, sections: newSections });

    // Sync with backend (ideally we'd have a bulk order update endpoint)
    try {
      await Promise.all(newSections.map(s => s.id ? api.updateSection(s.id, { order: s.order }) : null));
    } catch (err) {
      console.error("Failed to sync section orders", err);
    }
  };

  const renderSectionBlueprintFields = () => {
    if (!sectionForm) return null;
    const { type, content } = sectionForm;

    const updateContent = (key: string, value: any) => {
      setSectionForm({ ...sectionForm, content: { ...content, [key]: value } });
    };

    const toggleGlobalItem = (key: string, itemId: number) => {
      const items = Array.isArray(content[key]) ? [...content[key]] : [];
      const index = items.indexOf(itemId);
      if (index === -1) {
        items.push(itemId);
      } else {
        items.splice(index, 1);
      }
      updateContent(key, items);
    };

    switch (type) {
      case "hero":
        const heroSlides = Array.isArray(content)
          ? content
          : [content || {}];

        return (
          <>
            {heroSlides.map((slide: any, idx: number) => (
              <div key={idx} className="admin-card mb-3 p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Slide #{idx + 1}</span>
                  {heroSlides.length > 1 && (
                    <button
                      type="button"
                      className="btn-icon-danger"
                      onClick={() => {
                        const nextSlides = [...heroSlides];
                        nextSlides.splice(idx, 1);
                        setSectionForm({ ...sectionForm, content: nextSlides });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Main Heading</label>
                  <input
                    type="text"
                    className="form-input"
                    value={slide.mainHeading || slide.title || ""}
                    onChange={e => {
                      const nextSlides = [...heroSlides];
                      nextSlides[idx] = { ...nextSlides[idx], mainHeading: e.target.value };
                      setSectionForm({ ...sectionForm, content: nextSlides });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sub Heading</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={slide.secondHeading || slide.subtitle || ""}
                    onChange={e => {
                      const nextSlides = [...heroSlides];
                      nextSlides[idx] = { ...nextSlides[idx], secondHeading: e.target.value };
                      setSectionForm({ ...sectionForm, content: nextSlides });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Paragraph</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={slide.mainParagraph || ""}
                    onChange={e => {
                      const nextSlides = [...heroSlides];
                      nextSlides[idx] = { ...nextSlides[idx], mainParagraph: e.target.value };
                      setSectionForm({ ...sectionForm, content: nextSlides });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image Key (from Media)</label>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="text"
                      className="form-input"
                      value={slide.imageKey || ""}
                      onChange={e => {
                        const nextSlides = [...heroSlides];
                        nextSlides[idx] = { ...nextSlides[idx], imageKey: e.target.value };
                        setSectionForm({ ...sectionForm, content: nextSlides });
                      }}
                    />
                    <button type="button" className="btn-icon" onClick={() => fetchMedia({ type: "hero", index: idx })} title="Select from Media">
                      <FontAwesomeIcon icon={faImage} />
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label className="form-label">Button 1 Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={slide.button1Text || slide.button1 || ""}
                      onChange={e => {
                        const nextSlides = [...heroSlides];
                        nextSlides[idx] = { ...nextSlides[idx], button1Text: e.target.value };
                        setSectionForm({ ...sectionForm, content: nextSlides });
                      }}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label className="form-label">Button 1 Link</label>
                    <input
                      type="text"
                      className="form-input"
                      value={slide.button1Link || ""}
                      onChange={e => {
                        const nextSlides = [...heroSlides];
                        nextSlides[idx] = { ...nextSlides[idx], button1Link: e.target.value };
                        setSectionForm({ ...sectionForm, content: nextSlides });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label className="form-label">Button 2 Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={slide.button2Text || slide.button2 || ""}
                      onChange={e => {
                        const nextSlides = [...heroSlides];
                        nextSlides[idx] = { ...nextSlides[idx], button2Text: e.target.value };
                        setSectionForm({ ...sectionForm, content: nextSlides });
                      }}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label className="form-label">Button 2 Link</label>
                    <input
                      type="text"
                      className="form-input"
                      value={slide.button2Link || ""}
                      onChange={e => {
                        const nextSlides = [...heroSlides];
                        nextSlides[idx] = { ...nextSlides[idx], button2Link: e.target.value };
                        setSectionForm({ ...sectionForm, content: nextSlides });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-secondary w-100"
              onClick={() => {
                const nextSlides = [...heroSlides];
                nextSlides.push({
                  id: Date.now(),
                  mainHeading: "",
                  mainParagraph: "",
                  secondHeading: "",
                  button1Text: "Learn More",
                  button1Link: "/about-us",
                  button2Text: "Book Now",
                  button2Link: "https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670",
                  imageKey: "",
                });
                setSectionForm({ ...sectionForm, content: nextSlides });
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Slide
            </button>
          </>
        );

      case "content":
        return (
          <>
            <div className="form-group">
              <label className="form-label">Section Title</label>
              <input type="text" className="form-input" value={content.title || ""} onChange={e => updateContent("title", e.target.value)} />
            </div>
            <RichTextEditor 
              label="Rich Content"
              value={content.text || ""} 
              onChange={val => updateContent("text", val)} 
            />
            <div className="form-group mt-3">
              <label className="form-label">Featured Image Key</label>
              <div className="d-flex gap-2 align-items-center">
                <input type="text" className="form-input" value={content.imageKey || ""} onChange={e => updateContent("imageKey", e.target.value)} />
                <button type="button" className="btn-icon" onClick={() => fetchMedia({ type: "content" })} title="Select from Media">
                  <FontAwesomeIcon icon={faImage} />
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                <input type="checkbox" checked={content.reverse || false} onChange={e => updateContent("reverse", e.target.checked)} />
                <span className="ms-2">Reverse Layout (Image on Left)</span>
              </label>
            </div>
          </>
        );

      case "infoBoxes":
        return (
          <div>
            <label className="form-label">Feature Boxes</label>
            {(content.items || []).map((item: any, idx: number) => (
              <div key={idx} className="admin-card mb-3 p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Box #{idx + 1}</span>
                  <button type="button" className="btn-icon-danger" onClick={() => {
                    const newItems = [...content.items];
                    newItems.splice(idx, 1);
                    updateContent("items", newItems);
                  }}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <div className="form-group">
                  <input type="text" className="form-input" placeholder="Title" value={item.title} onChange={e => {
                    const newItems = [...content.items];
                    newItems[idx].title = e.target.value;
                    updateContent("items", newItems);
                  }} />
                </div>
                <div className="form-group">
                  <textarea className="form-textarea" placeholder="Description" rows={2} value={item.desc} onChange={e => {
                    const newItems = [...content.items];
                    newItems[idx].desc = e.target.value;
                    updateContent("items", newItems);
                  }} />
                </div>
                <div className="form-group">
                  <div className="d-flex gap-2 align-items-center">
                    <input type="text" className="form-input" placeholder="Image Key" value={item.imageKey} onChange={e => {
                      const newItems = [...content.items];
                      newItems[idx].imageKey = e.target.value;
                      updateContent("items", newItems);
                    }} />
                    <button type="button" className="btn-icon" onClick={() => fetchMedia({ type: "infoBox", index: idx })} title="Select from Media">
                      <FontAwesomeIcon icon={faImage} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn-secondary w-100" onClick={() => {
              const newItems = Array.isArray(content.items) ? [...content.items] : [];
              newItems.push({ title: "", desc: "", imageKey: "" });
              updateContent("items", newItems);
            }}><FontAwesomeIcon icon={faPlus} className="me-2" /> Add Box</button>
          </div>
        );

      case "richText":
        return (
          <>
            <div className="form-group">
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={content.title || ""}
                onChange={e => updateContent("title", e.target.value)}
              />
            </div>
            <RichTextEditor
              label="Rich Content"
              value={content.text || ""}
              onChange={val => updateContent("text", val)}
            />
          </>
        );

      case "teamMembers":
        return (
          <div>
            <label className="form-label">Team Members</label>
            {(content.members || []).map((member: TeamMemberItem, idx: number) => (
              <div key={idx} className="admin-card mb-3 p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Member #{idx + 1}</span>
                  <button
                    type="button"
                    className="btn-icon-danger"
                    onClick={() => {
                      const newMembers = [...(content.members || [])];
                      newMembers.splice(idx, 1);
                      updateContent("members", newMembers);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={member.name || ""}
                    onChange={e => {
                      const newMembers = [...(content.members || [])];
                      newMembers[idx] = { ...newMembers[idx], name: e.target.value };
                      updateContent("members", newMembers);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Designation</label>
                  <input
                    type="text"
                    className="form-input"
                    value={member.designation || ""}
                    onChange={e => {
                      const newMembers = [...(content.members || [])];
                      newMembers[idx] = { ...newMembers[idx], designation: e.target.value };
                      updateContent("members", newMembers);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={member.description || ""}
                    onChange={e => {
                      const newMembers = [...(content.members || [])];
                      newMembers[idx] = { ...newMembers[idx], description: e.target.value };
                      updateContent("members", newMembers);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Read More Link</label>
                  <input
                    type="text"
                    className="form-input"
                    value={member.readMoreLink || ""}
                    onChange={e => {
                      const newMembers = [...(content.members || [])];
                      newMembers[idx] = { ...newMembers[idx], readMoreLink: e.target.value };
                      updateContent("members", newMembers);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image Key</label>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="text"
                      className="form-input"
                      value={member.imageKey || ""}
                      onChange={e => {
                        const newMembers = [...(content.members || [])];
                        newMembers[idx] = { ...newMembers[idx], imageKey: e.target.value };
                        updateContent("members", newMembers);
                      }}
                    />
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => fetchMedia({ type: "teamMember", index: idx })}
                      title="Select from Media"
                    >
                      <FontAwesomeIcon icon={faImage} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-secondary w-100"
              onClick={() => {
                const newMembers = Array.isArray(content.members) ? [...content.members] : [];
                newMembers.push({
                  name: "",
                  designation: "",
                  description: "",
                  imageKey: "",
                  readMoreLink: "",
                });
                updateContent("members", newMembers);
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Team Member
            </button>
          </div>
        );

      case "servicesCarousel":
      case "blogSlider":
      case "gallery":
      case "testimonials":
        const items = type === "servicesCarousel" ? services : 
                      type === "blogSlider" ? blogs : 
                      type === "gallery" ? galleryItems : testimonials;
        const itemKey = type === "servicesCarousel" ? "serviceIds" : 
                        type === "blogSlider" ? "blogIds" : 
                        type === "gallery" ? "galleryIds" : "testimonialIds";
        
        return (
          <>
            <div className="form-group">
              <label className="form-label">Section Title</label>
              <input type="text" className="form-input" value={content.title || ""} onChange={e => updateContent("title", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Map Global Items</label>
              <div className="global-item-picker">
                {items.map(item => (
                  <label key={item.id} className="global-item-checkbox">
                    <input 
                      type="checkbox" 
                      checked={(content[itemKey] || []).includes(item.id)} 
                      onChange={() => toggleGlobalItem(itemKey, item.id)}
                    />
                    <span>{item.title || item.heading || item.name}</span>
                  </label>
                ))}
              </div>
              <small className="form-text text-muted">Selected items will be displayed in this section.</small>
            </div>
          </>
        );

      default:
        return <p className="text-muted">Select a section type to see blueprints.</p>;
    }
  };

  if (loading && pages.length === 0) return <div className="admin-loading">Loading Pages...</div>;

  return (
    <div className="admin-pages">
      {!showEditor ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Website Pages</h2>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Sections</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(pages || []).map(page => (
                  <tr key={page.id}>
                    <td className="fw-bold">{page.title || "Untitled"}</td>
                    <td><code>{page.slug || "/"}</code></td>
                    <td><span className="badge-count">{page.sections?.length || 0}</span></td>
                    <td>
                      <span className={`status-badge ${(page.status || "Published").toLowerCase()}`}>
                        {page.status || "Published"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn-icon" onClick={() => openPageEditor(page)} title="Edit Content">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn-icon" onClick={() => window.open(`/${page.slug || ""}`, '_blank')} title="View Live">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="page-editor">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <button className="btn-back mb-2" onClick={() => setShowEditor(false)}>
                <FontAwesomeIcon icon={faXmark} className="me-2" /> Cancel Editing
              </button>
              <h2 className="section-title">{editPage?.id ? `Editing: ${editPage.title}` : 'Create New Page'}</h2>
            </div>
            <button className="btn-primary btn-lg" onClick={handleSavePage}>
              Save Changes
            </button>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="admin-card mb-4">
                <h3 className="card-title">Page Settings</h3>
                <div className="form-group">
                  <label className="form-label">Page Title</label>
                  <input type="text" className="form-input" value={editPage?.title} onChange={e => setEditPage({ ...editPage!, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input type="text" className="form-input" value={editPage?.slug} onChange={e => setEditPage({ ...editPage!, slug: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={editPage?.status} onChange={e => setEditPage({ ...editPage!, status: e.target.value })}>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="card-title">SEO Settings</h3>
                <div className="form-group">
                  <label className="form-label">Meta Title</label>
                  <input type="text" className="form-input" value={editPage?.meta_title || ""} onChange={e => setEditPage({ ...editPage!, meta_title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Meta Description</label>
                  <textarea className="form-textarea" rows={3} value={editPage?.meta_description || ""} onChange={e => setEditPage({ ...editPage!, meta_description: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="admin-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="card-title">Page Sections</h3>
                  <div className="d-flex gap-2">
                    <button className="btn-secondary btn-sm" onClick={handleAddSection}>
                      <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Section
                    </button>
                  </div>
                </div>

                <div className="sections-list">
                  {[...(editPage?.sections || [])].sort((a,b) => a.order - b.order).map((section, idx) => (
                    <div key={section.id || idx} className="section-item">
                      <div className="d-flex align-items-center gap-3">
                        <div className="drag-handle">
                          <FontAwesomeIcon icon={faGripVertical} />
                        </div>
                        <div className="section-info">
                          <h4>{section.title || `Untitled ${section.type}`}</h4>
                          <span className="section-type-tag">{section.type}</span>
                        </div>
                      </div>
                      <div className="section-actions">
                        <div className="d-flex flex-column gap-1 me-3">
                          <button className="btn-order" onClick={() => moveSection(section.id!, 'up')} disabled={idx === 0}>
                            <FontAwesomeIcon icon={faChevronUp} />
                          </button>
                          <button className="btn-order" onClick={() => moveSection(section.id!, 'down')} disabled={idx === editPage.sections.length - 1}>
                            <FontAwesomeIcon icon={faChevronDown} />
                          </button>
                        </div>
                        <button className="btn-icon" onClick={() => handleEditSection(section)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn-icon-danger" onClick={() => handleDeleteSection(section.id!)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {editPage?.sections.length === 0 && (
                    <div className="empty-sections">
                      <p>No sections added yet. Start by adding a Hero or Content section.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Modal */}
      {showSectionModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3 className="modal-title">{sectionForm?.id ? 'Edit Section' : 'Add New Section'}</h3>
              <button className="btn-close" onClick={() => setShowSectionModal(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <form onSubmit={handleSaveSection}>
              <div className="form-group">
                <label className="form-label">Section Type</label>
                <select 
                  className="form-select" 
                  value={sectionForm?.type} 
                  onChange={e => setSectionForm({ ...sectionForm!, type: e.target.value, content: {} })}
                  disabled={!!sectionForm?.id}
                >
                  <option value="hero">Hero Section</option>
                  <option value="content">Content (Text + Image)</option>
                  <option value="richText">Rich Text Section</option>
                  <option value="teamMembers">Team Members</option>
                  <option value="infoBoxes">Info/Feature Boxes</option>
                  <option value="servicesCarousel">Services Carousel</option>
                  <option value="gallery">Gallery Grid</option>
                  <option value="blogSlider">Blog Posts Slider</option>
                  <option value="testimonials">Testimonials Slider</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Section Title (Internal Name)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={sectionForm?.title || ""} 
                  onChange={e => setSectionForm({ ...sectionForm!, title: e.target.value })} 
                  placeholder="e.g. Home Hero, About Chiropractic"
                />
              </div>

              <hr className="my-4" />
              
              <div className="blueprint-fields">
                <h4 className="mb-3 text-secondary small text-uppercase fw-bold">Blueprint Content</h4>
                {renderSectionBlueprintFields()}
              </div>

              <div className="modal-footer mt-5">
                <button type="button" className="btn-secondary" onClick={() => setShowSectionModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Section</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMediaPicker && (
        <div className="admin-modal-overlay" style={{ zIndex: 1100 }}>
          <div className="admin-modal" style={{ maxWidth: "1000px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Select Image</h3>
              <button type="button" className="btn-icon" onClick={() => setShowMediaPicker(false)}>X</button>
            </div>
            <div className="media-grid p-3" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {(mediaLibrary || []).map((item) => (
                <div key={item.id} className="media-item" onClick={() => applySelectedMedia(item)}>
                  {item.type?.startsWith("image/") ? (
                    <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${item.url}`} alt={item.filename || ""} />
                  ) : (
                    <div className="file-placeholder">
                      <FontAwesomeIcon icon={faImage} size="2x" />
                    </div>
                  )}
                  <div className="media-item-info text-truncate" title={item.filename}>
                    {item.filename || "Untitled"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPages;
