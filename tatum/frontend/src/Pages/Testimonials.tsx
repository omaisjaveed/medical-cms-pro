import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "../assets/images/about-img.webp";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";



gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {

    return (
        <>
            <Helmet>
                <title>Testmonials | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Testmonials" />
            <section className="testimonials-sec">
                
            </section>
        </>
    );
};

export default Testimonials;
