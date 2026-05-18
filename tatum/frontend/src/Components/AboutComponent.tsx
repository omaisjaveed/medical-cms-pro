import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "../assets/images/about-img.webp";
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

const AboutComponent = ({ data }: { data?: any }) => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentData, setContentData] = useState<ContentData | null>(null);

  useEffect(() => {
    if (data?.content) {
      setContentData({
        title: data.content.title || "Chiropractic Care in Cave Creek, AZ",
        text: typeof data.content.text === "string" ? data.content.text : "",
        imageKey: data.content.imageKey,
        reverse: data.content.reverse,
      });
    } else {
      setContentData({
        title: "Chiropractic Care in Cave Creek, AZ",
        text: "Trying to find an experienced chiropractor near you? Welcome to Tatum Chiropractic and Wellness, located in Cave Creek, Arizona! Chiropractic is one of the most amazing healthcare professions, but very few people understand what it's all about. We are here to help you gain a basic understanding of how our Cave Creek chiropractors can help you and your family.\n\nOver the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas.",
        imageKey: "about-img",
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

        tl.from(imageWrapRef.current, { x: -60, opacity: 0, duration: 1, ease: "power3.out" })
          .from(imageRef.current, { scale: 1.2, duration: 1.4, ease: "power2.out" }, 0)
          .from(lineRef.current, { width: 0, duration: 0.8, ease: "power2.inOut" }, 0.4)
          .from(contentRef.current?.children || [], { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, 0.6)
          .from(buttonRefs.current, { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, 1);
      });
      return () => ctx.revert();
    }
  }, [contentData]);

  if (!contentData) return null;

  const safeText = typeof contentData.text === "string" ? contentData.text : "";
  const paragraphs = safeText.split("\n\n").filter(Boolean);
  const firstPara = paragraphs[0];
  const secondPara = paragraphs.slice(1).join("\n\n");

  return (
    <section className="about-sec" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center">
          <div className={`col-lg-6 col-md-6 col-sm-12 col-xs-12 ${contentData.reverse ? "order-lg-2" : ""}`}>
            <div className="about-img-wrapper" ref={imageWrapRef}>
              <img 
                src={getImagePath(contentData.imageKey, aboutImg)} 
                alt="About Us" 
                className="img-fluid" 
                ref={imageRef} 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = aboutImg;
                }}
              />
              {/* <div className="experience-tag">
                <span>28+ Years</span>
                <p>Of Excellence</p>
              </div> */}
            </div>
          </div>
          <div className={`col-lg-6 col-md-6 col-sm-12 col-xs-12 ${contentData.reverse ? "order-lg-1" : ""}`}>
            <div className="about-content-wrapper" ref={contentRef}>
              <div className="about-content-part-I">
                <div className="horizontal-line" ref={lineRef}></div>
                <h2 className="about-title">{contentData.title}</h2>
                <p className="about-copy" dangerouslySetInnerHTML={{ __html: firstPara }} />
              </div>
              <div className="about-content-part-II">
                <h2 className="about-subtitle">How Can We Help?</h2>
                <p className="about-copy-secondary" dangerouslySetInnerHTML={{ __html: secondPara }} />
              </div>
              <div className="about-btns-wrapper">
                <div className="learn-more about-action" ref={(el) => (buttonRefs.current[0] = el)}>
                  <NavLink to="/about-us">Learn More</NavLink>
                </div>
                <div className="book-now about-action" ref={(el) => (buttonRefs.current[1] = el)}>
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

export default AboutComponent;
