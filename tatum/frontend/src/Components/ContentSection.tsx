import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import placeholderImg from "../assets/images/tatum-slider.webp";

gsap.registerPlugin(ScrollTrigger);

const ContentSection = ({ 
  title, 
  text, 
  image, 
  reverse, 
  showButtons = true, 
  button1Text = "Learn More", 
  button2Text = "Contact Us",
  className = ""
}) => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const line = lineRef.current;
    const buttons = [button1Ref.current, button2Ref.current].filter(Boolean);

    if (!section || !imageWrap || !image || !content || !line) return;

    const ctx = gsap.context(() => {
      // Select all text elements inside content (heading, paragraph, etc.)
      const textElements = content.querySelectorAll("h2, p, .subtitle, .section-title, .section-desc");

      // Initial states
      gsap.set(imageWrap, {
        opacity: 0,
        y: 80,
        rotateY: -10,
        transformPerspective: 1200,
        transformOrigin: "left center",
      });

      gsap.set(image, {
        scale: 1.18,
        filter: "blur(10px)",
      });

      if (textElements.length > 0) {
        gsap.set(textElements, {
        opacity: 0,
        y: 28,
      });
      }

      gsap.set(line, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      if (buttons.length) {
        gsap.set(buttons, {
          opacity: 0,
          y: 22,
          scale: 0.94,
        });
      }

      // Main timeline with ScrollTrigger (plays only once)
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(imageWrap, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .to(
          image,
          {
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1.05"
        )
        .to(
          line,
          {
            scaleX: 1,
            duration: 0.75,
          },
          "-=0.95"
        );

      if (textElements.length > 0) {
        tl.to(
          textElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.7"
        );
      }

      if (buttons.length) {
        tl.to(
          buttons,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.5"
        );
      }

      // Parallax on scroll (image moves slightly)
      gsap.to(image, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      // Mouse move 3D tilt effect
      const handlePointerMove = (event) => {
        const bounds = section.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(imageWrap, {
          rotateY: x * 10,
          rotateX: y * -8,
          x: x * 16,
          y: y * 10,
          duration: 0.9,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(content, {
          x: x * 6,
          y: y * 4,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        gsap.to([imageWrap, content], {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          ease: "expo.out",
          overwrite: "auto",
        });
      };

      section.addEventListener("pointermove", handlePointerMove);
      section.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        section.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, section);

    return () => ctx.revert();
  }, [title]);

  return (
    <section className={`content-section ${className}`} ref={sectionRef}>
      <div className="container">
        <div className={`row align-items-center ${reverse ? "flex-row-reverse" : ""}`}>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 mb-lg-0">
            <div className="content-image-box" ref={imageWrapRef}>
              <img 
                ref={imageRef} 
                src={image || placeholderImg} 
                alt={title} 
                className="img-fluid" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== placeholderImg) {
                    target.src = placeholderImg;
                  }
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="content-text-box" ref={contentRef}>
              <h2 className="section-title mb-4">{title}</h2>
              <div className="section-line mb-4" ref={lineRef}></div>
              {typeof text === 'string' ? (
                <p className="section-desc mb-0" dangerouslySetInnerHTML={{ __html: text }} />
              ) : (
                <div className="section-desc mb-0">{text}</div>
              )}
              
              {showButtons && (
                <div className="content-buttons d-flex gap-3 mt-5">
                  <button ref={button1Ref} className="btn btn-primary">{button1Text}</button>
                  <button ref={button2Ref} className="btn btn-outline-primary">{button2Text}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;