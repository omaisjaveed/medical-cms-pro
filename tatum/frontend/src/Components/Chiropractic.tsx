import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import chiroImg from '../assets/images/chiro-img.webp';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getImagePath } from "../utils/imageUtils";

gsap.registerPlugin(ScrollTrigger);

interface ContentData {
  title: string;
  text: string;
  imageKey?: string;
  reverse?: boolean;
}

const Chiropractic = ({ data }: { data?: any }) => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [contentData, setContentData] = useState<ContentData | null>(null);

  useEffect(() => {
    if (data?.content) {
      setContentData({
        title: data.content.title || "Advanced Chiropractic Techniques",
        text: typeof data.content.text === "string" ? data.content.text : "",
        imageKey: data.content.imageKey,
        reverse: data.content.reverse,
      });
    } else {
      setContentData({
        title: "Advanced Chiropractic Techniques",
        text: "At Tatum Chiropractic and Wellness, we use a variety of proven techniques to help you achieve optimal health. Whether you are dealing with chronic pain or a recent injury, our personalized approach ensures you get the care you need.",
        imageKey: "chiro-img",
        reverse: true
      });
    }
  }, [data]);

  useEffect(() => {
    if (contentData) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        tl.from(imageWrapRef.current, { x: 60, opacity: 0, duration: 1, ease: "power3.out" })
          .from(imageRef.current, { scale: 1.2, duration: 1.4, ease: "power2.out" }, 0)
          .from(contentRef.current?.children || [], { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, 0.4);
      });
      return () => ctx.revert();
    }
  }, [contentData]);

  if (!contentData) return null;

  return (
    <section className="chiro-sec" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center">
          <div className={`col-lg-6 col-md-6 col-sm-12 col-xs-12 ${contentData.reverse ? "order-lg-2" : ""}`}>
            <div className="chiro-img-wrapper" ref={imageWrapRef}>
              <img 
                src={getImagePath(contentData.imageKey, chiroImg)} 
                alt={contentData.title} 
                className="img-fluid" 
                ref={imageRef} 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = chiroImg;
                }}
              />
            </div>
          </div>
          <div className={`col-lg-6 col-md-6 col-sm-12 col-xs-12 ${contentData.reverse ? "order-lg-1" : ""}`}>
            <div className="chiro-content-wrapper" ref={contentRef}>
              <h2 className="chiro-title">{contentData.title}</h2>
              <p className="chiro-copy" dangerouslySetInnerHTML={{ __html: contentData.text }} />
              <div className="chiro-btns-wrapper">
                <div className="learn-more chiro-action">
                  <NavLink to="/chiropractic-care-for-kids">Learn More</NavLink>
                </div>
                <div className="book-now chiro-action">
                  <NavLink to="https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670">
                    Book Now <FontAwesomeIcon icon={faArrowRight} />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chiropractic;
