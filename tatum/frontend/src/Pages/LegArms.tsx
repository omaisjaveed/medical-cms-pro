import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import leg1 from '../assets/images/leg1.webp';
import leg2 from '../assets/images/leg2.webp';
import OtherServices from "../Components/OtherServices";

function LegArm() {
    return (
        <>
            <Helmet>
                <title>Arm and Leg Pain | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Arm and Leg Pain" />
            <ContentSection
                title="Arm and Leg Pain Treatment in Cave Creek, AZ"
                text={
                    <>
                        The shoulder and hip joints are two of the most mobile and frequently used joints in the body. They are also a frequent site of injury and pain for many people we see in our Cave Creek chiropractic clinic. From overuse to sports injuries, the causes are many, and the results range from slight discomfort to complete immobilization. The following article from Tatum Chiropractic and Wellness gives information on some of the most common issues that lead to shoulder and leg pain, as well as a description of how chiropractic adjustments can help to reverse it.


                    </>
                }
                image={leg1}
            />

            <ContentSection
                title="Treatment For Arm And Leg Pain In Cave Creek"
                text={
                    <>
                        The actual cause of arm or leg pain can be difficult to self-diagnose. If you have had an obvious injury, such as stressing a joint through a repetitive pattern at work, dislocating a shoulder playing sports, or pinching a nerve by falling asleep in an awkward position, the source of your immediate pain may be obvious. However, when pain in the arms or legs develops slowly over time without the occurrence of an obvious injury or accident, or when the pain from an injury has become chronic, and the source becomes perplexing, you may be in need of a more thorough assessment to determine the source.


                        <br /><br />
                        There are a number of different possible sources for the pain, including bursitis, arthritis, and tendinitis, but misalignments (subluxations) of the vertebrae in the neck and lower back are responsible for the vast majority of chronic arm and leg pain. If the spaces where the nerves leave the spine become narrowed because the vertebrae or discs are out of position, the nerve can become irritated, and often produces pain down its entire path. Many patients are surprised when they see that the nerves travel from the spine all the way to the ends of their fingertips and toes.

                        <br /><br />
                        As a result, injuries to the vertebrae in the spine can create the sensation of pain anywhere along the entire length of the arms and legs. The pain patterns associated with sciatica, which run from the hip all the way to the foot, are a good example of how this works.


                    </>
                }
                image={leg2}
                reverse={true}
            />
            <ContentSection
                title="Chiropractic Treatment For Arm And Leg Pain"
                text={
                    <>
                        Due to the complexity of the joints and the vast number of possible causes of your leg or arm pain, it is important to have a professional evaluation to determine the source. Using a combination of a thorough review of your medical history, a physical examination, and advanced imaging techniques, a chiropractor can get a comprehensive picture that will lead to the root cause of your pain.
                        <br /><br />
                        Using non-invasive and carefully applied adjustments, chiropractors assist the body in gently re-positioning the vertebrae, which can provide both instant and long term relief. If you are experiencing arm or leg pain, don’t wait for it to become unbearable, schedule a consultation with our team at Tatum Chiropractic and Wellness today.
                    </>
                }
                image={leg1}
            />


            <OtherServices />

        </>
    );
}

export default LegArm;