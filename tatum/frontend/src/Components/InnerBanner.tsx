import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function InnerBanner({ bannertitle }) {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Initial state: hidden, blurred, slightly scaled down
    gsap.set(heading, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: "blur(8px)",
    });

    // Animate to visible
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "back.out(1.2)",
      delay: 0.2,
    });
  }, []);

  return (
    <>
      <section className="inner-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="inner-banner-content-wrapper">
                <h2 ref={headingRef}>{bannertitle}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InnerBanner;