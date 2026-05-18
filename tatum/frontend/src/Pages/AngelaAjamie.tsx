import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import angela from "../assets/images/angela-ajamie.webp";


gsap.registerPlugin(ScrollTrigger);

const AngelaAjamie = () => {
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
                <title>Angela Ajamie | Tatum Wellness</title>
                <meta
                    name="description"
                    content="Meet Dr. Jessica Fields, a fourth‑generation chiropractor at Tatum Wellness. Learn about her background, family legacy, and passion for yoga and wellness."
                />
            </Helmet>

            <InnerBanner bannertitle="Angela Ajamie" />

            <div ref={sectionRef}>
                <ContentSection
                    title="Angela Ajamie"
                    text={
                        <>
                            <h4 className="team-designation">Massage Therapist LMT</h4>
                            <br />
                            Angela Ajamie, LMT, has been practicing massage for over 25 years. Her journey began when she decided she needed a career change from a desk job to a life of helping others through therapeutic touch.


                            <br />
                            <br />
                            Angela became accustomed to working with Chiropractors over the years helping individuals with head and neck pain. She believes strongly in the benefits of incorporating massage therapy with Chiropractic adjustments. Together, massage and Chiropractic adjustments are complementary at helping to relax tense muscles making adjustments easier and more effective. This holistic approach helps the body heal by increasing circulation within the tissues and improving structural alignment.

                            <br /><br />
                            Angela’s massage modalities include neuromuscular trigger point, lymphatic massage, Myofascial Release Therapy (MFR), and Swedish massage. Every massage client receives an individualized treatment according to their needs. it is common for Angela to use several modalities during a massage session. Angela participates in yearly continuing education classes to learn new massage styles and to refresh her current massage skills.
                            <br /><br />
                            When not practicing massage therapy, Angela enjoys spending time with her husband and two children. Together they enjoy hiking, road trips, snorkeling and trying new restaurants. Angela has three pets at home: Lilo, her Chuggle pup, Sailor, her Ginger cat, and Aurthur, her son’s blue tongued lizard.



                        </>
                    }
                    image={angela}
                />
            </div>
        </>
    );
};

export default AngelaAjamie;