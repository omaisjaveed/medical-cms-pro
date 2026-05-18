import React from "react";
import { Helmet } from "react-helmet-async";
import InnerBanner from "../Components/InnerBanner";
import ContentSection from "../Components/ContentSection";
import work1 from '../assets/images/work1.webp';
import work2 from '../assets/images/work2.webp';
import work3 from '../assets/images/work3.webp';
import OtherServices from "../Components/OtherServices";

function WorkInjury() {
    return (
        <>
            <Helmet>
                <title>Work Injury | Tatum Wellness</title>
                <meta name="description" content="My website description" />
            </Helmet>
            <InnerBanner bannertitle="Work Injury" />
            <ContentSection
                title="Work Injury Treatment in Cave Creek, AZ"
                text={
                    <>
                        Most people associate work-related injuries to be as a result of a slip and fall in the workplace. But did you know that most work injuries manifest as a result of repetitive motion that can occur in a wide range of occupations ranging from warehouse and construction work to office and retail work? One interesting fact about work injury care near you is that early treatment should be sought before the condition worsens. Also, when you partner with a health provider like the team at Tatum Chiropractic and Wellness, we’ll maintain complete records of your progress for your employer or insurance company.
                    </>
                }
                image={work1}
            />

            <ContentSection
                title="Types of Repetitive Work Injuries"
                text={
                    <>
                        As you can imagine, the types of work-related injuries are almost as endless as the types of work that individuals perform for their occupation. However, the most common repetitive stress work injuries include frozen shoulder, carpal tunnel syndrome, sciatica, backaches, arthritis, slipped and herniated discs, headaches, and more.
                        <br /><br />
                        The key takeaway for seeking treatment from our chiropractor near you for work injury care in Cave Creek, AZ, is that your care can include an array of treatment options designed to relieve pain, promote healing, and ensure that the injury does not progress into something more problematic.
                    </>
                }
                image={work2}
                reverse={true}
            />
            <ContentSection
                title="What You’ll Appreciate About Our Work Injury Care"
                text={
                    <>
                        As one of the top-rated chiropractors near you, you’ll experience the same exemplary work injury care that so many others have already discovered. Not only will our chiropractic care team treat your pain and symptoms – whether it’s from a repetitive injury, a slip and fall, or more – but we’ll provide the documentation that your employer requires for worker’s compensation claim filing.

                        <br /><br />
                        If you’ve recently experienced a work injury in Cave Creek, AZ, or the great Phoenix area and want to stay ahead of the curve concerning pain management, we invite you to make an appointment now using our convenient online booking tool to schedule a consultation and treatment for your injury.

                        <br /><br />
                        Remember, what starts as a simple headache or pulled muscle today could manifest into something more severe tomorrow. Call us now to learn more about work injury care near you from the Tatum Chiropractic and Wellness team in North Scottsdale.
                    </>
                }
                image={work3}
            />
            

            <OtherServices />

        </>
    );
}

export default WorkInjury;