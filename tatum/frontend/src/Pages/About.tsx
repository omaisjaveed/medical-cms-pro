import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import api from "../services/api";
import About1 from "../assets/images/inner-about-1.webp";
import About2 from "../assets/images/inner-about-2.webp";

function About() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await api.getPage("about-us");
        if (response.success) {
          setPageData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch about page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const sections = useMemo(() => {
    const pageSections = Array.isArray(pageData?.sections) ? [...pageData.sections].sort((a, b) => a.order - b.order) : [];
    return {
      hero: pageSections.find((section) => section.type === "hero"),
      content: pageSections.filter((section) => section.type === "content"),
    };
  }, [pageData]);

  const resolveImage = (imageKey?: string, fallback?: string) => {
    if (!imageKey) return fallback || "";
    return `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${imageKey}${imageKey.includes(".") ? "" : ".webp"}`;
  };

  if (loading) {
    return (
      <div
        className="loading-screen"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData?.meta_title || "About Us | Tatum Wellness"}</title>
        <meta
          name="description"
          content={pageData?.meta_description || "Learn about Tatum Chiropractic and Wellness."}
        />
      </Helmet>

      <InnerBanner bannertitle={sections.hero?.content?.title || "About Us"} />

      {sections.content.length > 0 ? (
        sections.content.map((section: any, index: number) => (
          <ContentSection
            key={section.id || index}
            title={section.content?.title || ""}
            text={section.content?.text || ""}
            image={resolveImage(section.content?.imageKey, index === 0 ? About1 : About2)}
            reverse={!!section.content?.reverse}
            showButtons={false}
          />
        ))
      ) : (
        <>
          <ContentSection
            title="Chiropractic Care in Cave Creek, AZhiropractic & Wellness"
            text="Trying to find an experienced chiropractor near you? Welcome to Tatum Chiropractic and Wellness, located in Cave Creek, Arizona! Chiropractic is one of the most amazing healthcare professions, but very few people understand what it's all about. We are here to help you gain a basic understanding of how our Cave Creek chiropractors can help you and your family."
            image={About1}
            showButtons={false}
          />
          <ContentSection
            title="How Can We Help?"
            text="Over the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas. Chiropractic care is the practice of using spinal alignment to alleviate a wide variety of physical ailments, including muscle strain, neck pain, chronic back pain, and more. This is accomplished by adjusting the position of the spinal column to its proper shape, providing a non-invasive solution for pain relief."
            image={About2}
            reverse={true}
            showButtons={false}
          />
        </>
      )}
    </>
  );
}

export default About;
