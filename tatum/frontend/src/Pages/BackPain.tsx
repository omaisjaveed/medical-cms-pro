import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import backpain1 from '../assets/images/backpain1.webp';
import backpain2 from '../assets/images/backpain2.webp';
import backpain3 from '../assets/images/backpain3.webp';
import backpain4 from '../assets/images/backpain4.webp';
import backpain5 from '../assets/images/backpain5.webp';
import backpain6 from '../assets/images/backpain6.webp';
import backpain7 from '../assets/images/backpain7.webp';
import OtherServices from "../Components/OtherServices";

function BackPain() {
    return (
        <>
            <Helmet>
                <title>Back Pain | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Back Pain" />
            <ContentSection
                title="Chiropractic Care in Cave Creek, AZhiropractic & Wellness"
                text="If you are living with chronic back pain, then chiropractic care in Cave Creek might be a good treatment option. Almost everyone will experience some form of back pain, ranging from slightly irritating to completely crippling, in their lifetime. Whatever the degree of pain you are experiencing and whether it is acute or has become chronic, at the very least, you would probably rather live without it. In the most extreme cases, it can be difficult to go on living with it. This article aims to help you to understand what causes lower back pain, and how chiropractic treatment can help you achieve lasting back health so that you can go on enjoying those walks in the park."
                image={backpain1}
            />
            <ContentSection
                title="Back Pain In Cave Creek"
                text="The back is a broad term that covers a large area of the body. It is made up of many tendons, ligaments, discs, muscles, and bones. Without a solid understanding of these different parts, it can be complicated to locate and address the source of the pain. The following explains some of the most common issues and their identifying features. It also explains how chiropractic medicine can help to resolve them. This is a general guideline to help you in your quest for effective treatment, but we highly recommend that you seek a professional opinion to properly diagnose these issues."
                image={backpain2}
                reverse={true}
            />
            <ContentSection
                title="Disc Bulges And Herniations"
                text={
                    <>
                        Disc bulges and herniations are conditions in which the outer edges of the discs, located between the vertebrae, are damaged. This causes the jelly-like center to bulge or become pushed out. This is a surprisingly common issue, and it is often, but not always, very painful. Many people who have this condition feel nothing at all. The quality and intensity of it, for those who experience pain, depends on the type and position of the herniation. If the damaged disc is irritating, a surrounding nerve, shooting, or stabbing pain along with weakness in the legs is often severe.

                        <br /><br />
                        It is important that this issue is properly identified and promptly treated to avoid further damage. A chiropractor in Cave Creek will thoroughly assess your back to determine the extent of the issue and the appropriate treatment to prevent worsening of the herniation, and provide relief from the associated pain.


                    </>
                }
                image={backpain3}
            />
            <ContentSection
                title="Subluxations"
                text="Subluxation is a medical term describing a misalignment in the vertebral column. There are a wide variety of causes, including physical stress, trauma, and toxins. Subluxations are often quite painful and can disrupt normal movement. Subluxations are one of the most commonly overlooked contributors to back pain. Chiropractors are trained to identify and correct this issue using non-invasive adjustment techniques."
                image={backpain4}
                reverse={true}
            />
            <ContentSection
                title="Muscular Sprains And Tendon Or Ligament Strains"
                text="Strains and sprains most typically occur when we engage in tasks that our body is not accustomed to, or when we are involved in an accident. Lifting while twisting or stretching past one’s limits are common causes to strains and sprains of the back. These can be extremely painful and are often accompanied by swelling and bruising of the surrounding area. Strains and sprains in the back tend to involve changes to the alignment of the spine and typically respond well to chiropractic care."
                image={backpain5}
            />
            <ContentSection
                title="Stress And Back Pain"
                text="Chronic stress wreaks havoc on the body and can eventually lead to hyper-tension and chronic back pain. The back pain is a result of tension and muscle spasms that occur when stress hormones are released. The tension will often accumulate in what is referred to as trigger points. These trigger points can be extremely painful and need professional attention to resolve. Chiropractors have the knowledge and tools to relieve stress from trigger points and to deal with underlying nervous system imbalances that may be keeping your body locked in patterns of stress and pain."
                image={backpain6}
                reverse={true}
            />
            <ContentSection
                title="Other Issues That Cause Back Pain"
                text={
                    <>
                        Conditions such as obesity, arthritis, kidney stones, and urinary tract infections have been shown to cause symptoms of lower back pain. These are all serious issues that need to be identified and treated immediately to avoid long-term health issues. Cave Creek chiropractic doctors are trained to identify these issues and support you in getting the appropriate treatment. Many of these issues can have their source in spinal misalignments and respond well to chiropractic adjustments.

                        <br /><br />
                        If you have questions about how our team at Tatum Chiropractic and Wellness can help you, please schedule a consultation today.
                    </>
                }
                image={backpain7}
            />

            <OtherServices />

        </>
    );
}

export default BackPain;