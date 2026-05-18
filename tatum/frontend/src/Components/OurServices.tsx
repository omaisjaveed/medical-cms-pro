import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

interface OurServicesProps {
  data?: any;
  allServices?: any[];
}

const OurServices = ({ data, allServices = [] }: OurServicesProps) => {
  const sectionRef = useRef(null);
  const [services, setServices] = useState<any[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (allServices && allServices.length > 0) {
      const serviceIds = data?.content?.serviceIds;
      
      if (Array.isArray(serviceIds) && serviceIds.length > 0) {
        const filtered = allServices.filter((s: any) => serviceIds.includes(s.id));
        if (filtered.length > 0) {
          setServices(filtered);
          return;
        }
      } 
      
      // Fallback: featured or first 6
      const featured = allServices.filter((s: any) => s.is_featured);
      setServices(featured.length > 0 ? featured : allServices.slice(0, 6));
    }
  }, [allServices, data]);

  useEffect(() => {
    if (services.length > 0 && !hasAnimated.current) {
      console.log(`[OurServices] Animating ${services.length} cards`);
      const ctx = gsap.context((self) => {
        const cards = self.selector?.(".service-slide");
        if (cards && cards.length > 0) {
          gsap.from(cards, {
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              once: true,
            },
          });
          hasAnimated.current = true;
        }
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [services]);

  if (services.length === 0) return null;

  return (
    <section className="our-services-sec" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-lg-7 col-md-12">
            <div className="our-services-heading-wrapper">
              <span className="subtitle text-primary text-uppercase fw-bold mb-2 d-block">What We Offer</span>
              <h2>{data?.content?.title || "Our Professional Services"}</h2>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 mt-4 mt-lg-0">
            <div className="our-services-text-wrapper d-flex justify-content-end align-items-center">
              {data?.content?.description && (
                <p className="mb-0 me-3" dangerouslySetInnerHTML={{ __html: data.content.description }} />
              )}
              <div className="slider-arrows d-flex gap-2">
                <button className="services-prev arrow-btn">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button className="services-next arrow-btn">
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="services-slider-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".services-prev",
              nextEl: ".services-next",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="services-swiper"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="service-slide">
                  <div className="service-img">
                    <img 
                      src={service.featured_image ? `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${service.featured_image}` : "/assets/images/service-placeholder.webp"} 
                      alt={service.title} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Service";
                      }}
                    />
                  </div>
                  <div className="service-content">
                    <h4>{service.title}</h4>
                    <p>{service.description?.substring(0, 100)}...</p>
                    <NavLink to={`/${service.slug}`} className="learn-more-btn mt-auto">
                      Learn More <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
