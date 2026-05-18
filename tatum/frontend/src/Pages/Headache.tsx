import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import headache1 from '../assets/images/headache1.webp';
import headache2 from '../assets/images/headache2.webp';
import headache3 from '../assets/images/headache3.webp';
import OtherServices from "../Components/OtherServices";

function Headache() {
    return (
        <>
            <Helmet>
                <title>Headache & Migraine | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Headache & Migraine" />
            <ContentSection
                title="Headache & Migraine Treatment in Cave Creek, AZ"
                text={
                    <>
                        Headaches are not fun, and migraines are another level of awful. Living with either of these issues can make you feel grumpy, and in the worst-case scenario, leave you unable to function. Medication may help in the short term, but when the problem is ongoing or re-occurring, pills are generally not enough. The source of your headaches and migraines is usually structural, and therefore proper treatment can help you overcome this debilitating issue. Headache relief at our <strong>Cave Creek chiropractic clinic</strong> may be the solution you are looking for.

                    </>
                }
                image={headache1}
            />
            <ContentSection
                title="Headaches And Migraines In Cave Creek"
                text={
                    <>
                        Whether you are dealing with a persistent ache in your head or the worst symptoms associated with migraines, including light and noise intolerance, nausea, vomiting, hallucinations, depression, and irritation, the cause may be a structural issue. When the spine moves out of position because of developmental issues, trauma, repetitive stress, and other incidents, it can put pressure on the surrounding nerves. When the nerves are compressed or irritated, they send a message to the muscles of the back, neck, and jaw to tighten.

                        <br /><br />
                        This tightness can lead directly to an acute headache or migraine. Over time the tightness can also pull your bones out of alignment leading to more persistent headaches and migraines. A headache or migraine can be a sign that there are deeper problems arising in your spinal column, and because every other system in your body is impacted by your spinal health, it is very important to deal with these issues when the signs begin to arise.

                    </>
                }
                image={headache2}
                reverse={true}
            />
            <ContentSection
                title="Chiropractic Treatment For Headaches And Migraines"
                text={
                    <>
                        Chiropractic care has a long history of successfully treating headaches and migraines. Chiropractors in Cave Creek have an extensive understanding of subtle issues occurring in the spine, which, due to its connection with the nervous system, is very often the source of pain. A chiropractic treatment starts with a thorough evaluation that will rule out other possible causes of your headache and examine your spine for issues of misalignment.



                        <br /><br />
                        The assessment will determine the exact type of treatment that is necessary for the specific issue at the root of the pain. Using gentle and non-invasive techniques, a chiropractor is able to achieve adjustments to the spine that, although they may seem subtle, can provide almost instant relief and restore your long-term health. Unlike medications that treat the problem on the surface level and provide only short-term relief, a chiropractic adjustment will address the cause of your headache or migraine and provide lasting results that will improve your quality of life.

                        <br /><br />
                        If you are struggling with migraines or headaches, call our team at Tatum Chiropractic and Wellness today for help.



                    </>
                }
                image={headache3}
            />

            <OtherServices />

        </>
    );
}

export default Headache;