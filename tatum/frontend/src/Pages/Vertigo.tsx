import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import vertigo1 from '../assets/images/vertigo1.webp';
import vertigo2 from '../assets/images/vertigo2.webp';
import vertigo3 from '../assets/images/vertigo3.webp';
import vertigo4 from '../assets/images/vertigo4.webp';
import vertigo5 from '../assets/images/vertigo5.webp';
import OtherServices from "../Components/OtherServices";

function Vertigo() {
    return (
        <>
            <Helmet>
                <title>Vertigo | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Vertigo" />
            <ContentSection
                title="Vertigo Treatment in Cave Creek, AZ"
                text={
                    <>
                        Vertigo can literally turn your life upside down. Many people with vertigo seek out a <strong>Cave Creek chiropractor</strong> and find a great deal of improvement in their condition. It is a condition marked by dizziness, and living with it makes even the simplest functions of day to day living a struggle. Many people find it difficult to get information about what exactly is causing their vertigo, and therefore, what the best available treatments are. This article will hopefully help you to understand the common causes of Vertigo as well as explain how chiropractic treatment can help you to find relief.



                    </>
                }
                image={vertigo1}
            />
            <ContentSection
                title="Vertigo Treatment In Cave Creek"
                text={
                    <>
                        Before we get into talking about the causes of vertigo, let’s go over some of the most common symptoms to help you determine if this is what you are dealing with. Two different kinds of dizziness are often assumed to be Vertigo.



                        <br /><br />
                        Sometimes people say that they feel dizzy when they actually mean that they feel like they are going to pass out or faint.

                        <br /><br />
                        Others say they feel dizzy when they perceive objects around them spinning and moving. Vertigo is a medical term that is used to describe the second situation. It is important to differentiate between the two sensations because each has a different set of causes and appropriate treatments.



                    </>
                }
                image={vertigo2}
                reverse={true}
            />
            <ContentSection
                text={
                    <>
                        Vertigo can range from a small nuisance to an indication of a severe underlying condition. Contrary to popular belief, dizziness is not the only symptom associated with this disorder. Some of the symptoms of vertigo that commonly accompany dizziness are:

                        <ul>
                            <li>Blurry vision or difficulty focusing</li>
                            <li>Problems hearing, especially in one ear</li>
                            <li>Ringing ears</li>
                            <li>Trouble maintaining balance</li>
                            <li>Feeling fatigued or tired all the time</li>
                            <li>Double vision</li>
                        </ul>



                        <br /><br />
                        It is important that this issue is properly identified and promptly treated to avoid further damage. A chiropractor in Cave Creek will thoroughly assess your back to determine the extent of the issue and the appropriate treatment to prevent worsening of the herniation, and provide relief from the associated pain.


                    </>
                }
                image={vertigo3}
            />
            <ContentSection
                title="Causes Of Vertigo"
                text={
                    <>
                        As we already mentioned, there are a variety of different causes of vertigo. At times it can be caused by a severe underlying issue; therefore, it is of vital importance to be examined by a medical professional if you are experiencing symptoms. The following is a list of some of the most common causes of vertigo:



                        <ul>
                            <li>Severe headaches such as migraines or tension headaches</li>
                            <li>Chronic ear aches or damage to the inner ear</li>
                            <li>A lack of blood flow to the brain</li>
                            <li>Car accidents resulting in damage to the joints and ligaments throughout the spine</li>
                            <li>Misalignments or subluxations of the vertebrae in the neck</li>
                        </ul>



                        <br /><br />
                        As you can see, vertigo commonly starts with issues involving the head, inner ear, and spine. These areas play an important role in how the body orients itself and maintains balance. Vertigo commonly results from a disruption in the signals sent from the nerves of the spine to the brain. When signals that would normally keep us balanced become distorted and scrambled symptoms of dizziness can occur.



                    </>
                }
                image={vertigo4}
                reverse={true}
            />
            <ContentSection
                title="Chiropractic Care For Vertigo"
                text={
                    <>
                        Chiropractic treatment is a gentle and safe approach to overcoming many of the causes of Vertigo. A chiropractic treatment begins with a thorough evaluation that will determine the exact cause of your vertigo and the most appropriate treatment methods. Many people find that the adjustments they receive from their chiropractors are all that it takes to stabilize the nervous system function and completely cure their vertigo. Call today to consult with a chiropractor in Cave Creek today on how you can find relief from your vertigo.
                    </>
                }
                image={vertigo5}
            />

            <OtherServices />

        </>
    );
}

export default Vertigo;