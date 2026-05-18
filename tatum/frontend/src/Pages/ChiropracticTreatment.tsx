import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import tmj1 from '../assets/images/tmj1.webp';
import tmj2 from '../assets/images/tmj2.webp';
import tmj3 from '../assets/images/tmj3.webp';
import tmj4 from '../assets/images/tmj4.webp';
import tmj5 from '../assets/images/tmj5.webp';
import tmj6 from '../assets/images/tmj6.webp';
import OtherServices from "../Components/OtherServices";

function ChiropracticTreatment() {
    return (
        <>
            <Helmet>
                <title>TMJ and Chiropractic treatment | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="TMJ and Chiropractic treatment" />
            <ContentSection
                title="Chiropractic Care for TMJ Patients in Cave Creek, AZ"
                text={
                    <>
                        According to the TMJ Association, an estimated 12 percent of Americans are impacted by TMJ disorder at any time. The condition contributes to pain and discomfort centered within the jaw and can bring about other issues like chronic headaches.
                        <br /><br />
                        When you feel that dental treatment isn’t getting you anywhere to relieve your distress, or if surgery scares you, you can consider a TMJ chiropractor near you. At Tatum Chiropractic and Wellness, we provide all-natural treatments to let you reestablish a pain-free jaw function. We provide TMJ chiropractic adjustment near you.
                    </>
                }
                image={tmj1}
            />

            <ContentSection
                title="How Does TMJ Impact Your Life?"
                text={
                    <>
                        Before you even see a chiropractor specializing in TMJ near you at Tatum Chiropractic and Wellness, it is prudent to understand how TMJ impacts your health and life.
                        <br /><br />
                        The temporomandibular joint controls a range of movements and motions. It allows the jaw to slide from side to side, back, and forward. The joint also opens and closes the complex motions needed for chewing and talking.
                        <br /><br />
                        Different things can cause the joint to malfunction. For instance, a blow to your face can cause the joint to be misaligned. The cartilaginous disc within the joint can also erode due to degeneration associated with aging. Mostly, bruxism of grinding and clenching of the jaw can result in TMJ.
                    </>
                }
                image={tmj2}
                reverse={true}
            />
            <ContentSection
                text={
                    <>
                        TMJ can badly influence your quality of life, thus the need to see a chiropractor or specialist near you for help. A patient with TMJ shows symptoms like:
                        <br /><br />
                        <ul>
                            <li>Difficulties opening the mouth normally</li>
                            <li>Extreme pain when moving the jaw</li>
                            <li>Jaw stiffness</li>
                            <li>Facial pain and fatigue</li>
                            <li>Facial swelling</li>
                            <li>Clicking or popping sounds within the joint</li>
                            <li>Neck, shoulder, or ear pain</li>
                        </ul>
                        <br /><br />
                        Whenever you have any of these symptoms, seek a chiropractor for TMJ near you at Tatum Chiropractic and Wellness to receive TMJ symptoms treatment.
                    </>
                }
                image={tmj3}
            />

            <ContentSection
                title="Effective, Surgery-Free Treatment for TMJ"
                text={
                    <>
                        Some cases of TMJ may not be resolved with dental treatment. Therefore, a different approach is needed. Surgery may also come as a last resort. Our TMJ chiropractor in Cave Creek, AZ, can evaluate the function and position of your jaw joint and your symptoms. We also check your medical history and develop a drug-free, surgery-free treatment.
                        <br /><br />
                        Gentle chiropractic TMJ adjustment can help with jaw subluxation, helping restore the joint components to their alignment. Again, massage therapy can help relax chronically tense or strained jaw and neck muscles, thus helping relieve TMJ symptoms.
                        <br /><br />
                        Our chiropractor may also recommend lifestyle changes to help ease stress, which is considered a common culprit for bruxism. You will notice the difference between our TMJ chiropractor’s before and after treatment results.
                    </>
                }
                image={tmj4}
                reverse={true}
            />

            <ContentSection
                title="Benefits of Chiropractic Care for TMJ"
                text={
                    <>
                        Chiropractic care is a non-invasive, natural approach to the treatment of TMJ. A patient doesn’t have to undergo surgery, which may cause complications. Also, patients don’t have to rely on medications to stop pain or ease muscle tension and stress. Medication dependency can contribute to many other problems, such as drug addiction. Seek a chiropractor for TMJ pain near you and see the results before and after treatment.
                    </>
                }
                image={tmj5}
            />
            <ContentSection
                title="Schedule An Appointment with Us!"
                text={
                    <>
                        We can help you or a family member triumph over TMJ symptoms. Talk with our chiropractor for TMJ treatment near you, or seek TMJ headache treatment in Cave Creek, AZ, with chiropractic care. Contact our TMJ treatment chiropractor at Tatum Chiropractic and Wellness to make your appointment today to ease and manage your TMJ symptoms and improve your quality of life.
                    </>
                }
                image={tmj6}
                reverse={true}
            />

            <OtherServices />

        </>
    );
}

export default ChiropracticTreatment;