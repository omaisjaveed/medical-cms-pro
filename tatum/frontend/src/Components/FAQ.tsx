import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const faqs = [
    {
      question: "When Should Your Child See a Chiropractor?",
      answer:
        "There are so many reasons why your child should see a Chiropractor! The main reasons around this are for general wellness, as well as for injury and illness. Tatum Wellness and Chiropractic would be glad to discuss your child's specific needs.",
    },
    {
      question: "What Age Can a Child Go to a Chiropractor? How Old Does a Baby Need to Be to See a Chiropractor?",
      answer:
        "Children of any age can be seen by a Chiropractor. Babies can be seen at any time after birth by a Chiropractor as well — newborns are welcome at Tatum Wellness and Chiropractic!",
    },
    {
      question: "What techniques do the chiropractors at Tatum Wellness and Chiropractic usually use for pediatric patients?",
      answer:
        "Tatum Wellness and Chiropractic uses techniques and instruments suited for pediatric patients. Please call us for more information.",
    },
    {
      question: "What can pediatric chiropractic care do for allergies and asthma?",
      answer:
        "Studies have shown that Chiropractic care can help improve these conditions.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!section) return;

    gsap.set(items, { opacity: 0, y: 30 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)",
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section className="faq-sec" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="faq-header text-center">
              <h2>FAQ</h2>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? "active" : ""}`}
                  ref={(el) => (itemsRef.current[index] = el)}
                >
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    <h3>{faq.question}</h3>
                    <span className="faq-icon">
                      <FontAwesomeIcon icon={activeIndex === index ? faMinus : faPlus} />
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;