import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import api from "../services/api";
import tools1 from "../assets/images/gallery-5.webp";
import tools2 from "../assets/images/about-img.webp";

function ToolsTrade() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await api.getPage("tools-of-the-trade");
        if (response.success) {
          setPageData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch tools of the trade page data:", error);
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
      richText: pageSections.find((section) => section.type === "richText"),
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

  const introSection = sections.content[0];
  const detailSection = sections.content[1];

  return (
    <>
      <Helmet>
        <title>{pageData?.meta_title || "Tools of the Trade | Tatum Wellness"}</title>
        <meta
          name="description"
          content={pageData?.meta_description || "Learn about the tools and technologies used at Tatum Wellness."}
        />
      </Helmet>

      <InnerBanner bannertitle={sections.hero?.content?.title || "Tools of the Trade"} />

      <ContentSection
        title={introSection?.content?.title || "Tools of the Trade"}
        text={
          introSection?.content?.text ||
          "When you have pain and discomfort in the body, chiropractic treatment can help offer solutions."
        }
        image={resolveImage(introSection?.content?.imageKey, tools1)}
        reverse={!!introSection?.content?.reverse}
        showButtons={false}
      />

      <ContentSection
        title={detailSection?.content?.title || "Chiropractic Care Backed by Inventive Tools and Technologies"}
        text={
          detailSection?.content?.text ||
          "Dr. Lind uses an Arthrostim, which provides relief in particular parts of the body."
        }
        image={resolveImage(detailSection?.content?.imageKey, tools2)}
        reverse={detailSection?.content?.reverse !== undefined ? !!detailSection.content.reverse : true}
        showButtons={false}
      />

      {(sections.richText?.content?.text || "").trim() ? (
        <section className="tools-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div dangerouslySetInnerHTML={{ __html: sections.richText.content.text }} />
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default ToolsTrade;
