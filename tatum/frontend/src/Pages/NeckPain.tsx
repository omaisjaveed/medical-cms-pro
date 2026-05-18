import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import nackpain1 from '../assets/images/neckpain1.webp';
import nackpain2 from '../assets/images/neckpain2.webp';
import nackpain3 from '../assets/images/neckpain3.webp';
import nackpain4 from '../assets/images/neckpain4.webp';
import OtherServices from "../Components/OtherServices";

function NeckPain() {
    return (
        <>
            <Helmet>
                <title>Neck Pain | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Neck Pain" />
            <ContentSection
                title="Neck Pain Treatment in Cave Creek, AZ"
                text={
                    <>
                        You know the old saying, “It’s a pain in the neck”? Well, when you live with neck pain long enough, you know its important to find the best chiropractor in Cave Creek. Neck pain can make even the simplest of movements involving the neck, head, arms, shoulders, and back excruciatingly difficult. It can lead to headaches and difficulty using your body. Immobility resulting from neck pain can cause the muscles to become weak and to degenerate over time.

                        <br /><br />Understanding the root of your neck pain is a necessary step towards acquiring the treatment that will be effective in both short and long-term recovery. The following article looks at the causes of neck pain and explains how Cave Creek chiropractic care can be a useful alternative to conventional treatments.
                    </>
                }
                image={nackpain1}
            />
            <ContentSection
                title="Neck Pain Treatment In Cave Creek"
                text={
                    <>
                        Although the neck is a relatively small area of the body, it is comprised of some complicated structures which do the important job of holding your head up. The small size of the vertebrae of the neck allows for a lot of mobility, but can also make the neck more vulnerable to injury and pain. Some of the causes of neck pain include:
                        <ul>
                            <li>Trauma, such as whiplash</li>
                            <li>Sleeping position</li>
                            <li>Poor posture</li>
                            <li>Repetitive stress</li>
                            <li>Abnormalities in the bone structure</li>
                            <li>Joint issues</li>
                            <li>Muscle strains and pulls</li>
                        </ul>
                    </>
                }
                image={nackpain2}
                reverse={true}
            />
            <ContentSection
                text={
                    <>
                        Most of these issues are either caused by or impact, the alignment of the spine. When muscles in the neck go into spasm, the spine gets pulled out of alignment. When the spine is misaligned, the nerves become irritated and cause further tension and other systemic problems. Because every nerve in the body has its root in the spinal column, issues that have their source at the neck can have a major impact throughout every other system.

                        <br /><br />
                        Many people let spinal problems go uncorrected in Cave Creek. They hope that if they wait long enough, the pain will simply go away. In some cases, it will go away, but the misalignment that caused the problem is usually still there. Over time, that area can become aggravated, and the pain can return. If the problem is not corrected, it can become much more serious. Some patients let things go to the point where surgery may be the only option.

                    </>
                }
                image={nackpain3}
            />
            <ContentSection
                title="Conventional Vs. Holistic Treatments"
                text={
                    <>
                        Most commonly, people try to deal with their neck pain using prescription or over-the-counter medications. This may help to relieve the symptoms in the short-term, but not only are patients dealing with side effects, but the underlying issue also goes unaddressed. Massage therapy has become more popular over the years, and this can help to relieve some muscle tightness. If the issue is in the bones or joints, the problem will remain.
                        <br /><br />
                        Chiropractic treatment is a holistic practice that addresses the structural cause that leads to the majority of neck pain. Following a thorough chiropractic assessment aimed at ruling out other issues and finding the exact source of the problem, a personalized recovery plan is developed. Gentle adjustments to the spine can bring instant relief and restore long term health to the neck and the entire body. Call our team at Tatum Chiropractic and Wellness today to set up a consultation and bring an end to the pain in your neck.
                    </>
                }
                image={nackpain4}
                reverse={true}
            />

            <OtherServices />

        </>
    );
}

export default NeckPain;