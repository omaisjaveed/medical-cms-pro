import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import pregnancy1 from '../assets/images/pregnancy1.webp';
import pregnancy2 from '../assets/images/pregnancy2.webp';
import pregnancy3 from '../assets/images/pregnancy3.webp';
import OtherServices from "../Components/OtherServices";

function PregnancyCare() {
    return (
        <>
            <Helmet>
                <title>Pregnancy Chiropractic Care| Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Pregnancy Chiropractic Care" />
            <ContentSection
                title="Pregnancy Chiropractic Care in Cave Creek, AZ"
                text={
                    <>
                        If you’re reading this and pregnant, we first want to say congratulations! What an amazing time for you! Soon there will be so many changes in your life, and we want you to know that our chiropractor near you is here to help ensure that your pregnancy is a time of delight and joy as your body adjusts to its changes.
                        <br /><br />
                        Did you know that the added baby weight – even beginning with the first few pounds – can add additional stress on your back, spine, and pelvis as your center of gravity begins to shift? Also, the effect of relaxin (a hormone that your body uses in preparation for childbirth) can cause instability in your joints. Both of those conditions, as well as many others that you’ll experience throughout your pregnancy, will benefit from massage and other pregnancy chiropractic care near you.
                        <br /><br />
                        As one of the premier prenatal chiropractors in Cave Creek, AZ, a visit to our office for lower back pain, sciatica, leg cramps, and even pregnancy-related constipation can help make your pregnancy a time of joy and fulfillment. Keep reading to learn about even more benefits from pregnancy chiropractic care at Tatum Chiropractic and Wellness.
                    </>
                }
                image={pregnancy1}
            />

            <ContentSection
                title="Benefits of Pregnancy Chiropractic Care Near You"
                text={
                    <>
                        Our chiropractor in Cave Creek, AZ, is a specialist in providing holistic whole-body care to every patient in our office, but a few of the benefits that can be attained especially during pregnancy include:
                        <br /><br />
                        <ul>
                            <li>Quicker labor and delivery (often with less pain than if not receiving chiropractic care)</li>
                            <li>Lessened need for medical interventions during childbirth such as episiotomies</li>
                            <li>Reduction in aches and pains including pubic symphysis pain</li>
                            <li>Achieve a more restful night’s sleep</li>
                            <li>Decreased stress and increased energy</li>
                            <li>And more!</li>
                        </ul>
                        And because pregnancy chiropractic care is completely natural, mothers-to-be will never have to worry about side effects!

                    </>
                }
                image={pregnancy2}
                reverse={true}
            />
            <ContentSection
                title="Prenatal Chiropractic Care in Cave Creek, AZ"
                text={
                    <>
                        For safe, effective, and proven holistic care throughout your pregnancy, including postpartum, make an appointment today for a consultation for pregnancy chiropractic care near you using our convenient online booking tool. Whether you’re seeking relief from aching ankles and feet or help to get a better night’s sleep so you can have a stress-free pregnancy, we have the experience and skill to keep this time in your life amazing!
                    </>
                }
                image={pregnancy3}
            />

            <OtherServices />

        </>
    );
}

export default PregnancyCare;