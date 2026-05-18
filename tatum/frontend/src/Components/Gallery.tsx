import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  url: string;
  caption?: string;
  alt_text?: string;
  order: number;
}

interface GalleryData {
  id: number;
  title: string;
  images: GalleryImage[];
  is_active?: boolean;
}

interface GalleryProps {
  data?: any;
  allGalleries?: GalleryData[];
}

const Gallery = ({ data, allGalleries = [] }: GalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gallery, setGallery] = useState<GalleryData | null>(null);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const galleryItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (allGalleries.length > 0) {
      if (data?.content?.galleryIds && data.content.galleryIds.length > 0) {
        const galleryId = data.content.galleryIds[0];
        const found = allGalleries.find(g => g.id === galleryId);
        setGallery(found || allGalleries[0]);
      } else {
        const activeGallery = allGalleries.find((g) => g.is_active) || allGalleries[0];
        setGallery(activeGallery || null);
      }
    }
  }, [allGalleries.length, data]);

  const parseImages = (imgs: any) => {
    if (Array.isArray(imgs)) return imgs;
    if (typeof imgs === 'string') {
      try {
        return JSON.parse(imgs);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const images = gallery ? parseImages(gallery.images).sort((a: any, b: any) => a.order - b.order) : [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextImage = () => {
     if (images.length === 0) return;
     setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
   };
 
   useEffect(() => {
     if (!gallery) return;
     const ctx = gsap.context(() => {
         if (headingRef.current) {
             gsap.from(headingRef.current, {
                 opacity: 0,
                 y: 40,
                 duration: 0.8,
                 ease: "power3.out",
                 scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
             });
         }
         
         const validItems = galleryItemsRef.current.filter(Boolean);
         if (validItems.length > 0) {
             gsap.from(validItems, {
                 opacity: 0,
                 scale: 0.9,
                 filter: "blur(4px)",
                 duration: 0.7,
                 stagger: 0.1,
                 ease: "back.out(1.2)",
                 scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
             });
         }
     });
     return () => ctx.revert();
   }, [gallery]);

   if (!gallery) return null;

   return (
    <>
      <section className="gallery-sec" ref={sectionRef}>
        <div className="container">
          <div className="section-header text-center mb-5" ref={headingRef}>
            <h2 className="section-title text-white text-uppercase fw-bold">
              {gallery.title || "Our Gallery"}
            </h2>
          </div>
          
          <div className="gallery-grid">
            {/* LEFT SIDE (2 columns inside) */}
            <div className="gallery-left">
              {/* LEFT STACKED COLUMN */}
              <div className="gallery-col-left">
                {images[0] && (
                  <div className="gallery-item" onClick={() => openLightbox(0)} ref={(el) => (galleryItemsRef.current[0] = el)}>
                    <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${images[0].url}`} alt={images[0].alt_text} />
                    <div className="overlay"><span>🔍</span></div>
                  </div>
                )}
                {images[1] && (
                  <div className="gallery-item" onClick={() => openLightbox(1)} ref={(el) => (galleryItemsRef.current[1] = el)}>
                    <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${images[1].url}`} alt={images[1].alt_text} />
                    <div className="overlay"><span>🔍</span></div>
                  </div>
                )}
              </div>
              {/* MIDDLE TALL IMAGE */}
              <div className="gallery-col-middle">
                {images[2] && (
                  <div className="gallery-item" onClick={() => openLightbox(2)} ref={(el) => (galleryItemsRef.current[2] = el)}>
                    <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${images[2].url}`} alt={images[2].alt_text} />
                    <div className="overlay"><span>🔍</span></div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE (2 rows) */}
            <div className="gallery-col-right">
              {/* TOP RIGHT (2 images) */}
              <div className="gallery-sub-row">
                {images[3] && (
                  <div className="gallery-item" onClick={() => openLightbox(3)} ref={(el) => (galleryItemsRef.current[3] = el)}>
                    <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${images[3].url}`} alt={images[3].alt_text} />
                    <div className="overlay"><span>🔍</span></div>
                  </div>
                )}
                {images[4] && (
                  <div className="gallery-item" onClick={() => openLightbox(4)} ref={(el) => (galleryItemsRef.current[4] = el)}>
                    <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${images[4].url}`} alt={images[4].alt_text} />
                    <div className="overlay"><span>🔍</span></div>
                  </div>
                )}
              </div>
              {/* BOTTOM RIGHT (1 image full width) */}
              <div className="gallery-sub-row single">
                {images[5] && (
                  <div className="gallery-item" onClick={() => openLightbox(5)} ref={(el) => (galleryItemsRef.current[5] = el)}>
                    <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${images[5].url}`} alt={images[5].alt_text} />
                    <div className="overlay"><span>🔍</span></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="lightbox-modern" onClick={closeLightbox} style={{ zIndex: 99999 }}>
          <button className="lb-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div className="lb-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="lb-nav-btn lb-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            
            <div className="lb-main-img">
              <img 
                src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${images[currentImageIndex].url}`} 
                alt="Gallery Preview" 
              />
              {images[currentImageIndex].caption && (
                <div className="lb-caption">{images[currentImageIndex].caption}</div>
              )}
            </div>
            
            <button className="lb-nav-btn lb-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="lb-thumbnails">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`lb-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
              >
                <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${img.url}`} alt="Thumbnail" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
