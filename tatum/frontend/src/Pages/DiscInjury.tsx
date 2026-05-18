import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import disc1 from '../assets/images/disc1.webp';
import disc2 from '../assets/images/disc2.webp';
import disc3 from '../assets/images/disc3.webp';
import disc4 from '../assets/images/disc4.webp';
import OtherServices from "../Components/OtherServices";

function DiscInjury() {
    return (
        <>
            <Helmet>
                <title>Disc Injury | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Disc Injury" />
            <ContentSection
                title="Disc Injury Treatment in Cave Creek, AZ"
                text={
                    <>
                        Are you in North Scottsdale, and you’re looking for disc injury treatment near you from a top-rated wellness and chiropractic clinic in Cave Creek, AZ? If so, you’ll be happy to read that whether your pain is mild or severe, Dr. Lind and his team have the experience, skills, and equipment that’s required to provide optimum disc injury treatment near you.
                    </>
                }
                image={disc1}
            />
            <ContentSection
                title="Not Sure if You Have a Disc Injury?"
                text={
                    <>
                        Some of the symptoms you may notice that signal a disc injury include back pain, neck pain, weakness in your legs or feet, pain and/or numbness in your legs and feet, as well as the loss of bladder or bowel control.
                        <br /><br />
                        Our chiropractor in Cave Creek, AZ, will be able to diagnose whether you’re experiencing a disc injury through a series of techniques, including physical palpation, movement tests, muscle strength tests, and other tests that utilize state-of-the-art equipment.
                        <br /><br />
                        The key to relief from your disc injury is to seek treatment promptly so the condition can be stabilized and relief from pain administered. At Tatum Chiropractic and Wellness, your disc injury assessment will involve a thorough understanding of any event that may have led to the injury (such as a car accident or a fall at work or school), your medical history, x-rays if needed, and a physical examination to determine the extent of the disc injury and the appropriate treatment protocol to provide pain relief and recovery.

                        <br /><br />
                        In some cases, patients will experience relief from their symptoms after one visit; however, if it’s determined that your disc injury treatment requires a series of appointments to achieve complete recovery, our approach to your treatment will be tailored to your exact area of need and recovery goals.
                    </>
                }
                image={disc2}
                reverse={true}
            />
            <ContentSection
                title="Our Goal for Your Disc Injury Treatment"
                text={
                    <>
                        As one of the highest-rated chiropractic clinics near you, the goal of our chiropractor in Cave Creek, AZ, is to help you reclaim a life that’s pain-free and fully mobile. Whether your disc disorder is diagnosed as a protruding disc, a herniated disc, or a disc extrusion, the chiropractic care you’ll receive from our team is always tailored to your specific area of need using the gentlest techniques available in modern chiropractic care.
                    </>
                }
                image={disc3}
            />
            <ContentSection
                title="Make an Appointment Today for Disc Injury Treatment Near You"
                text={
                    <>
                      Whether you’re seeking chiropractic care for disc injury treatment, general back or neck pain, or any of the other wide range of treatments we provide at Tatum Chiropractic and Wellness, we invite you to make an appointment today to experience the top-rated holistic care provided by our chiropractor near you.
                    </>
                }
                image={disc4}
                reverse={true}
            />

            <OtherServices />

        </>
    );
}

export default DiscInjury;