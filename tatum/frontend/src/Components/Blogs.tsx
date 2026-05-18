import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
}

interface BlogProps {
  data?: any;
  allBlogs?: any[];
}

const Blog = ({ data, allBlogs = [] }: BlogProps) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (allBlogs && allBlogs.length > 0) {
      const blogIds = data?.content?.blogIds;
      
      if (Array.isArray(blogIds) && blogIds.length > 0) {
        const filtered = allBlogs.filter(b => blogIds.includes(b.id));
        if (filtered.length > 0) {
          setBlogs(filtered);
          return;
        }
      }
      
      // Fallback: first 6 blogs
      setBlogs(allBlogs.slice(0, 6));
    }
  }, [allBlogs, data]);

  useEffect(() => {
    if (blogs.length > 0 && !hasAnimated.current) {
      console.log(`[Blogs] Animating ${blogs.length} cards`);
      const ctx = gsap.context((self) => {
        if (headingRef.current) {
          gsap.from(headingRef.current, {
            opacity: 1, // Ensure heading stays visible
            y: 30,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true }
          });
        }
        
        const cards = self.selector?.(".blog-card");
        if (cards && cards.length > 0) {
          gsap.from(cards, {
            y: 40,
            scale: 0.95,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true }
          });
          hasAnimated.current = true;
        }
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [blogs]);

  if (blogs.length === 0) return null;

  return (
    <section className="blog-sec" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-12">
            <div className="blog-heading-wrapper d-flex justify-content-between align-items-center flex-wrap" ref={headingRef}>
              <h2>{data?.content?.title || "Our Blogs"}</h2>
              <div className="slider-arrows d-flex gap-2">
                <button className="swiper-button-prev-custom arrow-btn">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button className="swiper-button-next-custom arrow-btn">
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="blogs-slider-trigger">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            rewind={true}
            onBeforeInit={(swiper: any) => {
              swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
              swiper.params.navigation.nextEl = ".swiper-button-next-custom";
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="blog-card">
                  <div className="blog-img">
                    <img 
                      src={blog.featured_image ? `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${blog.featured_image}${blog.featured_image.includes('.') ? '' : '.webp'}` : "/assets/images/blog-placeholder.webp"} 
                      alt={blog.title} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Blog";
                      }}
                    />
                  </div>
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt?.substring(0, 120)}...</p>
                    <Link to={`/blogs/${blog.slug}`} className="learn-more-btn">
                      Read More <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </Link>
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

export default Blog;
