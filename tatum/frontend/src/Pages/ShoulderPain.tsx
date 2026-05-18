import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import Shoulder1 from '../assets/images/Shoulder1.webp';
import Shoulder2 from '../assets/images/Shoulder2.webp';
import Shoulder3 from '../assets/images/Shoulder3.webp';
import Shoulder4 from '../assets/images/Shoulder4.webp';
import OtherServices from "../Components/OtherServices";

function ShoulderPain() {
    return (
        <>
            <Helmet>
                <title>Shoulder Pain| Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Shoulder Pain" />
            <ContentSection
                title="Shoulder Pain Treatment in Cave Creek, AZ"
                text={
                    <>
                        We don’t think much about our shoulders until they start to give us pain. Most people immediately start looking for the <strong>best chiropractic care in Cave Creek</strong>  because they are always using their shoulders to lift and extend their arms, to carry, wave, and perform numerous other motions and tasks. The shoulder is the most mobile joint in the body, and as a result, it is subject to a wide range of injuries and conditions.
                        <br /><br />
                        Shoulder problems that go unchecked can lead to lifelong, debilitating issues. In order to properly treat the shoulder joint and achieve long-term relief, it is important to identify the cause of shoulder pain. This article explains some of the common causes of shoulder pain and how chiropractic care can return the shoulder to functional health.
                    </>
                }
                image={Shoulder1}
            />

            <ContentSection
                title="Shoulder Pain Treatment In Cave Creek"
                text={
                    <>
                        The causes of shoulder pain are seemingly endless, but let’s go over some of the more common causes for pain in the shoulder. Shoulder pain may be the result of conditions, such as:

                        <br /><br />
                        <ul>
                            <li>Neck and upper back tightness</li>
                            <li>Spinal misalignment</li>
                            <li>Arthritis</li>
                            <li>Abnormal patterns of movement</li>
                            <li>Athletic injuries and automobile accidents</li>
                        </ul>
                        <br /><br />While a few of the items on this list may indicate localized swelling in the shoulder joint, more of them point to the spine as the probable source of pain. The nerves that control the shoulder originate in the spine. If the vertebrae around the neck and upper back are compressed or injured, the nerves that go to the shoulder will be irritated and cause pain. Even a minor spinal misalignment can interrupt communication between the nerves and the shoulder, and a cascade of problems can begin. So, what appears as shoulder pain may actually be referred pain from the spinal column.
                    </>
                }
                image={Shoulder2}
                reverse={true}
            />
            <ContentSection
                title="Symptoms Of Shoulder Injury"
                text={
                    <>
                        Due to the wide range of causative factors, shoulder pain, and abnormal motion in the joint may develop gradually or come on suddenly. Symptoms of a shoulder injury are occasionally very subtle, but even these can develop into major issues. Since the shoulder joint is used in the vast majority of activities that we engage in daily, all symptoms involving the shoulder should be monitored carefully and treated promptly to avoid the progression of the problem. Symptoms indicating the need for an immediate evaluation of the shoulder complex include:

                        <br /><br />
                        <ul>
                            <li>Shoulder pain that lasts for more than a week</li>
                            <li>Shoulder pain that goes away and then returns frequently</li>
                            <li>Difficulty raising your arm above your head</li>
                            <li>Trouble or pain when carrying objects</li>
                            <li>Pain in the shoulder joint that becomes more pronounced in the evening</li>
                            <li>Any visual signs of damage to the joint such as bruising or swelling</li>
                            <li>Unusual snapping or clicking sensations in the joint during movement</li>
                        </ul>
                    </>
                }
                image={Shoulder3}
            />
            <ContentSection
                title="Chiropractic Care For Shoulder Pain"
                text={
                    <>
                        Chiropractic care is a gentle and non-invasive alternative to medications and surgeries that provides fast and effective results. Cave Creek chiropractors are trained to deal with issues in the spine and the shoulder complex that result in shoulder pain. In order to determine the cause of your shoulder pain, a chiropractic treatment begins with a thorough evaluation process, using the information provided from your medical history, and advanced imaging techniques. Once a correct diagnosis is achieved, it will then be used to develop an individualized treatment plan that will help ensure a fast recovery.
                        <br /><br />
                        Call our team at Tatum Chiropractic and Wellness today for help.
                    </>
                }
                image={Shoulder4}
                reverse={true}
            />

            <OtherServices />

        </>
    );
}

export default ShoulderPain;