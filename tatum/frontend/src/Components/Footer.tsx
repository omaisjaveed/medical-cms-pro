import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import api from "../services/api";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.getSettings();
        const data = response.data;
        
        // Parse JSON strings if necessary
        const parsedData = { ...data };
        ['business_hours', 'social_links', 'contact_info'].forEach(key => {
          if (typeof parsedData[key] === 'string') {
            try {
              parsedData[key] = JSON.parse(parsedData[key]);
            } catch (e) {
              console.error(`Failed to parse ${key} in footer`, e);
            }
          }
        });

        // Helper to strip surrounding quotes and clean up redundancy
        const cleanString = (str: string) => {
          if (!str) return "";
          // Remove literal quotes and escaped quotes
          let cleaned = str.replace(/^["\\]+|["\\]+$/g, '').trim();
          // Remove redundant copyright info if it exists at the start
          cleaned = cleaned.replace(/^©\d{4}\s*/, '');
          // Remove site name from footer text if it's there (since we add it separately)
          const siteName = (parsedData.site_name || "").replace(/^["\\]+|["\\]+$/g, '').trim();
          if (siteName && cleaned.startsWith(siteName)) {
            cleaned = cleaned.replace(new RegExp(`^${siteName}\\s*[|\\s]*`), '');
          }
          return cleaned;
        };

        if (parsedData.site_name) parsedData.site_name = cleanString(parsedData.site_name);
        if (parsedData.footer_text) parsedData.footer_text = cleanString(parsedData.footer_text);
        
        setSettings(parsedData);
      } catch (err) {
        console.error("Failed to load settings in footer", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="footer-sec">
      <div className="container footer-wrapper">
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/about-us" className={({ isActive }) => isActive ? "active" : ""}>
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/back-pain" className={({ isActive }) => isActive ? "active" : ""}>
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact-us" className={({ isActive }) => isActive ? "active" : ""}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Business Hours</h3>
          {settings?.business_hours ? (
            Object.entries(settings.business_hours).map(([day, hours]: any) => (
              <p key={day} style={{ textTransform: 'capitalize' }}>
                {day} {hours}
              </p>
            ))
          ) : (
            <>
              <p>Monday 9 AM - 5:30 PM</p>
              <p>Tuesday 9 AM - 12 PM</p>
              <p>Wednesday 9 AM - 5:30 PM</p>
              <p>Thursday 2 PM - 5:30 PM</p>
              <p>Friday 9 AM - 5 PM</p>
            </>
          )}

          <div className="social-icons">
            {settings?.social_links?.facebook && (
              <a href={settings.social_links.facebook} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            )}
            {settings?.social_links?.twitter && (
              <a href={settings.social_links.twitter} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            )}
            {settings?.social_links?.youtube && (
              <a href={settings.social_links.youtube} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            )}
            {settings?.social_links?.linkedin && (
              <a href={settings.social_links.linkedin} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            )}
            {settings?.social_links?.instagram && (
              <a href={settings.social_links.instagram} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            )}
            {!settings?.social_links && (
              <>
                <FontAwesomeIcon icon={faFacebookF} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faYoutube} />
                <FontAwesomeIcon icon={faLinkedinIn} />
                <FontAwesomeIcon icon={faInstagram} />
              </>
            )}
          </div>
        </div>

        <div className="footer-col map-col">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.1136701533687!2d-111.9918345!3d33.75772839999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b7baccfc76a13%3A0xd8251fbb24879410!2s29834%20N%20Cave%20Creek%20Rd%20APT%20142%2C%20Cave%20Creek%2C%20AZ%2085331%2C%20USA!5e0!3m2!1sen!2s!4v1776206250169!5m2!1sen!2s"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="footer-bottom">
        <p>©{new Date().getFullYear()} {settings?.site_name || "Tatum Chiropractic and Wellness"}</p>
        <p>
          <NavLink to="/privacy-policy" style={{textDecoration: "none", color: "#fff"}}>
            Privacy Policy
          </NavLink> | {settings?.footer_text || "Web Design, Digital Marketing & SEO By Adit"}
        </p>
      </div>
    </footer>
  );
};

export default Footer;