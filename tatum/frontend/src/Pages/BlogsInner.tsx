import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faComment } from "@fortawesome/free-solid-svg-icons";
import InnerBanner from "../Components/InnerBanner";
import api from "../services/api";

gsap.registerPlugin(ScrollTrigger);

const BlogsInner = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.getBlogs();
        if (response.success) {
          setBlogs(response.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const section = sectionRef.current;
      const cards = cardsRef.current.filter(Boolean);
      if (!section) return;

      gsap.set(cards, { opacity: 0, y: 40 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });

      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }, [blogs]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blogs | Tatum Wellness</title>
        <meta
          name="description"
          content="Read our latest articles on chiropractic care, wellness tips, and patient stories."
        />
      </Helmet>

      <InnerBanner bannertitle="Blogs" />

      <section className="blogs-listing-sec" ref={sectionRef}>
        <div className="container">
          <div className="row g-4">
            {blogs.map((blog, idx) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                key={blog.id}
                ref={(el) => (cardsRef.current[idx] = el)}
              >
                <div className="blog-card">
                  <Link to={`/blogs/${blog.slug}`} className="blog-img-link">
                    <div className="blog-img">
                      <img 
                        src={blog.featured_image ? `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${blog.featured_image}${blog.featured_image.includes('.') ? '' : '.webp'}` : "/assets/images/blog-placeholder.webp"} 
                        alt={blog.title} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Blog";
                        }}
                      />
                    </div>
                  </Link>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span>
                        <FontAwesomeIcon icon={faCalendarAlt} /> {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Recent'}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faComment} /> {blog.commentCount || 0} Comments
                      </span>
                    </div>
                    <h3>
                      <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p>{blog.excerpt?.substring(0, 150)}...</p>
                    <Link to={`/blogs/${blog.slug}`} className="readmore-btn">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <div className="col-12 text-center py-5">
                <h3>No blogs found.</h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogsInner;