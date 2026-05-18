import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import wellness1 from '../assets/images/wellness1.webp';
import wellness2 from '../assets/images/wellness2.webp';
import wellness3 from '../assets/images/wellness3.webp';
import wellness4 from '../assets/images/wellness4.webp';
import OtherServices from "../Components/OtherServices";

function WellnessCare() {
    return (
        <>
            <Helmet>
                <title>Wellness Care| Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Wellness Care" />
            <ContentSection
                title="Wellness Care in Cave Creek, AZ"
                text={
                    <>
                     Just because you don’t feel sick, does not mean you feel as great as you could. Far too many people wait until they are sick to find a chiropractic clinic in Cave Creek. It is common in our culture to accept a slow decline in health as we age, but it is also unnecessary. We now have information and the advances in the field of health and wellness to live a life of optimal health which, contrary to popular belief, can actually get better as we grow older. This article will walk you through some of the common beliefs about health and discusses how chiropractic medicine can be an important part of your preventative, wellness care plan.
                    </>
                }
                image={wellness1}
            />

            <ContentSection
                title="How Lifestyle Affects Overall Wellness In Cave Creek"
                text={
                    <>
                      The decisions we make and the actions we take in each moment of our day affect our bodies and can slowly produce problems that may not show symptoms. What we eat, how we sit, the work that we do with our bodies, and even the way we emotionally react to a situation, can have long-term impacts on our wellness. If you spend your days sitting at a desk, the way you hold your head or place your arms can have a major impact, not only on your neck and shoulders, but also on your whole body.


                        <br /><br />
                       This is because the bundle of nerves that sends messages to every other part of our body, originates in our spinal column. When vertebrae become misaligned there are dozens of possible impacts upon our health. This also goes for how we hold emotions in the body. If we are chronically tensing our shoulders due to stress or anxiety, this can once again impact the spine and the rest of the body. As you can see, even if we don’t feel sick, we may be in need of a little extra care to prevent daily activities from becoming more severe problems.


                       

                    </>
                }
                image={wellness2}
                reverse={true}
            />
            <ContentSection
                title="Why We Need Wellness Care"
                text={
                    <>
                      Health can be defined as the body functioning properly rather than just feeling good. You may not feel sick today, but if your nervous system is being impeded from sending messages to other organs and systems in the body, things may not be working as well as they could be. Through a regular wellness care program that works to restore spinal health and mobility, people often find that they have more energy and do not get sick as often. When the nervous system is functioning properly, the benefits are endless. Digestion, blood flow, lung capacity, heartbeat, skin tone, and overall mobility are just some of the body’s functions that are positively impacted by a spine that is properly aligned.


                    </>
                }
                image={wellness3}
            />

            <ContentSection
                title="Chiropractic Treatment As Part Of A Wellness Care Plan"
                text={
                    <>
                     Chiropractic treatments work to keep the integrity of the nervous system intact and are an excellent choice as a part of a wellness care plan. Regular, gentle adjustments can ensure that the daily impacts of your life are not wearing your health down over time. By performing a thorough evaluation of your health history and current physical state, a chiropractor can help you detect problems before they develop into a more serious issue, keeping you at peak function and feeling great. Call to set up a consultation with our team at Tatum Chiropractic and Wellness and start on the path of chiropractic wellness care today.
                    </>
                }
                image={wellness4}
                reverse={true}
            />

            <OtherServices />

        </>
    );
}

export default WellnessCare;