import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import api from "../services/api";
import doctor from "../assets/images/doctor.webp";

function MeetTheDoctor() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await api.getPage("meet-the-doctor");
        if (response.success) {
          setPageData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch meet the doctor page data:", error);
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
      content: pageSections.find((section) => section.type === "content"),
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
        <title>{pageData?.meta_title || "Meet The Doctor | Tatum Wellness"}</title>
        <meta
          name="description"
          content={pageData?.meta_description || "Learn more about Dr. Tim Lind at Tatum Wellness."}
        />
      </Helmet>

      <InnerBanner bannertitle={sections.hero?.content?.title || "Meet The Doctor"} />

      <ContentSection
        title={sections.content?.content?.title || "Dr. Tim Lind D.C."}
        text={
          sections.content?.content?.text ||
          "Dr. Tim Lind is originally from Central Oregon, where he practiced chiropractic for 28 years. He recently relocated to Phoenix with his wife, Shelley, to spend more time with their grown daughters and enjoy all Arizona has to offer."
        }
        image={resolveImage(sections.content?.content?.imageKey, doctor)}
        reverse={!!sections.content?.content?.reverse}
        showButtons={false}
      />
    </>
  );
}

export default MeetTheDoctor;
