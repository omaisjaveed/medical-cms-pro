import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import wristImg from "../assets/images/backpain.webp";
import elbowImg from "../assets/images/elbow.webp";
import shoulderImg from "../assets/images/shoulder3.webp";
import backImg from "../assets/images/backpain2.webp";
import kneeImg from "../assets/images/leg2.webp";
import ankleImg from "../assets/images/work2.webp";
import piezo1 from "../assets/images/leg1.webp";
import piezo2 from "../assets/images/leg2.webp";
import OtherServices from "../Components/OtherServices";

function PiezowaveTreatments() {
    const painServices = [
        {
            id: 1,
            title: "Wrist Pain",
            text: "Wrist pain, often from repetitive strain or conditions like carpal tunnel syndrome, finds relief with Piezowave therapy. By improving blood flow and tissue regeneration, this treatment reduces inflammation and eases pain.",
            image: wristImg,
        },
        {
            id: 2,
            title: "Elbow Pain",
            text: "Conditions including tennis elbow or golfer’s elbow respond well to Piezowave therapy. The treatment breaks down scar tissue, accelerates healing, and restores functionality to the elbow joint.",
            image: elbowImg,
        },
        {
            id: 3,
            title: "Shoulder Pain",
            text: "Whether caused by rotator cuff injuries or frozen shoulder, Piezowave therapy aids in reducing inflammation and improving mobility. It supports faster recovery by enhancing blood circulation and tissue repair.",
            image: shoulderImg,
        },
        {
            id: 4,
            title: "Back Pain",
            text: "Chronic back pain, including issues like muscle strain or sciatica, benefits from Piezowave therapy. This treatment relaxes muscle tension, alleviates nerve irritation, and triggers the body’s natural healing processes.",
            image: backImg,
        },
        {
            id: 5,
            title: "Knee Pain",
            text: "Piezowave therapy effectively addresses knee pain from arthritis, tendinitis, or injuries. By reducing inflammation and supporting tissue repair, it enhances joint function and accelerates recovery.",
            image: kneeImg,
        },
        {
            id: 6,
            title: "Ankle Pain",
            text: "Ankle injuries such as sprains or Achilles tendinitis find relief with Piezowave therapy. By reducing swelling and increasing range of motion, this treatment promotes faster healing and restores mobility.",
            image: ankleImg,
        },
    ];

    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!section) return;

        // Initial hidden state (waisa hi jaise slider mein tha)
        gsap.set(cards, { opacity: 0, y: 40 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        tl.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1)",
        });

        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);

    return (
        <>
            <Helmet>
                <title>Discover Effective Piezowave Treatments | Tatum Wellness</title>
                <meta name="description" content="" />
            </Helmet>
            <InnerBanner bannertitle="Discover Effective Piezowave Treatments" />
            <ContentSection
                title="Discover Effective Piezowave Treatments"
                text={
                    <>
                        Tatum Chiropractic and Wellness offers cutting-edge Piezowave treatments designed to alleviate a range of painful conditions. This advanced therapy uses acoustic waves to stimulate healing and provide relief naturally. Here are the conditions we effectively treat with Piezowave therapy:
                    </>
                }
                image={piezo1}
            />

            <section className="pain-services-grid-sec" ref={sectionRef}>
                <div className="container">
                    <div className="row">
                        {painServices.map((service, idx) => (
                            <div
                                className="col-lg-4 col-md-6 col-sm-12 mb-4"
                                key={service.id}
                                ref={(el) => (cardsRef.current[idx] = el)}
                            >
                                <div className="pain-service-card">
                                    <div className="pain-service-img">
                                        <img src={service.image} alt={service.title} />
                                    </div>
                                    <h4>{service.title}</h4>
                                    <p>{service.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <ContentSection
                title="Plantar Fasciitis"
                text={
                    <>
                        Piezowave therapy is highly effective for plantar fasciitis, a common cause of heel pain. By targeting the inflamed tissue, it reduces pain and accelerates healing, allowing for improved movement and comfort.
                        <br /><br />
                        Experience the benefits of Piezowave therapy at Tatum Chiropractic and Wellness. Our non-invasive approach helps you regain a pain-free lifestyle and optimal mobility. Contact us today to schedule your appointment and start your journey toward relief and recovery.
                    </>
                }
                image={piezo2}
                reverse={true}
            />

            <OtherServices />

        </>
    );
}

export default PiezowaveTreatments;