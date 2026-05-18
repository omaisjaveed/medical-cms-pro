import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import kid1 from '../assets/images/kid1.webp';
import kid2 from '../assets/images/kid2.webp';
import kid3 from '../assets/images/kid3.webp';
import kid4 from '../assets/images/kid4.webp';
import kid5 from '../assets/images/kid5.webp';
import OtherServices from "../Components/OtherServices";
import Faq from "../Components/FAQ";

function ChiropracticKids() {
    return (
        <>
            <Helmet>
                <title>Chiropractic Care for Kids| Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Chiropractic Care for Kids" />
            <ContentSection
                title="Chiropractic Care for Kids in Cave Creek, AZ"
                text={
                    <>
                        A child’s nervous system is the controller and regulator of all the other systems in their growing body. From blood flow to brain function and bone growth, the nervous system plays a central role in keeping things working and healthy. Stress and misalignment of the spine can have serious impacts on your child’s overall health, behavior, and development.
                        <br /><br />
                        <strong>Tatum Chiropractic and Wellness is a chiropractic clinic</strong>  that offers gentle and non-invasive therapy that works to correct underlying issues before they become hard-wired in during development, providing support for a pain-free and successful childhood.
                    </>
                }
                image={kid1}
            />

            <ContentSection
                title="Pediatric Chiropractic In Cave Creek"
                text={
                    <>
                        It may be difficult to imagine that a child would need chiropractic care. They seldom complain of chronic pain the way adults do, and their bodies appear to be made of rubber in the way they bounce back from injury. The truth is, children’s bodies are under a lot of stress while they are in a state of development, and keeping them healthy requires maintenance.
                        <br /><br />
                        Stress and trauma to the body and spine commonly begin with the birthing process. Infant’s spines can easily become misaligned from the intense pressure involved in both natural and Cesarean births. Unfortunately, other than crying, they have no way of communicating their pain, and it’s the source to us.
                        <br /><br />Throughout infancy, they may sleep in awkward positions and occasionally take a tumble. As children, they grow into toddlers who strain and twist, and fall, while learning to crawl and walk. Luckily, they are very resilient and can take a lot of impacts, but it is not uncommon for these injuries to develop into patterns of movement that will pull a child’s bones out of alignment over time.
                    </>
                }
                image={kid2}
                reverse={true}
            />
            <ContentSection
                text={
                    <>
                        As kids, they may start to develop bad posture. Sitting in front of a computer or TV can have serious repercussions on the spine. Playing contact sports, wearing heavy backpacks (most likely the wrong way), and even sitting in desks can all cause issues. As teenagers, they begin to deal with the stress of more daily responsibilities, like becoming part of the workforce and use their bodies to perform physical labor such as painting houses and serving tables.
                        <br /><br />
                        As you can see, there are plenty of opportunities throughout development for a child’s body, and particularly their spine, to become out of alignment, which will affect other aspects of their healthy nervous system function and development.
                    </>
                }
                image={kid3}
            />
            <ContentSection
                title="How Can I Tell If My Child Needs Chiropractic Care?"
                text={
                    <>
                        A child’s spine can become quite misaligned without any awareness on their part of pain or discomfort. Children have not always developed enough awareness of their bodies to identify a subtle chronic issue developing. Even when a child is experiencing pain, they may not be able to communicate it to you, and it can come across as grumpiness, acting out, or incessant crying. Issues with the spine can also be the source of many other childhood issues.
                    </>
                }
                image={kid4}
                reverse={true}
            />
            <ContentSection
                title="What Is Chiropractic Care For Kids?"
                text={
                    <>
                        A chiropractic treatment for a child begins with an extensive examination to determine the exact issue and the best route for treatment. Even if your child is too young to communicate or too shy, a chiropractor has the skills to work with them to find out exactly what is going on before proceeding with treatment; if it is determined that treatment is needed. Gentle and non-invasive adjustments are then made to the spine. Children will often become relaxed and even fall asleep following treatment, a good sign that it has been effective. If you are concerned about your child’s spinal health, call our team at Tatum Chiropractic and Wellness to set up a consultation today.
                    </>
                }
                image={kid5}
            />
                <Faq/>
            <OtherServices />

        </>
    );
}

export default ChiropracticKids;