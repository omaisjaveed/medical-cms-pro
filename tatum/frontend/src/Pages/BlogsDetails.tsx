import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faComment, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import InnerBanner from "../Components/InnerBanner";
import api from "../services/api";

gsap.registerPlugin(ScrollTrigger);

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.getBlog(slug!);
        if (response.success) {
          setBlog(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch blog details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false,
  });

  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const backRef = useRef(null);
  const commentSectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!blog) return;

    // Set initial hidden state for main content
    gsap.set([titleRef.current, metaRef.current, imageRef.current, contentRef.current, backRef.current], {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".blog-detail-container",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(metaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(imageRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" }, "-=0.2")
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .to(backRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1)" }, "-=0.3");

    // Animate comment section separately
    const commentSection = commentSectionRef.current;
    const formElements = formRef.current ? [formRef.current] : [];
    if (commentSection) {
      gsap.set([commentSection, ...formElements], { opacity: 0, y: 40 });
      gsap.to([commentSection, ...formElements], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1)",
        scrollTrigger: {
          trigger: commentSection,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [blog]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", formData);
    // Here you would send to backend or API
    alert("Thank you for your comment! (Demo mode)");
    // Optionally reset form
    setFormData({ name: "", email: "", website: "", comment: "", saveInfo: false });
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container text-center py-5">
        <h2>Blog post not found</h2>
        <Link to="/blogs" className="btn-primary mt-3">← Back to Blogs</Link>
      </div>
    );
  }

  const blogImage = blog.featured_image 
    ? `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${blog.featured_image}${blog.featured_image.includes('.') ? '' : '.webp'}`
    : "/assets/images/blog-placeholder.webp";

  return (
    <>
      <Helmet>
        <title>{blog.title} | Tatum Wellness</title>
        <meta name="description" content={blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 160)} />
      </Helmet>

      <InnerBanner bannertitle="Blog Details" />

      <section className="blog-detail-sec">
        <div className="container blog-detail-container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <Link to="/blogs" className="back-link mb-4 d-inline-block" ref={backRef}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back to Blogs
              </Link>

              <h1 ref={titleRef} className="mb-3">{blog.title}</h1>

              <div className="blog-meta mb-4" ref={metaRef}>
                <span><FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Recent'}</span>
                <span className="ms-4"><FontAwesomeIcon icon={faComment} className="me-2" /> {blog.commentCount || 0} Comments</span>
              </div>

              <div className="blog-featured-img mb-5" ref={imageRef}>
                <img src={blogImage} alt={blog.title} className="img-fluid rounded-4 shadow-sm" />
              </div>

              <div className="blog-content-body fs-5" ref={contentRef} dangerouslySetInnerHTML={{ __html: blog.content }} />

              {/* Leave a Reply Section */}
              {/* <div className="comment-section" ref={commentSectionRef}>
                <h3>Leave a Reply</h3>
                <p className="comment-note">Your email address will not be published. Required fields are marked *</p>
                <form onSubmit={handleSubmit} ref={formRef}>
                  <div className="form-group">
                    <textarea
                      name="comment"
                      placeholder="Comment *"
                      rows="5"
                      value={formData.comment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="url"
                        name="website"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                      />
                      <span>Save my name, email, and website in this browser for the next time I comment.</span>
                    </label>
                  </div>
                  <button type="submit" className="submit-comment-btn">Post Comment</button>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </section>

    
    </>
  );
};

export default BlogDetail;