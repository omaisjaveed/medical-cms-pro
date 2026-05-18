import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import scartica1 from '../assets/images/scartica1.webp';
import scartica2 from '../assets/images/scartica2.webp';
import scartica3 from '../assets/images/scartica3.webp';
import OtherServices from "../Components/OtherServices";

function Sciatica () {
    return (
        <>
            <Helmet>
                <title>Sciatica | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Sciatica" />
            <ContentSection
                title="Sciatica Treatment in Cave Creek, AZ"
                text={
                    <>
                     If you are experiencing pain that radiates from the back or buttocks all the way down the legs, you may have a common condition called sciatica. Many people look for a <strong>Cave Creek chiropractor</strong>  so that they don’t have to suffer from the pain of sciatica. An untreated sciatic condition can continue to worsen and make the daily tasks of living go from difficult to impossible. This article is aimed at helping you to understand sciatica and explains how chiropractic treatment can help you to overcome it.



                    </>
                }
                image={scartica1}
            />
            <ContentSection
                title="Sciatic Treatment In Cave Creek"
                text={
                    <>
                       Sciatica, which is also known as sciatic neuralgia, is a condition that causes pain in the lower back, down the back of the leg, and into the foot. It can make sitting and standing for long periods of time difficult and can lead to weakness, tingling, and numbness in the leg and foot. It will often come and go throughout a person’s lifetime, causing periods of varying degrees of pain and discomfort. If left unchecked, sciatic pain will generally grow worse, and the nerve can become permanently injured.



                        <br /><br />
                      The reason why the pain travels so far, seems to radiate up and down the legs and back, is because it is caused by the compression of the sciatic nerve, the longest nerve in the body. This nerve originates in the lumbar spine and extends into the buttocks before traveling down the leg to the ankle and foot. When the vertebrae in the low back are compressed, the roots of the sciatic nerve can become pinched and irritated, which is what causes the pain and injury.



                    </>
                }
                image={scartica2}
                reverse={true}
            />
            <ContentSection
                title="Chiropractic Care For Sciatica"
                text={
                    <>
                     Chiropractors in Cave Creek are highly trained to zero in on the source of sciatica and to work with the patient in determining the most suitable approach to treatment. After a thorough assessment of the individual’s unique issue, gentle adjustments are made that will allow the body to recover its natural alignment.





                        <br /><br />
                       Some people respond very quickly, while others take more time to recover. It really depends on the condition of the disc or the joints that the chiropractor has to correct. In most cases, the longer the issue persists, the longer it will take to achieve correction. The great news is that it typically takes less time to fix an issue like this than it took to create it. Once the position of the spine and discs are improved, patients often report improvements to their overall health. If you are experiencing symptoms of sciatica, call our team at Tatum Chiropractic and Wellness today.






                    </>
                }
                image={scartica3}
            />

            <OtherServices />

        </>
    );
}

export default Sciatica;