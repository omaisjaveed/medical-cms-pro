import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerBanner from "../Components/InnerBanner";
import api from "../services/api";
import jessica from "../assets/images/jessica-fields.webp";
import angela from "../assets/images/angela-ajamie.webp";

gsap.registerPlugin(ScrollTrigger);

const fallbackMembers = [
  {
    id: 1,
    name: "Jessica Fields",
    imageKey: "",
    image: jessica,
    description:
      "Jessica Fields was born in Illinois. She moved to Arizona in 1990, from Davenport, IA, after her Mother completed Palmer College of Chiropractic. Jessica's family has four generations of Chiropractors.",
    readMoreLink: "/jessica-fields",
  },
  {
    id: 2,
    name: "Angela Ajamie",
    designation: "Massage Therapist LMT",
    imageKey: "",
    image: angela,
    description: "Angela Ajamie, LMT, has been practicing massage for over 25 years. Her journey began when...",
    readMoreLink: "/angela-ajamie",
  },
];

const MeetTheTeam = () => {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const cardsRef = useRef<any[]>([]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await api.getPage("meet-the-team");
        if (response.success) {
          setPageData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch meet the team page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const sections = useMemo(() => {
    const pageSections = Array.isArray(pageData?.sections) ? [...pageData.sections].sort((a, b) => a.order - b.order) : [];
    return {
      hero: pageSections.find((section) => section.type === "hero"),
      team: pageSections.find((section) => section.type === "teamMembers"),
    };
  }, [pageData]);

  const teamData = useMemo(() => {
    const members = Array.isArray(sections.team?.content?.members) ? sections.team.content.members : [];
    return members.length > 0 ? members : fallbackMembers;
  }, [sections]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 30 });

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
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [teamData]);

  const resolveImage = (imageKey?: string, fallback?: string) => {
    if (!imageKey) return fallback || "";
    return `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${imageKey}${imageKey.includes(".") ? "" : ".webp"}`;
  };

  if (loading) {
    return (
      <div
        className="loading-screen"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData?.meta_title || "Meet The Team | Tatum Wellness"}</title>
        <meta
          name="description"
          content={pageData?.meta_description || "Meet the team behind Tatum Wellness."}
        />
      </Helmet>

      <InnerBanner bannertitle={sections.hero?.content?.title || "Meet The Team"} />

      <section className="meet-team-sec" ref={sectionRef}>
        <div className="container">
          <div className="row">
            {teamData.map((member: any, idx: number) => (
              <div
                className="col-lg-6 col-md-6 col-sm-12 mb-5"
                key={member.id || member.name || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
              >
                <div className="team-card">
                  <div className="team-image">
                    <img src={resolveImage(member.imageKey, member.image || (idx === 0 ? jessica : angela))} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <span className="designation">{member.designation}</span>
                    <p>{member.description}</p>
                    {member.readMoreLink ? (
                      <a href={member.readMoreLink} className="readmore-btn">
                        Read More
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MeetTheTeam;
