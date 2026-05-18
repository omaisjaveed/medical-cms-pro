import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import scolisis1 from '../assets/images/scolisis1.webp';
import scolisis2 from '../assets/images/sciolisis2.webp';
import scolisis3 from '../assets/images/sciolisis3.webp';
import scolisis4 from '../assets/images/sciolisis4.webp';
import OtherServices from "../Components/OtherServices";

function Scoliosis() {
    return (
        <>
            <Helmet>
                <title>Scoliosis | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Scoliosis" />
            <ContentSection
                title="Scoliosis Treatment in Cave Creek, AZ
"
                text={
                    <>
                        Because individuals of any age can have scoliosis, it’s important to find a chiropractor near you who is trained and experienced in treating scoliosis in Cave Creek, AZ such as Dr. Lind who uses a variety of techniques during treatment. Additionally, Dr. Lind is skilled in adjusting techniques including Gonstead, Thompson drop table, flexion/distraction, and the use of instrument adjusting to help with both acute and chronic conditions without the need for invasive surgery.





                    </>
                }
                image={scolisis1}
            />
            <ContentSection
                title="Symptoms and Causes of Scoliosis"
                text={
                    <>
                        The most common visual signs of scoliosis include uneven shoulder alignment, a shoulder blade that appears more prominent than the other, an uneven waistline, or one hip that appears to be slightly higher than the other.

                        <br /><br />
                        What’s most surprising to patients seeking treatment is that there is no pain associated with the onset of the condition. However, identifying the visual indicators in scoliosis and seeking scoliosis treatment near you is one of the best ways to prevent the condition from worsening to the point that it does become painful.





                        <br /><br />
                        The cause of scoliosis is not known, but it is widely considered to be a disorder that can run in families, result from neuromuscular conditions, and more.





                    </>
                }
                image={scolisis2}
                reverse={true}
            />
            <ContentSection
                title="What if Scoliosis is Left Untreated?"
                text={
                    <>
                        When the condition is left untreated, it can result in long-term pain in the patient’s back, neck, shoulder, and buttocks due to the curvature of the spine and the compromise that’s being made in the patient’s natural stride and resting position.







                        <br /><br />
                When you visit our chiropractor in Cave Creek, AZ, for scoliosis treatment near you, a physical examination, an Adams Position Test, and an x-ray can be used to identify the presence of the condition. Once identified, chiropractic scoliosis treatment will include adjustments to correct the position of the spine and help reduce and manage pain.








                    </>
                }
                image={scolisis3}
            />
            <ContentSection
                title="Contact Us Today for Scoliosis Treatment Near You"
                text={
                    <>
               Whether you’re seeking chiropractic care for scoliosis treatment or any of the other wide range of treatments we provide at Tatum Chiropractic and Wellness, we invite you to make an appointment today to experience the top-rated holistic care from our chiropractor near you.
                    </>
                }
                image={scolisis4}
                reverse={true}
            />

            <OtherServices />

        </>
    );
}

export default Scoliosis;