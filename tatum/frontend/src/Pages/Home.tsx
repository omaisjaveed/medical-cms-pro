import React, { useEffect, useState, useCallback, useMemo } from "react";
import Slider from "../Components/Slider";
import InfoBoxes from "../Components/InfoBoxes";
import AboutComponent from "../Components/AboutComponent";
import OurServices from "../Components/OurServices";
import Chiropractic from "../Components/Chiropractic";
import Doctor from "../Components/Doctor";
import Gallery from "../Components/Gallery";
import Blog from "../Components/Blogs";
import { Helmet } from "react-helmet-async";
import api from "../services/api";

function Home() {
    const [pageData, setPageData] = useState<any>(null);
    const [globalData, setGlobalData] = useState<{
        services: any[];
        blogs: any[];
        galleries: any[];
    }>({
        services: [],
        blogs: [],
        galleries: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch page data and global data in parallel
                const [pageRes, servicesRes, blogsRes, galleriesRes] = await Promise.all([
                    api.getPage("home"),
                    api.getServices(),
                    api.getBlogs(),
                    api.getGallery()
                ]);

                if (pageRes.success) {
                    setPageData(pageRes.data);
                }

                setGlobalData({
                    services: servicesRes.success ? servicesRes.data : [],
                    blogs: blogsRes.success ? blogsRes.data : [],
                    galleries: galleriesRes.success ? galleriesRes.data : []
                });

            } catch (error) {
                console.error("Failed to fetch home page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    // Memoize the getSection function to prevent unnecessary re-renders
    const getSection = useCallback((type: string, filter?: (s: any) => boolean) => {
        if (!pageData?.sections || !Array.isArray(pageData.sections)) return null;
        if (filter) return pageData.sections.find((s: any) => s.type === type && filter(s));
        return pageData.sections.find((s: any) => s.type === type);
    }, [pageData]);

    // Pre-calculate sections to pass to components
    const sections = useMemo(() => {
        if (!pageData) return {};
        return {
            hero: getSection("hero"),
            infoBoxes: getSection("infoBoxes"),
            about: getSection("content", (s) => !s.content?.reverse && !s.content?.title?.toLowerCase().includes("doctor")),
            services: getSection("servicesCarousel") || getSection("services") || getSection("service"),
            chiropractic: getSection("content", (s) => s.content?.reverse),
            doctor: getSection("content", (s) => s.content?.title?.toLowerCase().includes("doctor")),
            gallery: getSection("gallery"),
            blog: getSection("blogSlider") || getSection("blog") || getSection("blogs"),
        };
    }, [pageData, getSection]);

    if (loading) {
        return (
            <div className="loading-screen" style={{ 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: '#fff'
            }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{pageData?.meta_title || "Home | Tatum Wellness"}</title>
                <meta name="description" content={pageData?.meta_description || "Welcome to Tatum Chiropractic and Wellness"} />
            </Helmet>
            
            <Slider data={sections.hero} />
            <InfoBoxes data={sections.infoBoxes} />
            <AboutComponent data={sections.about} />
            
            <OurServices 
                data={sections.services} 
                allServices={globalData.services} 
            />
            
            <Chiropractic data={sections.chiropractic} />
            <Doctor data={sections.doctor} />
            
            <Gallery 
                data={sections.gallery} 
                allGalleries={globalData.galleries} 
            />
            
            <Blog 
                data={sections.blog} 
                allBlogs={globalData.blogs} 
            />
        </>
    );
}

export default Home;
