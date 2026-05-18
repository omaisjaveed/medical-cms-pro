import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import OtherServices from "../Components/OtherServices";
import api from "../services/api";
import placeholderImg from "../assets/images/tatum-slider.webp";

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Find service by slug from all services
        const response = await api.getServices();
        if (response.success) {
          // Since getServices returns a tree, we need to find it recursively or use a flat list if available
          const findService = (list: any[]): any => {
            for (const item of list) {
              if (item.slug === slug) return item;
              if (item.children) {
                const found = findService(item.children);
                if (found) return found;
              }
            }
            return null;
          };
          const found = findService(response.data);
          setService(found);
        }
      } catch (err) {
        console.error("Failed to fetch service details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container text-center py-5">
        <h2>Service not found</h2>
        <Link to="/" className="btn-primary mt-3">← Back to Home</Link>
      </div>
    );
  }

  const serviceImage = service.featured_image 
    ? `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${service.featured_image}${service.featured_image.includes('.') ? '' : '.webp'}`
    : placeholderImg;

  return (
    <>
      <Helmet>
        <title>{service.title} | Tatum Wellness</title>
        <meta name="description" content={service.description || service.title} />
      </Helmet>

      <InnerBanner bannertitle={service.title} />

      {/* Hero Featured Image */}
      <section className="service-hero-img-sec py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="service-hero-img-wrapper position-relative rounded-4 overflow-hidden shadow-sm">
                <img 
                  src={serviceImage} 
                  alt={service.title} 
                  className="w-100 object-fit-cover" 
                  style={{ maxHeight: '450px' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== placeholderImg) {
                      target.src = placeholderImg;
                    }
                  }}
                />
                <div className="hero-overlay-gradient position-absolute bottom-0 start-0 w-100 p-4 bg-dark bg-opacity-25 text-white">
                  <h2 className="mb-0 text-white shadow-sm">{service.title}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Content if any */}
      {service.content && service.content !== "<p><br></p>" && (
        <section className="service-main-content py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="service-content-body fs-5" dangerouslySetInnerHTML={{ __html: service.content }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      {(() => {
        let sections = service.sections;
        if (typeof sections === 'string') {
          try {
            sections = JSON.parse(sections);
          } catch (e) {
            sections = [];
          }
        }
        
        if (Array.isArray(sections) && sections.length > 0) {
          return sections.map((section: any, index: number) => (
            <ContentSection
              key={index}
              className="service-detail-section"
              title={section.title}
              text={section.content}
              image={section.image 
                ? (section.image.startsWith('http') ? section.image : `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${section.image}`)
                : placeholderImg
              }
              reverse={index % 2 !== 0}
              showButtons={false}
            />
          ));
        }
        
        if (!service.content) {
          return (
            <div className="container text-center py-5">
              <p className="text-muted">No content available for this service.</p>
            </div>
          );
        }
        
        return null;
      })()}

      <OtherServices />
    </>
  );
};

export default ServiceDetail;
