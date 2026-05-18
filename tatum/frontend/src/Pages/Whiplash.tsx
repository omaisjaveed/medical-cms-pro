import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import whiplash1 from '../assets/images/whiplash1.webp';
import whiplash2 from '../assets/images/whiplash2.webp';
import whiplash3 from '../assets/images/whiplash3.webp';
import whiplash4 from '../assets/images/whiplash4.webp';
import whiplash5 from '../assets/images/whiplash5.webp';
import OtherServices from "../Components/OtherServices";

function Whiplash() {
    return (
        <>
            <Helmet>
                <title>Whiplash | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Whiplash" />
            <ContentSection
                title="Whiplash Treatment in Cave Creek, AZ"
                text={
                    <>
                        Many people will seek out <strong>chiropractic care in Cave Creek</strong>  after having an auto injury. A common auto injury, whiplash, occurs when the head and neck are whipped from back to front, similar to how a whip is cracked. The majority of car accidents are rear-ended collisions, with whiplash being a common result.
                        <br /><br />
                        Whiplash can also occur from other kinds of trauma, accidents, abuse, and falls.

                        <br /><br />
                        Many people in Cave Creek who have been involved in an accident don’t even realize they have received a whiplash injury until weeks or months later when the problem becomes persistent and leads to other issues. If your neck has been injured in an accident or other incident, this article will you to understand if you have a whiplash injury and how chiropractic care can help you to treat it.


                    </>
                }
                image={whiplash1}
            />

            <ContentSection
                title="Whiplash In Cave Creek"
                text={
                    <>
                        When the neck is whipped from back to front during a car accident, while playing contact sports such as football, or occasionally from an assault or other physical trauma, a number of things can happen to the spine and surrounding soft tissue. Whiplash describes the initial impact, but the results can include:
                        <ul>
                            <li>Disc bulges and herniation</li>
                            <li>Subluxations (misalignment of the vertebrae in the spine),</li>
                            <li>Injured bones in the spine,</li>
                            <li>Irritated and damaged nerves</li>
                            <li>Pulled ligaments and muscles in the neck</li>
                        </ul>
                    </>
                }
                image={whiplash2}
                reverse={true}
            />
            <ContentSection
                title="What Are The Symptoms Of Whiplash?"
                text={
                    <>
                        Whiplash injuries can range from mild to very severe. Injuries tend to be more significant when your headrest is positioned too low. If the impact was quite severe or the headrest was low, there is the possibility that bones are broken or tissue is damaged. It is highly recommended that you see a chiropractor and receive a thorough examination and x-rays. Even if the impact seemed mild, you might have whiplash if you are experiencing any of the following symptoms:

                        <ul>
                            <li>Neck pain</li>
                            <li>Shoulder, upper back, and arm pain</li>
                            <li>Headaches</li>
                            <li>Blurred vision</li>
                            <li>Pain when turning the head</li>
                            <li>Inability to move or turn the head fully</li>
                            <li>Dizziness</li>
                            <li>Tiredness</li>
                            <li>Numbness or tingling in the arms, hands, and fingers</li>
                            <li>Ringing in the ears</li>
                            <li>Difficulty sleeping</li>
                            <li>Depression</li>
                        </ul>
                    </>
                }
                image={whiplash3}
            />
            <ContentSection
                title="What Are The Symptoms Of Whiplash?"
                text={
                    <>
                        As you can see, there is a wide range of symptoms, and not all of them may be immediately traceable to whiplash. Even if you have been cleared by a doctor, your pain could still be related to whiplash, and you may need treatment to correct the problem. If you have recently been injured, it’s important to get your spine checked as soon as possible. The sooner that you start treating the issue, the less chance you have of it developing into a long-term problem.
                    </>
                }
                image={whiplash4}
                reverse={true}
            />
            <ContentSection
                title="Chiropractic Care For Car Accidents"
                text={
                    <>
                        Because the majority of whiplash incidents impact the spine and the surrounding nerves and tissues, chiropractic care is an excellent avenue for treatment. Chiropractic doctors are skilled in assessing the source of the pain associated with a whiplash injury and determining a plan for effective treatment. Chiropractic treatments are gentle and non-invasive. Through small adjustments, people find great relief from the pain associated with whiplash and are set on a road to full recovery. Call our team at Tatum Chiropractic and Wellness in North Scottsdale to discover how chiropractic care can help you recover from whiplash.


                    </>
                }
                image={whiplash5}
            />

            <OtherServices />

        </>
    );
}

export default Whiplash;