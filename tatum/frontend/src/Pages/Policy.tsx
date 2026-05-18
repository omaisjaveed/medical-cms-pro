import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerBanner from "../Components/InnerBanner";

gsap.registerPlugin(ScrollTrigger);

const Policy = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const headingRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const sections = sectionsRef.current.filter(Boolean);
        if (!section) return;

        gsap.set([heading, sections], { opacity: 0, y: 30 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });

        tl.to(heading, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
        }).to(
            sections,
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "back.out(1)",
            },
            "-=0.3"
        );

        return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }, []);

    return (
        <>
            <Helmet>
                <title>Privacy Policy | Tatum Wellness</title>
                <meta
                    name="description"
                    content="Read our Privacy Policy to understand how Tatum Chiropractic and Wellness collects, uses, and protects your protected health information in compliance with HIPAA."
                />
            </Helmet>

            <InnerBanner bannertitle="Privacy Policy" />

            <section className="privacy-policy-sec" ref={sectionRef}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="privacy-policy-content" ref={contentRef}>
                                <div className="policy-intro" ref={headingRef}>
                                    <p>
                                        This Privacy Policy covers services provided to you by our office.
                                        By law, we are required to maintain the privacy of protected health
                                        information and to provide you with the Policy of our legal duties
                                        and privacy practices with respect to protected health information.
                                        Protected health information consists of information about you
                                        (including demographic information) that may identify you and that
                                        relates to your past, present, or future physical or mental health
                                        or condition. It also includes related health care services.
                                    </p>
                                    <p>
                                        The Policy describes how Tatum Chiropractic and Wellness may use
                                        and disclose your protected health to carry out treatment, payment,
                                        or health care operations. Other uses and disclosures of your
                                        information will be made only with your written authorization
                                        (unless otherwise permitted or required by law). The Policy also
                                        describes your rights to access and control your protected health
                                        information and informs you of your rights to make a complaint to
                                        either the office or to the Secretary of Health and Human Services
                                        if you believe we have violated your rights.
                                    </p>
                                    <p>
                                        We are required to abide by the terms of the Policy. We may change
                                        the terms of the policy at any time. The new notice will be
                                        effective for all protected health information that we maintain at
                                        the time of the change. We can provide you with any revised Policy
                                        upon request. You may contact our office by one of two ways:
                                        calling our Office Manager and requesting that a revised copy be
                                        sent to you in the mail, or asking for one at your next appointment.
                                    </p>
                                    <p>Please read this Policy carefully.</p>
                                </div>

                                <div className="policy-section" ref={(el) => (sectionsRef.current[0] = el)}>
                                    <h2>NOTICE OF PRIVACY PRACTICES</h2>
                                    <p>
                                        This Notice describes how medical information about you may be used
                                        and disclosed and how you can get access to this information. Please
                                        review it carefully.
                                    </p>
                                    <p>
                                        If you have any questions about this Notice, please contact the
                                        OFFICE MANAGER.
                                    </p>
                                    <p>
                                        We are required by law to maintain the privacy of our patients’
                                        health information and to provide you with this Notice of our legal
                                        duties and privacy practices with respect to protected health
                                        information. Protected health information consists of information
                                        about you – including demographic information – that may identify
                                        you and that relates to your past, present, or future physical or
                                        mental health or condition and related health care services.
                                    </p>
                                </div>

                                <div className="policy-section" ref={(el) => (sectionsRef.current[1] = el)}>
                                    <h2>1 USES AND DISCLOSURES OF PROTECTED HEALTH INFORMATION</h2>
                                    <h3>Uses and Disclosures of Protected Health Information for Treatment, Payment, or Operations</h3>
                                    <p>
                                        Your protected health information may be used by your doctor for
                                        treatment, payment, and health care operations as described here
                                        without authorization from you. It may be used and disclosed by
                                        your doctor, the office staff, and others outside our office who are
                                        involved in your care and treatment for the purpose of providing
                                        health care services to you and to pay your health care bills, which
                                        are used to support the operation of the doctor’s practice.
                                    </p>
                                    <p>
                                        The following are examples of ways in which your protected
                                        healthcare information may be used by your doctor and the office
                                        staff without your specific authorization. Please note that these
                                        examples are not meant to be exhaustive, only to describe the types
                                        of uses and disclosures that can possibly be made by our office.
                                    </p>
                                    <ul>
                                        <li>
                                            <strong>Treatment:</strong> Your protected healthcare information
                                            may be used and disclosed to provide, coordinate, or manage your
                                            health care and any related services, including services rendered
                                            from another doctor, consultation with another doctor, or the
                                            management of your health care with a third party.
                                        </li>
                                        <li>
                                            <strong>Payment:</strong> Your information may be used, as
                                            needed, to obtain or provide payment for your medical services.
                                            This includes disclosures to other entities, such as in the case
                                            that your health insurance plan may undertake certain activities
                                            (for example, making a determination of eligibility or coverage
                                            for benefits, reviewing services provided, and undertaking
                                            utilization review activities) before it approves or pays for
                                            services recommended to you.
                                        </li>
                                        <li>
                                            <strong>Operations:</strong> Your protected health information
                                            may be disclosed or used, as needed, to support the business
                                            activities of your doctor’s practice. These activities include –
                                            but are not limited to – quality assessment and improvement
                                            activities; reviewing the competence or qualifications of
                                            professionals; business planning and development; and conducting
                                            or arranging for other business activities.
                                        </li>
                                    </ul>
                                    <p>
                                        In conducting business activities, we may use a sign-in sheet at
                                        the registration desk where you will be asked to sign your name and
                                        indicate your treating provider. We may also call you by name in
                                        the waiting room and use or disclose your protected health
                                        information, as needed, to contact you to remind you of your
                                        appointment.
                                    </p>
                                    <p>
                                        Whenever your protected health information is used or disclosed in
                                        an arrangement between our office and a business associate, we will
                                        have a written contract that contains terms that will protect the
                                        privacy of your information.
                                    </p>
                                    <p>
                                        We may use or disclose your protected health information, as
                                        necessary, to provide you with information about a product or
                                        service to encourage you to purchase or use the product or service.
                                        This may be done for a few specific, limited purposes.
                                    </p>
                                    <p>
                                        Your protected health information may be disclosed to another
                                        provider, health plan, or health care clearinghouse for limited
                                        operational purposes as long as the other entity has, or has had, a
                                        relationship with you.
                                    </p>
                                    <h3>Uses and Disclosures of Protected Health Information Based upon Your Written Authorization</h3>
                                    <p>
                                        Other uses and disclosures of your protected health information
                                        will only be made with your written authorization unless otherwise
                                        permitted or required by law. You may revoke this authorization at
                                        any time in writing, except to the extent that your doctor or the
                                        practice has taken action in reliance on the use or disclosure
                                        indicated in the authorization.
                                    </p>
                                </div>

                                <div className="policy-section" ref={(el) => (sectionsRef.current[2] = el)}>
                                    <h2>2 YOUR RIGHTS</h2>
                                    <p>
                                        The following is a statement of your rights, with respect to your
                                        protected health information, and a brief description of how these
                                        rights may be exercised.
                                    </p>
                                    <p>
                                        You have the right to inspect and copy your protected health information. This means that you may inspect and obtain a copy of your protected health information that is contained in your chart, including medical and billing records. It also includes any other records that your doctor and the practice may use to make decisions about your treatment.
                                    </p>
                                    <p>
                                        You may not, however, inspect or copy information compiled in
                                        reasonable anticipation of, or use in, a civil, criminal, or
                                        administrative action or proceeding. Depending on the circumstances,
                                        a decision made to deny access may be reviewable. Please contact
                                        our Office Manager if you have questions about what access you are
                                        allowed to your medical record.
                                    </p>
                                    <p>
                                        You have the right to request a restriction of your protected health information, wherein you ask our office not to use or disclose any part of your protected health information for the purposes of treatment, payment, or healthcare operations. You may also request not to have your protected health information disclosed to family members or friends who may be involved in your care. Any request made must state the specific restriction requested and to whom you want the restriction to apply.
                                    </p>
                                    <p>
                                        Your doctor is not required to agree to a restriction that you may
                                        request but may permit use and disclosure of your protected health
                                        information if he or she believes it is in your best interest. If
                                        your doctor does agree to the requested restriction, we may not use
                                        or disclose your information unless it is needed to provide
                                        emergency treatment. If you wish to place any restriction on your
                                        protected health information, speak with the office manager.
                                    </p>
                                    <p>
                                        You have the right to request confidential communications from us by alternative means or at an alternative location; we will accommodate reasonable requests. We will not request an explanation as to the basis for the request, but may condition this accommodation by asking you for information in regards to how payment will be handled or specification of an alternative address or another method of contact. Please make this request in writing and submit it to our Office Manager.
                                    </p>
                                    <p>
                                        You may have the right to have your provider amend your protected health information, though we reserve the right to deny this request. This may include a request for an amendment of protected health information about you in a designated record set for as long as we handle that information. If we deny your request for an amendment, you have the right to file a statement of disagreement. In this case, we may prepare a rebuttal to your statement and provide you with a copy of any such rebuttal.
                                    </p>
                                    <p>
                                        You have the right to receive an accounting of certain disclosures made by us, if any, of your protected health information. This applies to disclosures made for purposes other than treatment, payment, or healthcare operations as described in this Policy, though it excludes any disclosures made to you, for a facility directory, to family members or friends involved in your care, or for notification purposes. It also excludes any disclosures for which you have signed an authorization. The right to receive this information is subject to certain exceptions, restrictions, and limitations.
                                    </p>
                                </div>

                                <div className="policy-section" ref={(el) => (sectionsRef.current[3] = el)}>
                                    <h2>3 COMPLAINTS</h2>
                                    <p>
                                        You may make a complaint to us or to the Secretary of Health and
                                        Human Services if you believe your privacy rights have been
                                        violated. You may file a complaint with us by notifying our Office
                                        Manager. We will not retaliate against you for filing a complaint.
                                    </p>
                                    <p>
                                        For further information about the complaint process, contact the
                                        Office Manager.
                                    </p>
                                    <p>
                                        This Policy was published and becomes effective on March, 21 2019.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Policy;