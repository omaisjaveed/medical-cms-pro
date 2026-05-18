import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/images/tatum-logo.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import api from "../services/api";

function Header() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
    const [services, setServices] = useState<any[]>([]);
    const dropdownRefs = useRef<any>({});
    const nestedDropdownRefs = useRef<any>({});

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Use getServiceTree to get hierarchical data
                const response = await api.getServiceTree();
                console.log("Header Services Data:", response.data); // Debugging
                if (response.success) {
                    setServices(response.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch services for header:", error);
            }
        };
        fetchServices();
    }, [openDropdown === "Services"]); // Re-fetch when services menu is interacted with

    const toggleDropdown = (name: string) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
        setOpenNestedDropdown(null);
    };

    const handleNestedMouseEnter = (name: string) => {
        setOpenNestedDropdown(name);
    };

    const handleNestedMouseLeave = () => {
        setOpenNestedDropdown(null);
    };

    useEffect(() => {
        Object.keys(dropdownRefs.current).forEach((key) => {
            const menu = dropdownRefs.current[key];
            if (!menu) return;
            const items = menu.querySelectorAll(".dropdown-item");

            if (openDropdown === key) {
                gsap.killTweensOf([menu, items]);
                gsap.set(menu, {
                    display: "block",
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                    filter: "blur(4px)",
                    visibility: "visible"
                });
                gsap.to(menu, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                gsap.killTweensOf([menu, items]);
                gsap.to(menu, {
                    opacity: 0,
                    y: 5,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => gsap.set(menu, { display: "none", visibility: "hidden" })
                });
            }
        });
    }, [openDropdown]);

    useEffect(() => {
        Object.keys(nestedDropdownRefs.current).forEach((key) => {
            const nestedMenu = nestedDropdownRefs.current[key];
            if (!nestedMenu) return;

            if (openNestedDropdown === key) {
                gsap.killTweensOf(nestedMenu);
                gsap.set(nestedMenu, {
                    display: "block",
                    opacity: 0,
                    x: 10,
                    visibility: "visible"
                });
                gsap.to(nestedMenu, {
                    opacity: 1,
                    x: 0,
                    duration: 0.25,
                    ease: "power2.out"
                });
            } else {
                gsap.killTweensOf(nestedMenu);
                gsap.to(nestedMenu, {
                    opacity: 0,
                    x: 5,
                    duration: 0.15,
                    onComplete: () => gsap.set(nestedMenu, { display: "none", visibility: "hidden" })
                });
            }
        });
    }, [openNestedDropdown]);

    useEffect(() => {
        if (!openDropdown) {
            setOpenNestedDropdown(null);
        }
    }, [openDropdown]);

    const navItems = [
        { name: "Home", path: "/" },
        {
            name: "About", path: "/about-us",
            dropdown: [
                { name: "Meet The Doctor", path: "/meet-the-doctor" },
                { name: "Meet The Team", path: "/meet-the-team" },
                { name: "Testimonials", path: "/testimonials" },
                { name: "Gallery", path: "/gallery" },
                { name: "Tools of the Trade", path: "/tools-of-the-trade" },
                { name: "Blogs", path: "/blogs" },
            ],
        },
        {
            name: "Services",
            dropdown: services.length > 0 ? services.map(s => ({
                name: s.title,
                path: `/${s.slug}`,
                nestedDropdown: s.children && s.children.length > 0 ? s.children.map((c: any) => ({
                    name: c.title,
                    path: `/${c.slug}`
                })) : null
            })) : []
        },
        { name: "Contact Us", path: "/contact-us" },
    ];

    return (
        <>
            <section className="header-strip">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="header-strip-wrapper">
                                <p>Accepting Medicare</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <header className="header-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                            <div className="header-logo-wrapper">
                                <NavLink to="/">
                                    <img src={logo} alt="Logo" className="img-fluid" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                            <div className="header-links-wrapper">
                                <div className="header-contact-wrapper">
                                    <div className="email-box">
                                        <div className="email-icon">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                        <div className="email-content">
                                            <h6>Email</h6>
                                            <p>timrlind@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="phone-box">
                                        <div className="phone-icon">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </div>
                                        <div className="phone-content">
                                            <h6>Call Us</h6>
                                            <p>480-513-8900</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="header-navlinks">
                                    <nav className="navbar navbar-expand-lg">
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbarNav">
                                            <ul className="navbar-nav">
                                                {navItems.map((item) => (
                                                    <li
                                                        className={`nav-item ${item.dropdown && item.dropdown.length > 0 ? "dropdown" : ""} ${openDropdown === item.name ? "dropdown-open" : ""}`}
                                                        key={item.name}
                                                        onMouseEnter={() => setOpenDropdown(item.name)}
                                                        onMouseLeave={() => {
                                                            setOpenDropdown(null);
                                                            setOpenNestedDropdown(null);
                                                        }}
                                                    >
                                                        {item.dropdown && item.dropdown.length > 0 ? (
                                                            <div className="nav-link dropdown-toggle-wrapper">
                                                                <NavLink to={item.path || "#"} className="main-link">
                                                                    {item.name}
                                                                </NavLink>
                                                                <span
                                                                    className="dropdown-trigger"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        toggleDropdown(item.name);
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faAngleDown} className="dropdown-icon" />
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <NavLink
                                                                to={item.path || "#"}
                                                                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                                            >
                                                                {item.name}
                                                            </NavLink>
                                                        )}

                                                        {item.dropdown && item.dropdown.length > 0 && (
                                                            <ul
                                                                className={`dropdown-menu ${openDropdown === item.name ? "show" : ""}`}
                                                                ref={(el) => (dropdownRefs.current[item.name] = el)}
                                                            >
                                                                {item.dropdown.map((sub: any) => (
                                                                    <li
                                                                        key={sub.name}
                                                                        className={`dropdown-submenu ${openNestedDropdown === sub.name ? "submenu-open" : ""}`}
                                                                        onMouseEnter={() => handleNestedMouseEnter(sub.name)}
                                                                        onMouseLeave={handleNestedMouseLeave}
                                                                    >
                                                                        {sub.nestedDropdown ? (
                                                                            <>
                                                                                <div 
                                                                                    className="dropdown-item nested-toggle d-flex justify-content-between align-items-center"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        e.stopPropagation();
                                                                                        // Toggle for mobile, though here we handle hover for desktop
                                                                                        setOpenNestedDropdown(prev => prev === sub.name ? null : sub.name);
                                                                                    }}
                                                                                >
                                                                                    {sub.name}
                                                                                    <FontAwesomeIcon icon={faAngleRight} className="nested-icon ms-2" />
                                                                                </div>
                                                                                <ul
                                                                                    className="nested-dropdown-menu"
                                                                                    ref={(el) => (nestedDropdownRefs.current[sub.name] = el)}
                                                                                >
                                                                                    {sub.nestedDropdown.map((nested: any) => (
                                                                                        <li key={nested.name}>
                                                                                            <NavLink to={nested.path} className="dropdown-item">
                                                                                                {nested.name}
                                                                                            </NavLink>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </>
                                                                        ) : (
                                                                            <NavLink to={sub.path || "#"} className="dropdown-item">
                                                                                {sub.name}
                                                                            </NavLink>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                                <li className="nav-item ms-3">
                                                    <NavLink to="https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670" className="appointment-btn">
                                                        Book Appointment
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
