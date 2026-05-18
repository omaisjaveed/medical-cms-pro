import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import doctorImg from '../assets/images/doctor.webp';
import { getImagePath } from "../utils/imageUtils";

gsap.registerPlugin(ScrollTrigger);

interface ContentData {
  title: string;
  text: string;
  imageKey?: string;
  reverse?: boolean;
}

const Doctor = ({ data }: { data?: any }) => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const nameTagRef = useRef(null);
  const [contentData, setContentData] = useState<ContentData | null>(null);

  useEffect(() => {
    if (data?.content) {
      setContentData({
        title: data.content.title || "Meet The Doctor",
        text: typeof data.content.text === "string" ? data.content.text : "",
        imageKey: data.content.imageKey,
        reverse: data.content.reverse,
      });
    } else {
      setContentData({
        title: "Meet The Doctor",
        text: "Dr. Tim Lind is originally from Central Oregon, where he practiced chiropractic for 28 years. He recently relocated to Phoenix with his wife, Shelley, to spend more time with their grown daughters and enjoy all Arizona has to offer. Dr. Lind graduated from Los Angeles Chiropractic College in 1990. He enjoys treating individuals based on their particular needs, using a variety of techniques to help with both acute and chronic conditions.",
        imageKey: "doctor",
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

        tl.from(imageWrapRef.current, { x: 50, opacity: 0, duration: 1, ease: "power3.out" })
          .from(imageRef.current, { scale: 1.15, duration: 1.2, ease: "power2.out" }, 0)
          .from(nameTagRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, 0.5)
          .from(contentRef.current?.children || [], { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0.4);
      });
      return () => ctx.revert();
    }
  }, [contentData]);

  if (!contentData) return null;

  return (
    <section className="doctor-sec" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 order-lg-2">
            <div className="doctor-img-wrapper" ref={imageWrapRef}>
              <img 
                src={getImagePath(contentData.imageKey, doctorImg)} 
                alt={contentData.title} 
                className="img-fluid" 
                ref={imageRef} 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = doctorImg;
                }}
              />
              <div className="doctor-name-tag" ref={nameTagRef}>
                <h4>Dr. Tim Lind D.C.</h4>
                <p>Chiropractor</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 order-lg-1">
            <div className="doctor-content-wrapper" ref={contentRef}>
              <div className="section-header">
                <span className="subtitle">Expert Care</span>
                <h2 className="section-title">{contentData.title}</h2>
              </div>
              <p className="doctor-copy" dangerouslySetInnerHTML={{ __html: contentData.text }} />
              <div className="doctor-signature mt-4">
                <p>Dedicated to your wellness,</p>
                <h5>Dr. Tim Lind</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctor;
