import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import info1 from "../assets/images/info-1.webp";
import info2 from "../assets/images/info-2.webp";
import info3 from "../assets/images/info-3.webp";
import { getImagePath } from "../utils/imageUtils";

gsap.registerPlugin(ScrollTrigger);

const getStaticInfoImg = (key: string) => {
  if (key === "info-1") return info1;
  if (key === "info-2") return info2;
  if (key === "info-3") return info3;
  return info2;
};

const InfoBoxes = ({ data }: { data?: any }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [infoData, setInfoData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.content?.items) {
      setInfoData(data.content.items);
    } else {
      // Default fallback data
      setInfoData([
        { id: 1, title: "New Patients", desc: "Welcome to our clinic! We're excited to help you on your journey to wellness.", img: info1, highlight: false },
        { id: 2, title: "Our Services", desc: "Discover our wide range of chiropractic and wellness services tailored for you.", img: info2, highlight: true },
        { id: 3, title: "Contact Us", desc: "Have questions? Reach out to our friendly team today for more information.", img: info3, highlight: false },
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (infoData.length > 0) {
      const ctx = gsap.context(() => {
        const validCards = cardsRef.current.filter(Boolean);
        if (validCards.length > 0) {
          gsap.from(validCards, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          });
        }
      });
      return () => ctx.revert();
    }
  }, [infoData]);

  return (
    <section className="info-sec" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center">
          {infoData.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={item.id || `info-${index}`}>
              <div className="info-wrapper" ref={(el) => (cardsRef.current[index] = el)}>
                <div className={`info-box ${item.highlight ? "active" : ""}`}>
                  <div className="info-img">
                    <img 
                      src={item.img || getImagePath(item.imageKey, getStaticInfoImg(item.imageKey))} 
                      alt={item.title} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = info2;
                      }} 
                    />
                  </div>
                  <div className="info-content">
                    <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
