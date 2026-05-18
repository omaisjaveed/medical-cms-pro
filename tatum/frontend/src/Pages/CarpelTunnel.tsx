import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import carpel1 from '../assets/images/carpel1.webp';
import carpel2 from '../assets/images/carpel2.webp';
import carpel3 from '../assets/images/carpel3.webp';
import OtherServices from "../Components/OtherServices";

function CarpelTunnel() {
    return (
        <>
            <Helmet>
                <title>Carpal Tunnel | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Carpal Tunnel" />
            <ContentSection
                title="Carpal Tunnel Treatment in Cave Creek, AZ"
                text={
                    <>
                        Are you looking for non-surgical carpal tunnel treatment near you to provide relief from the numbness, tingling, and weakness you may be experiencing in your hand(s) and/or arm(s)? If so, you’ll be happy to learn that our chiropractor in Cave Creek, AZ has the training, experience, and equipment required to provide relief from your symptoms and restore your wrist and hand function. Let’s take a look at a few factors that could be contributing to your condition, as well as some treatment options you’ll find at Tatum Chiropractic and Wellness.
                    </>
                }
                image={carpel1}
            />

            <ContentSection
                title="Factors that Contribute to Carpel Tunnel Pain and Discomfort"
                text={
                    <>
                        There may be an underlying condition such as a stress fracture that is causing you to experience pain when performing repetitive motion with your wrists and hands, which our chiropractor will be able to detect through manipulation and x-ray, but most pain is caused when the median nerve in your wrist is compressed by swelling – either from overuse or an underlying condition. In decades past, the first course of treatment was to undergo surgery to correct the underlying condition, but decompression surgeries, physiotherapy, and prescription medicines can also be ineffective.
                        <br /><br />Instead, our chiropractor will provide treatment alternatives through massage, manipulation, and other modalities as a front-line approach before recommending surgery. And in case you’re wondering about the effectiveness of carpal tunnel treatment through chiropractic care, you might be surprised to read that up to 95 percent of all carpal tunnel cases can be successfully treated without surgery! That makes perfect sense when remembering that pain associated with carpal tunnel syndrome is related to nerve interference, so just as chiropractic care is successful in treating sciatica and disc disorders, so too is it effective in treating carpal tunnel syndrome.

                    </>
                }
                image={carpel2}
                reverse={true}
            />
            <ContentSection
                title="Take Control of Your Pain Today"
                text={
                    <>
                       Instead of suffering through your work schedule in pain even one more day, or putting off treatment because you believe the only protocol is surgery, we invite you to make an appointment now using our convenient online booking tool to schedule an appointment and receive a plan for carpal tunnel treatment in Cave Creek, AZ from our top-tier chiropractor near you.
                    </>
                }
                image={carpel3}
            />

            <OtherServices />

        </>
    );
}

export default CarpelTunnel;