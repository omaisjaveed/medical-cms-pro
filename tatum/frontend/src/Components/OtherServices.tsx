import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import api from "../services/api";
import placeholderImg from "../assets/images/tatum-slider.webp";

import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const OtherServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.getServices();
        if (response.success) {
          // Flatten the tree to get all sub-services
          const allServices: any[] = [];
          const flatten = (list: any[]) => {
            list.forEach(s => {
              if (s.parent_id !== null) { // Only sub-services
                allServices.push(s);
              }
              if (s.children) flatten(s.children);
            });
          };
          flatten(response.data);
          setServices(allServices);
        }
      } catch (err) {
        console.error("Failed to fetch services for carousel", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textWrapperRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const textWrapper = textWrapperRef.current;
    const slides = document.querySelectorAll(".other-service-slide");

    if (!section || slides.length === 0) return;

    gsap.set([heading, textWrapper].filter(Boolean), { opacity: 0, y: 30 });
    gsap.set(slides, { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to([heading, textWrapper], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    }).to(
      slides,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1)",
      },
      "-=0.3"
    );

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [services.length]);

  return (
    <section className="other-services-sec" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center">
            <div className="other-services-heading-wrapper" ref={headingRef}>
              <h2>Other Services</h2>
            </div>
          </div>
        </div>

        <div className="other-services-slider-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: ".other-swiper-button-prev",
              nextEl: ".other-swiper-button-next",
            }}
            className="other-services-swiper"
          >
            {services.map((item) => (
              <SwiperSlide key={item.id}>
                <NavLink to={`/${item.slug}`} className="other-service-card-link">
                  <div className="other-service-slide">
                    <div className="other-service-img">
                      <img 
                        src={item.featured_image ? `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${item.featured_image}` : placeholderImg} 
                        alt={item.title} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== placeholderImg) {
                            target.src = placeholderImg;
                          }
                        }}
                      />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.description || (item.content ? item.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...' : '')}</p>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows - positioned absolutely on sides */}
          <div className="other-swiper-button-prev arrow-btn">
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <div className="other-swiper-button-next arrow-btn">
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherServices;