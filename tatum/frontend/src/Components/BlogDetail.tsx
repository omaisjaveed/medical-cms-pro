import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  featured_image: string;
  createdAt: string;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        console.log("Fetched blog data:", data); // Debugging log
        if (!data || !data.id) {
          console.error("Invalid blog data received:", data); // Log the invalid data
          throw new Error("Invalid blog data received");
        }
        setBlog(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="blog-detail">
      <div className="container">
        <h1>{blog.title}</h1>
        <p><em>{new Date(blog.createdAt).toLocaleDateString()}</em></p>
        <img 
          src={blog.featured_image ? `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${blog.featured_image}` : "/assets/images/blog-placeholder.webp"} 
          alt={blog.title} 
        />
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
};

export default BlogDetail;