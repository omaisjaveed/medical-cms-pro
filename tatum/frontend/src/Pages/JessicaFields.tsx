import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection"; // make sure the path is correct
import jessica from "../assets/images/jessica-fields.webp";

gsap.registerPlugin(ScrollTrigger);

const Jessica = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate the entire content wrapper on scroll
    gsap.set(section, { opacity: 0, y: 40 });
    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <>
      <Helmet>
        <title>Jessica Fields | Tatum Wellness</title>
        <meta
          name="description"
          content="Meet Dr. Jessica Fields, a fourth‑generation chiropractor at Tatum Wellness. Learn about her background, family legacy, and passion for yoga and wellness."
        />
      </Helmet>

      <InnerBanner bannertitle="Jessica Fields" />

      <div ref={sectionRef}>
        <ContentSection
          title="Chiropractic Care For Vertigo"
          text={
            <>
              Jessica Fields was born in Illinois. She moved to Arizona in 1990,
              from Davenport, IA, after her Mother completed Palmer College of
              Chiropractic. Jessica’s family has four generations of Chiropractors.
              <br />
              <br />
              Jessica is married and has two children. She teaches and practices
              hot flow yoga and hot pilates. Jessica enjoys traveling and spending
              time with her family and friends.
            </>
          }
          image={jessica}
        />
      </div>
    </>
  );
};

export default Jessica;