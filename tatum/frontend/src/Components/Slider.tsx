import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import slideImage from "../assets/images/tatum-slider.webp";
import { getImagePath } from "../utils/imageUtils";

  const splitTextIntoSpans = (text: string) => {
    // If text contains HTML tags, we don't split it into spans for animation to avoid breaking the layout
    if (/<[a-z][\s\S]*>/i.test(text)) {
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }
    return text.split(" ").map((word, idx) => (
      <span key={idx} className="word" style={{ display: "inline-block", whiteSpace: "normal" }}>
        {word}&nbsp;
      </span>
    ));
  };

interface Slide {
  id: number;
  mainHeading: string;
  mainParagraph?: string;
  secondHeading: string;
  button1Text: string;
  button2Text: string;
  button1Link: string;
  button2Link: string;
  imageUrl: string;
}

const Slider = ({ data }: { data?: any }) => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(!data);

  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (data?.content) {
      const content = data.content;
      if (Array.isArray(content)) {
        setSlides(
          content.map((s: any, index: number) => ({
            id: s.id || index + 1,
            mainHeading: s.mainHeading || s.title || "",
            mainParagraph: s.mainParagraph || s.subtitle || "",
            secondHeading: s.secondHeading || s.subtitle || "",
            button1Text: s.button1Text || s.button1 || "Learn More",
            button2Text: s.button2Text || s.button2 || "Text Us",
            button1Link: s.button1Link || "/about-us",
            button2Link: s.button2Link || "https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670",
            imageUrl:
              typeof s.imageUrl === "string"
                ? s.imageUrl
                : getImagePath(s.imageKey, slideImage),
          }))
        );
      } else {
        setSlides([
          {
            id: 1,
            mainHeading: content.title || "",
            mainParagraph: content.mainParagraph || content.subtitle || "",
            secondHeading: content.subtitle || "",
            button1Text: content.button1Text || content.button1 || "Learn More",
            button2Text: content.button2Text || content.button2 || "Text Us",
            button1Link: content.button1Link || "/about-us",
            button2Link: content.button2Link || "https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670",
            imageUrl:
              typeof content.imageUrl === "string"
                ? content.imageUrl
                : getImagePath(content.imageKey, slideImage),
          },
        ]);
      }
      setLoading(false);
      return;
    }

    setSlides([
      {
        id: 0,
        mainHeading: "Experience Better Health",
        mainParagraph: "Tatum Chiropractic and Wellness provides comprehensive care for your entire family.",
        secondHeading: "Wellness for Life",
        button1Text: "Learn More",
        button2Text: "Book Now",
        button1Link: "/about-us",
        button2Link: "https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670",
        imageUrl: slideImage,
      },
    ]);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => window.clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    if (currentIndex >= slides.length && slides.length > 0) {
      setCurrentIndex(0);
    }
  }, [slides, currentIndex]);

  const animateSlide = () => {
    const words = heading1Ref.current?.querySelectorAll(".word");
    if (words && words.length > 0) {
      gsap.fromTo(
        words,
        { opacity: 0, y: -20, rotate: -8 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "back.out(1.7)",
          clearProps: "all"
        }
      );
    }

    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.15, clearProps: "all" }
      );
    }

    const elements = [heading2Ref.current, button1Ref.current, button2Ref.current].filter(Boolean);
    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.22, ease: "power2.out", clearProps: "all" }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out", clearProps: "all" }
      );
    }
  };

  useLayoutEffect(() => {
    if (!loading && slides[currentIndex]) {
      const timer = window.setTimeout(() => {
        animateSlide();
      }, 30);
      return () => window.clearTimeout(timer);
    }
  }, [currentIndex, loading, slides]);

  if (loading || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="premium-slider">
      <div className="slide-image-wrapper">
        <img
          ref={imageRef}
          className="slide-image"
          src={currentSlide.imageUrl}
          alt={currentSlide.mainHeading}
          onError={(e) => {
            (e.target as HTMLImageElement).src = slideImage;
          }}
        />
        <div className="overlay-gradient"></div>
      </div>
      
      {/* Absolutely positioned arrows to ensure they are clickable */}
      <div className="slider-arrows-absolute">
        <div className="arrow-icon-btn prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className="arrow-icon-btn next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>

      <div className="slide-content">
        <div className="container-fluid">
          <div className="row custom-row g-4 align-items-center">
            {/* Column 1: col-6 - Main heading with word spans */}
            <div className="col-12 col-md-6">
              <h1 ref={heading1Ref} className="slider-heading">
                {splitTextIntoSpans(currentSlide.mainHeading)}
              </h1>
              <p
                ref={paragraphRef}
                className="lead text-white-80 fs-5 text-shadow-premium"
                style={{ opacity: 0, maxWidth: "90%" }}
                dangerouslySetInnerHTML={{ __html: currentSlide.mainParagraph || "" }}
              />
            </div>

            {/* Column 2: col-6 */}
            <div className="col-12 col-md-6">
              <h3
                ref={heading2Ref}
                className="fw-semibold mb-4 text-white text-shadow-premium"
                style={{ opacity: 0, fontSize: "1.8rem" }}
                dangerouslySetInnerHTML={{ __html: currentSlide.secondHeading || "" }}
              />
              <div className="slider-btns-wrapper">
                <a
                  ref={button1Ref}
                  href={currentSlide.button1Link}
                  className="btn-premium-solid"
                  style={{ opacity: 0, textDecoration: 'none', display: 'inline-block' }}
                >
                  {currentSlide.button1Text}
                </a>
                <a
                  ref={button2Ref}
                  href={currentSlide.button2Link}
                  className="btn-premium-outline"
                  style={{ opacity: 0, textDecoration: 'none', display: 'inline-block' }}
                >
                  {currentSlide.button2Text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
