import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import Gallery from "../Components/Gallery";
import api from "../services/api";

const MissionaryGallery = () => {
  const [galleryData, setGalleryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // First try to get gallery data from page-specific endpoint
        const pageRes = await api.getPage("gallery");
        const gallerySection = pageRes.success ? pageRes.data?.sections?.find((s: any) => s.type === "gallery") : null;

        if (gallerySection) {
          setGalleryData(gallerySection);
        } else {
          // Fallback to global gallery list
          const response = await api.getGallery();
          if (response.success && response.data.length > 0) {
            setGalleryData(response.data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch gallery data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <>
      <Helmet>
        <title>Gallery | Tatum Wellness</title>
        <meta
          name="description"
          content="Explore our clinic gallery – real patient stories, facility images, and wellness moments."
        />
      </Helmet>

      <InnerBanner bannertitle="Gallery" />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="gallery-page-content">
          {galleryData ? (
            <Gallery gallery={galleryData} />
          ) : (
            <div className="text-center py-5">
              <p>No gallery images found.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MissionaryGallery;