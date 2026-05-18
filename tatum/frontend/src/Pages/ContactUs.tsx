import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
  faMobileAlt,
  faFax,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import InnerBanner from "../Components/InnerBanner";
import api from "../services/api";
import { toast } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const sectionRef = useRef(null);
  const infoCardsRef = useRef([]);
  const formRef = useRef(null);
  const formHeadingRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    { icon: faMapMarkerAlt, title: "Address", detail: "29834 N. Cave Creek Rd Suite 142 Cave Creek, AZ 85331", link: null },
    { icon: faEnvelope, title: "Email Us", detail: "tatumwellnesschiropractic@gmail.com", link: "mailto:tatumwellnesschiropractic@gmail.com" },
    { icon: faPhoneAlt, title: "Call Number", detail: "480-513-8900", link: "tel:4805138900" },
    { icon: faMobileAlt, title: "Text", detail: "480-513-8900", link: "sms:4805138900" },
    { icon: faFax, title: "Fax", detail: "480-513-9395", link: null },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const infoCards = infoCardsRef.current.filter(Boolean);
    const form = formRef.current;
    const formHeading = formHeadingRef.current;

    if (!section) return;

    // Initial hidden state
    gsap.set(infoCards, { opacity: 0, y: 30 });
    gsap.set([form, formHeading], { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(infoCards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)",
    }).to(
      [formHeading, form],
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1)",
      },
      "-=0.2"
    );

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Sending message...");
    
    try {
      const response = await api.createInquiry({
        formName: "contact",
        data: { ...formData }
      });
      
      if (response.success) {
        toast.success("Thank you! Your message has been sent successfully.", { id: loadingToast });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      toast.error(err.message || "Something went wrong. Please try again later.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Tatum Wellness</title>
        <meta name="description" content="Get in touch with Tatum Wellness – schedule an appointment or ask questions. Visit our Cave Creek clinic or call us." />
      </Helmet>

      <InnerBanner bannertitle="Contact Us" />

      <section className="contact-page-sec" ref={sectionRef}>
        <div className="container">
          <div className="row g-5">
            {/* Left Column - Contact Info Cards */}
            <div className="col-lg-6">
              <div className="contact-info-main-heading">
                <h2>Contact Us For More Info</h2>
              </div>
              <div className="contact-info-grid">
                {contactInfo.map((item, idx) => (
                  <div
                    className="info-card"
                    key={idx}
                    ref={(el) => (infoCardsRef.current[idx] = el)}
                  >
                    <div className="info-icon">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div className="info-content">
                      <h4>{item.title}</h4>
                      {item.link ? (
                        <a href={item.link}>{item.detail}</a>
                      ) : (
                        <p>{item.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="col-lg-6">
              <div className="form-wrapper">
                <h3 ref={formHeadingRef}>Message Us</h3>
                <form onSubmit={handleSubmit} ref={formRef}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    ></textarea>
                  </div>
                  <button type="submit" className="send-btn" disabled={loading}>
                    <FontAwesomeIcon icon={faPaperPlane} /> {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;