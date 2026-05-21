const settings = [
  {
    key: "site_name",
    value: "Tatum Chiropractic and Wellness",
  },
  {
    key: "logo",
    value: { imageKey: "tatum-logo" },
  },
  {
    key: "header_links",
    value: [
      { name: "Home", path: "/" },
      {
        name: "About",
        path: "/about-us",
        children: [
          { name: "Meet The Doctor", path: "/meet-the-doctor" },
          { name: "Meet The Team", path: "/meet-the-team" },
          { name: "Testimonials", path: "/testimonials" },
          { name: "Gallery", path: "/gallery" },
          { name: "Tools of the Trade", path: "/tools-of-the-trade" },
          { name: "Blogs", path: "/blogs" },
        ],
      },
      {
        name: "Services",
        path: "/back-pain",
        children: [
          {
            name: "Spine Related",
            children: [
              { name: "Back Pain", path: "/back-pain" },
              { name: "Neck Pain", path: "/neck-pain" },
              { name: "Headache & Migraine", path: "/headache-migraine" },
              { name: "Sciatica", path: "/sciatica" },
              { name: "Scoliosis", path: "/scoliosis" },
              { name: "Vertigo", path: "/vertigo" },
            ],
          },
          {
            name: "Injuries",
            children: [
              { name: "Disc Injury", path: "/disc-injury" },
              { name: "Whiplash", path: "/whiplash" },
              { name: "Work Injury", path: "/work-injury" },
            ],
          },
          {
            name: "Extremities",
            children: [
              { name: "Leg & Arm Pain", path: "/arm-and-leg-pain" },
              { name: "Carpal Tunnel", path: "/carpal-tunnel" },
              { name: "Shoulder Pain", path: "/shoulder-pain" },
            ],
          },
          {
            name: "Chiropractic Care",
            children: [
              { name: "Chiropractic Care for Kids", path: "/chiropractic-care-for-kids" },
              { name: "Pregnancy Chiropractic Care", path: "/pregnancy-chiropractic-care" },
              { name: "Wellness Care", path: "/wellness-care" },
            ],
          },
          { name: "TMJ and Chiropractic treatment", path: "/tmj-and-chiropractic-treatment" },
          { name: "Piezowave 2", path: "/piezowave-2" },
        ],
      },
      { name: "Contact Us", path: "/contact-us" },
    ],
  },
  {
    key: "contact_info",
    value: {
      email: "tatumwellnesschiropractic@gmail.com",
      phone: "480-513-8900",
      address: "29834 N. Cave Creek Rd Suite 142 Cave Creek, AZ 85331",
      fax: "480-513-9395",
    },
  },
  {
    key: "business_hours",
    value: {
      Monday: "9 AM - 5:30 PM",
      Tuesday: "9 AM - 12 PM",
      Wednesday: "9 AM - 5:30 PM",
      Thursday: "2 PM - 5:30 PM",
      Friday: "9 AM - 5 PM",
    },
  },
  {
    key: "social_links",
    value: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
  },
  {
    key: "footer_text",
    value: "©2026 Tatum Chiropractic and Wellness | Web Design, Digital Marketing & SEO By Adit",
  },
  {
    key: "booking_url",
    value: "https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670",
  },
  {
    key: "maintenance_mode",
    value: false,
  },
];

const pages = [
  {
    slug: "",
    title: "Home",
    meta_title: "Home | Tatum Wellness",
    meta_description: "Tatum Chiropractic and Wellness in Cave Creek, AZ offers chiropractic care, wellness services, and patient-centered treatment.",
    sections: [
      {
        type: "hero",
        order: 0,
        content: [
          {
            id: 1,
            mainHeading: "Experience Better Health",
            mainParagraph: "Tatum Chiropractic and Wellness provides comprehensive care for your entire family.",
            secondHeading: "Wellness for Life",
            button1Text: "Learn More",
            button1Link: "/about-us",
            button2Text: "Book Now",
            button2Link: "https://www.zhealthehr.com/appointmentPortal/5f1c8699-601f-444f-a3ed-13ef10a8a670",
            imageKey: "tatum-slider",
          }
        ],
      },
      {
        type: "infoBoxes",
        order: 1,
        content: {
          items: [
            {
              title: "New Patients",
              desc: "Welcome to Cave Creek, AZ! Welcome to Tatum Chiropractic and Wellness. We focus on your unique health situation.",
              imageKey: "info-1",
            },
            {
              title: "Our Services",
              desc: "Over the years, we have used chiropractic care to improve the lives of countless patients.",
              imageKey: "info-2",
              highlight: true,
            },
            {
              title: "Contact Us",
              desc: "Have questions? Our friendly team is here to help. Reach out to us today for more information.",
              imageKey: "info-3",
            },
          ],
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "CHIROPRACTIC CARE IN CAVE CREEK, AZ",
          text: "Trying to find an experienced chiropractor near you? Welcome to Tatum Chiropractic and Wellness, located in Cave Creek, Arizona! Chiropractic is one of the most amazing healthcare professions, but very few people understand what it's all about. We are here to help you gain a basic understanding of how our Cave Creek chiropractors can help you and your family.\n\n<strong>HOW CAN WE HELP?</strong>\nOver the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas.",
          imageKey: "about-img",
        },
      },
      {
        type: "servicesCarousel",
        order: 3,
        content: {
          title: "Our Professional Services",
          description: "Over the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas.",
          serviceIds: [1, 2, 3, 4, 5, 6],
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "Advanced Chiropractic Techniques",
          text: "At Tatum Chiropractic and Wellness, we use a variety of proven techniques to help you achieve optimal health. Whether you are dealing with chronic pain or a recent injury, our personalized approach ensures you get the care you need.",
          imageKey: "chiro-img",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 5,
        content: {
          title: "MEET THE DOCTOR",
          text: "Dr. Tim Lind is originally from Central Oregon, where he practiced chiropractic for 28 years. He recently relocated to Phoenix with his wife, Shelley, to spend more time with their grown daughters and enjoy all Arizona has to offer.\n\n<strong>Dr. Tim Lind D.C.</strong>\nChiropractor",
          imageKey: "doctor",
        },
      },
      {
        type: "gallery",
        order: 6,
        content: {
          title: "CLINIC GALLERY",
          galleryIds: [1],
        },
      },
      {
        type: "blogSlider",
        order: 7,
        content: {
          title: "OUR BLOGS",
          blogIds: [1, 2, 3],
        },
      },
    ],
  },
  {
    slug: "about-us",
    title: "About Us",
    meta_title: "About Us | Tatum Wellness",
    meta_description: "Learn about Tatum Chiropractic and Wellness and how our Cave Creek chiropractic team can help your family.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "About Us",
          subtitle: "Discover why patients trust Tatum Chiropractic and Wellness for holistic care in Cave Creek.",
          imageKey: "inner-about-1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Chiropractic Care in Cave Creek, AZhiropractic & Wellness",
          text: "Trying to find an experienced chiropractor near you? Welcome to Tatum Chiropractic and Wellness, located in Cave Creek, Arizona! Chiropractic is one of the most amazing healthcare professions, but very few people understand what it’s all about. We are here to help you gain a basic understanding of how our Cave Creek chiropractors can help you and your family.",
          imageKey: "inner-about-1",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "How Can We Help?",
          text: "Over the years, we have used chiropractic care to improve the lives of countless patients from Cave Creek, North Phoenix, North Scottsdale, Carefree, and the surrounding areas. Chiropractic care is the practice of using spinal alignment to alleviate a wide variety of physical ailments, including muscle strain, neck pain, chronic back pain, and more. This is accomplished by adjusting the position of the spinal column to its proper shape, providing a non-invasive solution for pain relief.",
          imageKey: "inner-about-2",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "meet-the-doctor",
    title: "Meet The Doctor",
    meta_title: "Meet The Doctor | Tatum Wellness",
    meta_description: "Meet Dr. Tim Lind and learn about his chiropractic experience and techniques.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Meet The Doctor",
          subtitle: "Dr. Tim Lind D.C. has 28 years of chiropractic experience and offers modern, patient-centered care.",
          imageKey: "doctor",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Dr. Tim Lind D.C.",
          text: "Dr. Tim Lind is originally from Central Oregon, where he practiced chiropractic for 28 years. He recently relocated to Phoenix with his wife, Shelley, to spend more time with their grown daughters and enjoy all Arizona has to offer. Dr. Lind graduated from Los Angeles Chiropractic College in 1990. He enjoys treating individuals based on their particular needs, using a variety of techniques to help with both acute and chronic conditions. Dr. Lind is skilled in adjusting techniques including Gonstead, Thompson drop table, flexion/distraction, diversified, and the use of instrument adjusting. He has completed over 300 hours of post-graduate studies, including functional neurology, functional medicine, functional blood work analysis, endocrinology, neurotransmitters, and the non-surgical treatment of disc degeneration, herniation, and bulging spinal discs. He also utilizes trigenics, which helps restore joint and extremity function. Dr. Lind enjoys playing golf, fly fishing and fly tying, hiking, and time with his family and friends.",
          imageKey: "doctor",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "tools-of-the-trade",
    title: "Tools of the Trade",
    meta_title: "Tools of the Trade | Tatum Wellness",
    meta_description: "See the chiropractic tools and technology used by Tatum Wellness for patient care.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Tools of the Trade",
          subtitle: "Modern chiropractic tools and techniques used to support safe, effective treatment.",
          imageKey: "gallery-5",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Tools of the Trade",
          text: "When you have pain and discomfort in the body, chiropractic treatment can help offer solutions. Based on your situation, a chiropractor in Phoenix, AZ can plan a treatment plan tailored to help ease or alleviate symptoms related to injuries, health complications, or overall wellness. A treatment plan created by Dr. Tim Lind and his team might involve the use of one or multiple chiropractic tools, as briefly described below. A visit to Tatum Chiropractic allows you to get chiropractic therapy backed by innovative technologies, tools, and a trained and knowledgeable team.",
          imageKey: "gallery-5",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "Chiropractic Care Backed by Inventive Tools and Technologies",
          text: "Dr. Lind uses an Arthrostim, which provides relief in particular parts of the body. The tool helps to provide adjustments and manipulations in a precise, low-force, and comfortable way. For those with chronic low back pain, the chiropractic team at Tatum Chiropractic may choose to utilize the Flexion Distraction Table. This allows the team to utilize chiropractic technique to safely adjust the spine therapeutically to alleviate pain and take off pressure from the lumbar. The Flexion-Distraction Table is suitable for use in reducing disc protrusion, increasing flexibility of tendons and ligaments, and reducing the effects of sciatica. We may use our Drop Table when choosing to treat pain with less force to get the spinal column in place. This body manipulation and adjustment technique mostly uses gravity to enhance the movement. Tatum Chiropractic also has a Percussor. This device helps distribute waves into the tissues of the body. The percussive impulses from the waves promote the flow and circulation of lymphatic fluid. We are able to treat a variety of conditions with this handheld tool, including loosening fixed areas like scar tissue, loosening tight muscles, releasing joints, and reducing muscle spasms. We also employ Release Muscle Stimulation, which helps improve pain and swelling in joints. To find out more about our chiropractic techniques and the tools and technologies we utilize to facilitate effective treatment, talk to us at Tatum Chiropractic. Dr. Tim Lind’s team will be happy to discuss ways they can help alleviate pain and restore comfort in your body.",
          imageKey: "about-img",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "back-pain",
    title: "Back Pain",
    meta_title: "Back Pain | Tatum Wellness",
    meta_description: "Learn how chiropractic care in Cave Creek can help back pain, disc bulges, subluxations, strains, and stress-related pain.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Back Pain",
          subtitle: "Comprehensive back pain care for disc injury, subluxations, muscle strain, and stress-related pain.",
          imageKey: "backpain1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Chiropractic Care in Cave Creek, AZhiropractic & Wellness",
          text: "If you are living with chronic back pain, then chiropractic care in Cave Creek might be a good treatment option. Almost everyone will experience some form of back pain, ranging from slightly irritating to completely crippling, in their lifetime. Whatever the degree of pain you are experiencing and whether it is acute or has become chronic, at the very least, you would probably rather live without it. In the most extreme cases, it can be difficult to go on living with it. This article aims to help you to understand what causes lower back pain, and how chiropractic treatment can help you achieve lasting back health so that you can go on enjoying those walks in the park.",
          imageKey: "backpain1",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "Back Pain In Cave Creek",
          text: "The back is a broad term that covers a large area of the body. It is made up of many tendons, ligaments, discs, muscles, and bones. Without a solid understanding of these different parts, it can be complicated to locate and address the source of the pain. The following explains some of the most common issues and their identifying features. It also explains how chiropractic medicine can help to resolve them. This is a general guideline to help you in your quest for effective treatment, but we highly recommend that you seek a professional opinion to properly diagnose these issues.",
          imageKey: "backpain2",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "Disc Bulges And Herniations",
          text: "Disc bulges and herniations are conditions in which the outer edges of the discs, located between the vertebrae, are damaged. This causes the jelly-like center to bulge or become pushed out. This is a surprisingly common issue, and it is often, but not always, very painful. Many people who have this condition feel nothing at all. The quality and intensity of it, for those who experience pain, depends on the type and position of the herniation. If the damaged disc is irritating, a surrounding nerve, shooting, or stabbing pain along with weakness in the legs is often severe. It is important that this issue is properly identified and promptly treated to avoid further damage. A chiropractor in Cave Creek will thoroughly assess your back to determine the extent of the issue and the appropriate treatment to prevent worsening of the herniation, and provide relief from the associated pain.",
          imageKey: "backpain3",
        },
      },
      {
        type: "content",
        order: 5,
        content: {
          title: "Subluxations",
          text: "Subluxation is a medical term describing a misalignment in the vertebral column. There are a wide variety of causes, including physical stress, trauma, and toxins. Subluxations are often quite painful and can disrupt normal movement. Subluxations are one of the most commonly overlooked contributors to back pain. Chiropractors are trained to identify and correct this issue using non-invasive adjustment techniques.",
          imageKey: "backpain4",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 6,
        content: {
          title: "Muscular Sprains And Tendon Or Ligament Strains",
          text: "Strains and sprains most typically occur when we engage in tasks that our body is not accustomed to, or when we are involved in an accident. Lifting while twisting or stretching past one’s limits are common causes to strains and sprains of the back. These can be extremely painful and are often accompanied by swelling and bruising of the surrounding area. Strains and sprains in the back tend to involve changes to the alignment of the spine and typically respond well to chiropractic care.",
          imageKey: "backpain5",
        },
      },
      {
        type: "content",
        order: 7,
        content: {
          title: "Stress And Back Pain",
          text: "Chronic stress wreaks havoc on the body and can eventually lead to hyper-tension and chronic back pain. The back pain is a result of tension and muscle spasms that occur when stress hormones are released. The tension will often accumulate in what is referred to as trigger points. These trigger points can be extremely painful and need professional attention to resolve. Chiropractors have the knowledge and tools to relieve stress from trigger points and to deal with underlying nervous system imbalances that may be keeping your body locked in patterns of stress and pain.",
          imageKey: "backpain6",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 8,
        content: {
          title: "Other Issues That Cause Back Pain",
          text: "Conditions such as obesity, arthritis, kidney stones, and urinary tract infections have been shown to cause symptoms of lower back pain. These are all serious issues that need to be identified and treated immediately to avoid long-term health issues. Cave Creek chiropractic doctors are trained to identify these issues and support you in getting the appropriate treatment. Many of these issues can have their source in spinal misalignments and respond well to chiropractic adjustments. If you have questions about how our team at Tatum Chiropractic and Wellness can help you, please schedule a consultation today.",
          imageKey: "backpain7",
        },
      },
    ],
  },
  {
    slug: "disc-injury",
    title: "Disc Injury",
    meta_title: "Disc Injury | Tatum Wellness",
    meta_description: "Disc injury assessment and treatment in Cave Creek, AZ from Tatum Chiropractic and Wellness.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Disc Injury",
          subtitle: "Disc injury treatment near you from a top-rated wellness and chiropractic clinic in Cave Creek, AZ.",
          imageKey: "disc1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Disc Injury Treatment in Cave Creek, AZ",
          text: "Are you in North Scottsdale, and you’re looking for disc injury treatment near you from a top-rated wellness and chiropractic clinic in Cave Creek, AZ? If so, you’ll be happy to read that whether your pain is mild or severe, Dr. Lind and his team have the experience, skills, and equipment that’s required to provide optimum disc injury treatment near you.",
          imageKey: "disc1",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "Not Sure if You Have a Disc Injury?",
          text: "Some of the symptoms you may notice that signal a disc injury include back pain, neck pain, weakness in your legs or feet, pain and/or numbness in your legs and feet, as well as the loss of bladder or bowel control. Our chiropractor in Cave Creek, AZ, will be able to diagnose whether you’re experiencing a disc injury through a series of techniques, including physical palpation, movement tests, muscle strength tests, and other tests that utilize state-of-the-art equipment. The key to relief from your disc injury is to seek treatment promptly so the condition can be stabilized and relief from pain administered. At Tatum Chiropractic and Wellness, your disc injury assessment will involve a thorough understanding of any event that may have led to the injury, your medical history, x-rays if needed, and a physical examination to determine the extent of the disc injury and the appropriate treatment protocol to provide pain relief and recovery. In some cases, patients will experience relief from their symptoms after one visit; however, if it’s determined that your disc injury treatment requires a series of appointments to achieve complete recovery, our approach to your treatment will be tailored to your exact area of need and recovery goals.",
          imageKey: "disc2",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "Our Goal for Your Disc Injury Treatment",
          text: "As one of the highest-rated chiropractic clinics near you, the goal of our chiropractor in Cave Creek, AZ, is to help you reclaim a life that’s pain-free and fully mobile. Whether your disc disorder is diagnosed as a protruding disc, a herniated disc, or a disc extrusion, the chiropractic care you’ll receive from our team is always tailored to your specific area of need using the gentlest techniques available in modern chiropractic care.",
          imageKey: "disc3",
        },
      },
      {
        type: "content",
        order: 5,
        content: {
          title: "Make an Appointment Today for Disc Injury Treatment Near You",
          text: "Whether you’re seeking chiropractic care for disc injury treatment, general back or neck pain, or any of the other wide range of treatments we provide at Tatum Chiropractic and Wellness, we invite you to make an appointment today to experience the top-rated holistic care provided by our chiropractor near you.",
          imageKey: "disc4",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "chiropractic-care-for-kids",
    title: "Chiropractic Care for Kids",
    meta_title: "Chiropractic Care for Kids | Tatum Wellness",
    meta_description: "Gentle pediatric chiropractic care in Cave Creek, AZ to support development and spinal health.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Chiropractic Care for Kids",
          subtitle: "Gentle, non-invasive pediatric chiropractic support for children in Cave Creek.",
          imageKey: "kid1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Chiropractic Care for Kids in Cave Creek, AZ",
          text: "A child’s nervous system is the controller and regulator of all the other systems in their growing body. From blood flow to brain function and bone growth, the nervous system plays a central role in keeping things working and healthy. Stress and misalignment of the spine can have serious impacts on your child’s overall health, behavior, and development. Tatum Chiropractic and Wellness is a chiropractic clinic that offers gentle and non-invasive therapy that works to correct underlying issues before they become hard-wired in during development, providing support for a pain-free and successful childhood.",
          imageKey: "kid1",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "Pediatric Chiropractic In Cave Creek",
          text: "It may be difficult to imagine that a child would need chiropractic care. They seldom complain of chronic pain the way adults do, and their bodies appear to be made of rubber in the way they bounce back from injury. The truth is, children’s bodies are under a lot of stress while they are in a state of development, and keeping them healthy requires maintenance. Stress and trauma to the body and spine commonly begin with the birthing process. Infant’s spines can easily become misaligned from the intense pressure involved in both natural and Cesarean births. Unfortunately, other than crying, they have no way of communicating their pain, and it’s the source to us. Throughout infancy, they may sleep in awkward positions and occasionally take a tumble. As children, they grow into toddlers who strain and twist, and fall, while learning to crawl and walk. Luckily, they are very resilient and can take a lot of impacts, but it is not uncommon for these injuries to develop into patterns of movement that will pull a child’s bones out of alignment over time.",
          imageKey: "kid2",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "How Can I Tell If My Child Needs Chiropractic Care?",
          text: "A child’s spine can become quite misaligned without any awareness on their part of pain or discomfort. Children have not always developed enough awareness of their bodies to identify a subtle chronic issue developing. Even when a child is experiencing pain, they may not be able to communicate it to you, and it can come across as grumpiness, acting out, or incessant crying. Issues with the spine can also be the source of many other childhood issues.",
          imageKey: "kid4",
        },
      },
      {
        type: "content",
        order: 5,
        content: {
          title: "What Is Chiropractic Care For Kids?",
          text: "A chiropractic treatment for a child begins with an extensive examination to determine the exact issue and the best route for treatment. Even if your child is too young to communicate or too shy, a chiropractor has the skills to work with them to find out exactly what is going on before proceeding with treatment. Gentle and non-invasive adjustments are then made to the spine. Children will often become relaxed and even fall asleep following treatment, a good sign that it has been effective. If you are concerned about your child’s spinal health, call our team at Tatum Chiropractic and Wellness to set up a consultation today.",
          imageKey: "kid5",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "pregnancy-chiropractic-care",
    title: "Pregnancy Chiropractic Care",
    meta_title: "Pregnancy Chiropractic Care | Tatum Wellness",
    meta_description: "Pregnancy chiropractic care in Cave Creek to reduce pain, improve comfort, and support prenatal wellness.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Pregnancy Chiropractic Care",
          subtitle: "Safe, prenatal chiropractor care in Cave Creek to support pregnancy comfort and alignment.",
          imageKey: "pregnancy1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Pregnancy Chiropractic Care in Cave Creek, AZ",
          text: "If you’re reading this and pregnant, we first want to say congratulations! What an amazing time for you! Soon there will be so many changes in your life, and we want you to know that our chiropractor near you is here to help ensure that your pregnancy is a time of delight and joy as your body adjusts to its changes. Did you know that the added baby weight – even beginning with the first few pounds – can add additional stress on your back, spine, and pelvis as your center of gravity begins to shift? Also, the effect of relaxin can cause instability in your joints. Both of those conditions, as well as many others that you’ll experience throughout your pregnancy, will benefit from massage and other pregnancy chiropractic care near you.",
          imageKey: "pregnancy1",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "Benefits of Pregnancy Chiropractic Care Near You",
          text: "Our chiropractor in Cave Creek, AZ, is a specialist in providing holistic whole-body care to every patient in our office, but a few of the benefits that can be attained especially during pregnancy include quicker labor and delivery, lessened need for medical interventions during childbirth, reduction in aches and pains including pubic symphysis pain, a more restful night’s sleep, decreased stress and increased energy, and more! And because pregnancy chiropractic care is completely natural, mothers-to-be will never have to worry about side effects!",
          imageKey: "pregnancy2",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "Prenatal Chiropractic Care in Cave Creek, AZ",
          text: "For safe, effective, and proven holistic care throughout your pregnancy, including postpartum, make an appointment today for a consultation for pregnancy chiropractic care near you using our convenient online booking tool. Whether you’re seeking relief from aching ankles and feet or help to get a better night’s sleep so you can have a stress-free pregnancy, we have the experience and skill to keep this time in your life amazing!",
          imageKey: "pregnancy3",
        },
      },
    ],
  },
  {
    slug: "wellness-care",
    title: "Wellness Care",
    meta_title: "Wellness Care | Tatum Wellness",
    meta_description: "Wellness care in Cave Creek focusing on prevention, alignment, and optimal long-term health.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Wellness Care",
          subtitle: "Preventive spinal care and wellness plans that help you feel better and stay pain-free.",
          imageKey: "wellness1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Wellness Care in Cave Creek, AZ",
          text: "Just because you don’t feel sick, does not mean you feel as great as you could. Far too many people wait until they are sick to find a chiropractic clinic in Cave Creek. It is common in our culture to accept a slow decline in health as we age, but it is also unnecessary. We now have information and the advances in the field of health and wellness to live a life of optimal health which, contrary to popular belief, can actually get better as we grow older. This article will walk you through some of the common beliefs about health and discusses how chiropractic medicine can be an important part of your preventative, wellness care plan.",
          imageKey: "wellness1",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "How Lifestyle Affects Overall Wellness In Cave Creek",
          text: "The decisions we make and the actions we take in each moment of our day affect our bodies and can slowly produce problems that may not show symptoms. What we eat, how we sit, the work that we do with our bodies, and even the way we emotionally react to a situation, can have long-term impacts on our wellness. If you spend your days sitting at a desk, the way you hold your head or place your arms can have a major impact, not only on your neck and shoulders, but also on your whole body. This is because the bundle of nerves that sends messages to every other part of our body, originates in our spinal column. When vertebrae become misaligned there are dozens of possible impacts upon our health. This also goes for how we hold emotions in the body. If we are chronically tensing our shoulders due to stress or anxiety, this can once again impact the spine and the rest of the body. As you can see, even if we don’t feel sick, we may be in need of a little extra care to prevent daily activities from becoming more severe problems.",
          imageKey: "wellness2",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "Why We Need Wellness Care",
          text: "Health can be defined as the body functioning properly rather than just feeling good. You may not feel sick today, but if your nervous system is being impeded from sending messages to other organs and systems in the body, things may not be working as well as they could be. Through a regular wellness care program that works to restore spinal health and mobility, people often find that they have more energy and do not get sick as often. When the nervous system is functioning properly, the benefits are endless.",
          imageKey: "wellness3",
        },
      },
      {
        type: "content",
        order: 5,
        content: {
          title: "Chiropractic Treatment As Part Of A Wellness Care Plan",
          text: "Chiropractic treatments work to keep the integrity of the nervous system intact and are an excellent choice as a part of a wellness care plan. Regular, gentle adjustments can ensure that the daily impacts of your life are not wearing your health down over time. By performing a thorough evaluation of your health history and current physical state, a chiropractor can help you detect problems before they develop into a more serious issue, keeping you at peak function and feeling great. Call to set up a consultation with our team at Tatum Chiropractic and Wellness and start on the path of chiropractic wellness care today.",
          imageKey: "wellness4",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "tmj-and-chiropractic-treatment",
    title: "TMJ and Chiropractic treatment",
    meta_title: "TMJ and Chiropractic treatment | Tatum Wellness",
    meta_description: "Non-surgical TMJ treatment with chiropractic care in Cave Creek.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "TMJ and Chiropractic treatment",
          subtitle: "Non-invasive TMJ care that helps restore jaw function and relieve pain.",
          imageKey: "tmj1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Chiropractic Care for TMJ Patients in Cave Creek, AZ",
          text: "According to the TMJ Association, an estimated 12 percent of Americans are impacted by TMJ disorder at any time. The condition contributes to pain and discomfort centered within the jaw and can bring about other issues like chronic headaches. When you feel that dental treatment isn’t getting you anywhere to relieve your distress, or if surgery scares you, you can consider a TMJ chiropractor near you. At Tatum Chiropractic and Wellness, we provide all-natural treatments to let you reestablish a pain-free jaw function. We provide TMJ chiropractic adjustment near you.",
          imageKey: "tmj1",
        },
      },
      {
        type: "content",
        order: 3,
        content: {
          title: "How Does TMJ Impact Your Life?",
          text: "Before you even see a chiropractor specializing in TMJ near you at Tatum Chiropractic and Wellness, it is prudent to understand how TMJ impacts your health and life. The temporomandibular joint controls a range of movements and motions. It allows the jaw to slide from side to side, back, and forward. The joint also opens and closes the complex motions needed for chewing and talking. Different things can cause the joint to malfunction. For instance, a blow to your face can cause the joint to be misaligned. The cartilaginous disc within the joint can also erode due to degeneration associated with aging. Mostly, bruxism of grinding and clenching of the jaw can result in TMJ.",
          imageKey: "tmj2",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "Effective, Surgery-Free Treatment for TMJ",
          text: "Some cases of TMJ may not be resolved with dental treatment. Therefore, a different approach is needed. Surgery may also come as a last resort. Our TMJ chiropractor in Cave Creek, AZ, can evaluate the function and position of your jaw joint and your symptoms. We also check your medical history and develop a drug-free, surgery-free treatment. Gentle chiropractic TMJ adjustment can help with jaw subluxation, helping restore the joint components to their alignment. Again, massage therapy can help relax chronically tense or strained jaw and neck muscles, thus helping to relieve TMJ symptoms. Our chiropractor may also recommend lifestyle changes to help ease stress, which is considered a common culprit for bruxism. You will notice the difference between our TMJ chiropractor’s before and after treatment results.",
          imageKey: "tmj4",
        },
      },
      {
        type: "content",
        order: 5,
        content: {
          title: "Benefits of Chiropractic Care for TMJ",
          text: "Chiropractic care is a non-invasive, natural approach to the treatment of TMJ. A patient doesn’t have to undergo surgery, which may cause complications. Also, patients don’t have to rely on medications to stop pain or ease muscle tension and stress. Medication dependency can contribute to many other problems, such as drug addiction. Seek a chiropractor for TMJ pain near you and see the results before and after treatment.",
          imageKey: "tmj5",
          reverse: true,
        },
      },
      {
        type: "content",
        order: 6,
        content: {
          title: "Schedule An Appointment with Us!",
          text: "We can help you or a family member triumph over TMJ symptoms. Talk with our chiropractor for TMJ treatment near you, or seek TMJ headache treatment in Cave Creek, AZ, with chiropractic care. Contact our TMJ treatment chiropractor at Tatum Chiropractic and Wellness to make your appointment today to ease and manage your TMJ symptoms and improve your quality of life.",
          imageKey: "tmj6",
        },
      },
    ],
  },
  {
    slug: "piezowave-2",
    title: "Discover Effective Piezowave Treatments",
    meta_title: "Discover Effective Piezowave Treatments | Tatum Wellness",
    meta_description: "Discover how Piezowave therapy treats wrist, elbow, shoulder, back, knee, and ankle pain.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Discover Effective Piezowave Treatments",
          subtitle: "Acoustic wave therapy to reduce pain, accelerate healing, and restore mobility.",
          imageKey: "leg1",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Discover Effective Piezowave Treatments",
          text: "Tatum Chiropractic and Wellness offers cutting-edge Piezowave treatments designed to alleviate a range of painful conditions. This advanced therapy uses acoustic waves to stimulate healing and provide relief naturally.",
          imageKey: "leg1",
        },
      },
      {
        type: "grid",
        order: 3,
        content: {
          title: "Conditions Treated with Piezowave",
          cards: [
            { title: "Wrist Pain", text: "Wrist pain, often from repetitive strain or conditions like carpal tunnel syndrome, finds relief with Piezowave therapy.", imageKey: "backpain" },
            { title: "Elbow Pain", text: "Conditions including tennis elbow or golfer’s elbow respond well to Piezowave therapy.", imageKey: "elbow" },
            { title: "Shoulder Pain", text: "Shoulder injuries respond well to Piezowave therapy, which reduces inflammation and improves mobility.", imageKey: "shoulder3" },
            { title: "Back Pain", text: "Chronic back pain, including muscle strain or sciatica, can benefit from Piezowave therapy.", imageKey: "backpain2" },
            { title: "Knee Pain", text: "Piezowave therapy addresses knee pain from arthritis, tendinitis, or injuries.", imageKey: "leg2" },
            { title: "Ankle Pain", text: "Ankle injuries such as sprains or Achilles tendinitis find relief with Piezowave therapy.", imageKey: "work2" },
          ],
        },
      },
      {
        type: "content",
        order: 4,
        content: {
          title: "Plantar Fasciitis",
          text: "Piezowave therapy is highly effective for plantar fasciitis, a common cause of heel pain. By targeting the inflamed tissue, it reduces pain and accelerates healing, allowing for improved movement and comfort. Experience the benefits of Piezowave therapy at Tatum Chiropractic and Wellness. Our non-invasive approach helps you regain a pain-free lifestyle and optimal mobility. Contact us today to schedule your appointment and start your journey toward relief and recovery.",
          imageKey: "leg2",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "meet-the-team",
    title: "Meet The Team",
    meta_title: "Meet The Team | Tatum Wellness",
    meta_description: "Meet the chiropractic and massage therapy team at Tatum Wellness.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Meet The Team",
          subtitle: "Get to know the Tatum Chiropractic team and their dedication to patient wellness.",
          imageKey: "jessica-fields",
        },
      },
      {
        type: "team",
        order: 2,
        content: {
          members: [
            { name: "Jessica Fields", imageKey: "jessica-fields", designation: "Chiropractor", description: "Jessica Fields was born in Illinois... Jessica’s family has four generations of Chiropractors.", readMorePath: "/jessica-fields" },
            { name: "Angela Ajamie", imageKey: "angela-ajamie", designation: "Massage Therapist LMT", description: "Angela Ajamie, LMT, has been practicing massage for over 25 years. Her journey began when she decided she needed a career change from a desk job to a life of helping others through therapeutic touch.", readMorePath: "/angela-ajamie" },
          ],
        },
      },
    ],
  },
  {
    slug: "jessica-fields",
    title: "Jessica Fields",
    meta_title: "Jessica Fields | Tatum Wellness",
    meta_description: "Learn about Jessica Fields, a chiropractor with a family legacy of care and a passion for holistic health.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Jessica Fields",
          subtitle: "A fourth generation chiropractor with deep family roots in wellness.",
          imageKey: "jessica-fields",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Chiropractic Care For Vertigo",
          text: "Jessica Fields was born in Illinois. She moved to Arizona in 1990, from Davenport, IA, after her Mother completed Palmer College of Chiropractic. Jessica’s family has four generations of Chiropractors. Jessica is married and has two children. She teaches and practices hot flow yoga and hot pilates. Jessica enjoys traveling and spending time with her family and friends.",
          imageKey: "jessica-fields",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "angela-ajamie",
    title: "Angela Ajamie",
    meta_title: "Angela Ajamie | Tatum Wellness",
    meta_description: "Meet Angela Ajamie, a licensed massage therapist with 25 years of experience.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Angela Ajamie",
          subtitle: "Licensed massage therapist with extensive experience supporting chiropractic care.",
          imageKey: "angela-ajamie",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Massage Therapist LMT",
          text: "Angela Ajamie, LMT, has been practicing massage for over 25 years. Her journey began when she decided she needed a career change from a desk job to a life of helping others through therapeutic touch. Angela became accustomed to working with Chiropractors over the years helping individuals with head and neck pain. She believes strongly in the benefits of incorporating massage therapy with Chiropractic adjustments. Together, massage and Chiropractic adjustments are complementary at helping to relax tense muscles making adjustments easier and more effective. This holistic approach helps the body heal by increasing circulation within the tissues and improving structural alignment. Angela’s massage modalities include neuromuscular trigger point, lymphatic massage, Myofascial Release Therapy (MFR), and Swedish massage. Every massage client receives an individualized treatment according to their needs. When not practicing massage therapy, Angela enjoys spending time with her husband and two children.",
          imageKey: "angela-ajamie",
        },
      },
    ],
  },
  {
    slug: "gallery",
    title: "Gallery",
    meta_title: "Gallery | Tatum Wellness",
    meta_description: "Browse our Tatum Wellness gallery of clinic images and patient care environments.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Gallery",
          subtitle: "A visual tour of Tatum Chiropractic and Wellness in Cave Creek.",
          imageKey: "gallery-1",
        },
      },
      {
        type: "gallery",
        order: 2,
        content: {
          title: "Clinic Gallery",
          images: ["gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5", "gallery-6"],
        },
      },
    ],
  },
  {
    slug: "blogs",
    title: "Blogs",
    meta_title: "Blogs | Tatum Wellness",
    meta_description: "Read the latest chiropractic health and wellness articles from Tatum Wellness.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Blogs",
          subtitle: "Read our latest articles on chiropractic care, wellness tips, and patient stories.",
          imageKey: "blog-1",
        },
      },
      {
        type: "blogList",
        order: 2,
        content: {
          title: "Latest Articles",
          postSlugs: ["chiropractic-care-for-whole-body-health", "how-effective-is-chiropractic-care-in-treating-headaches", "back-pain-diagnosis-and-treatment"],
        },
      },
    ],
  },
  {
    slug: "contact-us",
    title: "Contact Us",
    meta_title: "Contact Us | Tatum Wellness",
    meta_description: "Get in touch with Tatum Wellness for appointments, questions, and patient support.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Contact Us",
          subtitle: "Message us or book your appointment with Tatum Wellness in Cave Creek.",
          imageKey: "contact-us",
        },
      },
      {
        type: "contact",
        order: 2,
        content: {
          heading: "Contact Us For More Info",
          description: "Send us a message or use the phone, email, and address information to get in touch with our clinic.",
        },
      },
    ],
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    meta_title: "Testimonials | Tatum Wellness",
    meta_description: "Read patient testimonials and success stories from Tatum Chiropractic and Wellness.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Testimonials",
          subtitle: "Patient stories from the Tatum Chiropractic and Wellness community.",
          imageKey: "gallery-2",
        },
      },
      {
        type: "content",
        order: 2,
        content: {
          title: "Patient Success Stories",
          text: "Our patients often tell us that they feel more mobile, less painful, and more energized after care. Testimonials are being collected and will appear here to help you learn more about our approach.",
          imageKey: "gallery-3",
          reverse: true,
        },
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    meta_title: "Privacy Policy | Tatum Wellness",
    meta_description: "Read our privacy policy and HIPAA notice for protected health information.",
    sections: [
      {
        type: "hero",
        order: 1,
        content: {
          title: "Privacy Policy",
          subtitle: "How Tatum Chiropractic and Wellness protects your health information.",
          imageKey: "gallery-4",
        },
      },
      {
        type: "richText",
        order: 2,
        content: {
          title: "Notice of Privacy Practices",
          text: "This Privacy Policy covers services provided to you by our office. By law, we are required to maintain the privacy of protected health information and to provide you with the policy of our legal duties and privacy practices with respect to protected health information. Protected health information consists of information about you that may identify you and that relates to your past, present, or future physical or mental health or condition.",
          sections: [
            {
              heading: "Uses and Disclosures of Protected Health Information",
              body: "Your protected health information may be used by your doctor for treatment, payment, and health care operations as described here without authorization from you. It may be used and disclosed by your doctor, the office staff, and others outside our office who are involved in your care and treatment for the purpose of providing health care services to you and to pay your health care bills."
            },
          ],
        },
      },
    ],
  },
];

const blogPosts = [
  {
    title: "Chiropractic Care for Whole Body Health",
    slug: "chiropractic-care-for-whole-body-health",
    excerpt: "If you’ve never considered chiropractic care as an integral part of your mind and body health connection, this article explains how it supports whole-body health.",
    content: "Chiropractic care provides relief from muscle tension and improves sleep, digestion, circulation, cognition, and recovery. When the underlying cause of the ache or pain is addressed through holistic chiropractic care, improved sleep comes more naturally.",
    featured_image_key: "blog-1",
    tags: ["chiropractic", "wellness", "health"],
    published_at: "2025-03-15",
  },
  {
    title: "How Effective Is Chiropractic Care In Treating Headaches?",
    slug: "how-effective-is-chiropractic-care-in-treating-headaches",
    excerpt: "Many people turn to chiropractic care for headaches and migraines when medication alone is not enough.",
    content: "Chiropractic care addresses structural causes of headache pain and provides lasting relief by correcting spinal misalignment rather than masking symptoms.",
    featured_image_key: "blog-2",
    tags: ["headache", "chiropractic", "pain-relief"],
    published_at: "2025-03-10",
  },
  {
    title: "Back Pain Diagnosis and Treatment",
    slug: "back-pain-diagnosis-and-treatment",
    excerpt: "Back pain can often be traced to disc, nerve, or alignment issues that respond well to chiropractic treatment.",
    content: "Many cases of back pain can be treated without surgery by identifying the source of discomfort and applying gentle, targeted chiropractic adjustments.",
    featured_image_key: "blog-3",
    tags: ["back-pain", "wellness", "chiropractic"],
    published_at: "2025-03-05",
  },
];

// Services data - hierarchical structure
const services = [
  // Parent services (top-level navigation)
  {
    title: "Spine Related",
    slug: "spine-related",
    description: "Chiropractic care for spine-related conditions including back pain, neck pain, and more.",
    content: "Spine-related conditions are among the most common reasons patients seek chiropractic care. Our experienced team provides comprehensive evaluation and treatment for various spinal issues.",
    featured_image: "backpain",
    parent_id: null,
    order: 1,
    status: "Published",
    meta_title: "Spine Related Services | Tatum Wellness",
    meta_description: "Comprehensive chiropractic care for spine-related conditions including back pain, neck pain, herniated discs, and more.",
    is_featured: true,
  },
  {
    title: "Injuries",
    slug: "injuries",
    description: "Specialized care for personal injuries including disc injuries, whiplash, and work-related injuries.",
    content: "We provide expert care for various types of injuries, helping patients recover quickly and safely through targeted chiropractic treatments.",
    featured_image: "disc1",
    parent_id: null,
    order: 2,
    status: "Published",
    meta_title: "Injury Treatment & Recovery | Tatum Wellness",
    meta_description: "Specialized chiropractic care for disc injuries, whiplash, work injuries, and other personal injuries.",
    is_featured: true,
  },
  {
    title: "Chiropractic Care",
    slug: "chiropractic-care",
    description: "General chiropractic services for wellness, preventive care, and specific conditions.",
    content: "Chiropractic care focuses on the relationship between the spine and the nervous system, providing natural healing for various health conditions.",
    featured_image: "chiro-img",
    parent_id: null,
    order: 3,
    status: "Published",
    meta_title: "Chiropractic Care Services | Tatum Wellness",
    meta_description: "Comprehensive chiropractic care services including wellness care, pediatric chiropractic, and pregnancy chiropractic.",
    is_featured: true,
  },
  {
    title: "Other Services",
    slug: "other-services",
    description: "Additional specialized treatments including TMJ care and advanced therapies.",
    content: "Beyond traditional chiropractic care, we offer specialized treatments to address specific conditions and enhance overall wellness.",
    featured_image: "tmj1",
    parent_id: null,
    order: 4,
    status: "Published",
    is_featured: true,
  },
  // Spine Related children
  {
    title: "Back Pain",
    slug: "back-pain",
    description: "Comprehensive care for acute and chronic back pain, disc bulges, and spinal issues.",
    content: "If you are living with chronic back pain, chiropractic care in Cave Creek might be a good treatment option. We provide thorough assessment and personalized treatment plans.",
    featured_image: "backpain",
    parent_id: 1, // Spine Related
    order: 1,
    status: "Published",
    meta_title: "Back Pain Treatment | Tatum Chiropractic",
    meta_description: "Effective back pain treatment in Cave Creek, AZ. We treat disc bulges, herniations, strains, and chronic back pain.",
    is_featured: true,
    sections: [
      {
        title: "Chiropractic Care in Cave Creek, AZ",
        image: "backpain1",
        content: "If you are living with chronic back pain, then chiropractic care in Cave Creek might be a good treatment option. Almost everyone will experience some form of back pain, ranging from slightly irritating to completely crippling, in their lifetime. Whatever the degree of pain you are experiencing and whether it is acute or has become chronic, at the very least, you would probably rather live without it. In the most extreme cases, it can be difficult to go on living with it. This article aims to help you to understand what causes lower back pain, and how chiropractic treatment can help you achieve lasting back health so that you can go on enjoying those walks in the park."
      },
      {
        title: "Back Pain In Cave Creek",
        image: "backpain2",
        content: "The back is a broad term that covers a large area of the body. It is made up of many tendons, ligaments, discs, muscles, and bones. Without a solid understanding of these different parts, it can be complicated to locate and address the source of the pain. The following explains some of the most common issues and their identifying features. It also explains how chiropractic medicine can help to resolve them. This is a general guideline to help you in your quest for effective treatment, but we highly recommend that you seek a professional opinion to properly diagnose these issues."
      },
      {
        title: "Disc Bulges And Herniations",
        image: "backpain3",
        content: "Disc bulges and herniations are conditions in which the outer edges of the discs, located between the vertebrae, are damaged. This causes the jelly-like center to bulge or become pushed out. This is a surprisingly common issue, and it is often, but not always, very painful. Many people who have this condition feel nothing at all. The quality and intensity of it, for those who experience pain, depends on the type and position of the herniation. If the damaged disc is irritating, a surrounding nerve, shooting, or stabbing pain along with weakness in the legs is often severe.<br /><br />It is important that this issue is properly identified and promptly treated to avoid further damage. A chiropractor in Cave Creek will thoroughly assess your back to determine the extent of the issue and the appropriate treatment to prevent worsening of the herniation, and provide relief from the associated pain."
      },
      {
        title: "Subluxations",
        image: "backpain4",
        content: "Subluxation is a medical term describing a misalignment in the vertebral column. There are a wide variety of causes, including physical stress, trauma, and toxins. Subluxations are often quite painful and can disrupt normal movement. Subluxations are one of the most commonly overlooked contributors to back pain. Chiropractors are trained to identify and correct this issue using non-invasive adjustment techniques."
      },
      {
        title: "Muscular Sprains And Tendon Or Ligament Strains",
        image: "backpain5",
        content: "Strains and sprains most typically occur when we engage in tasks that our body is not accustomed to, or when we are involved in an accident. Lifting while twisting or stretching past one’s limits are common causes to strains and sprains of the back. These can be extremely painful and are often accompanied by swelling and bruising of the surrounding area. Strains and sprains in the back tend to involve changes to the alignment of the spine and typically respond well to chiropractic care."
      },
      {
        title: "Stress And Back Pain",
        image: "backpain6",
        content: "Chronic stress wreaks havoc on the body and can eventually lead to hyper-tension and chronic back pain. The back pain is a result of tension and muscle spasms that occur when stress hormones are released. The tension will often accumulate in what is referred to as trigger points. These trigger points can be extremely painful and need professional attention to resolve. Chiropractors have the knowledge and tools to relieve stress from trigger points and to deal with underlying nervous system imbalances that may be keeping your body locked in patterns of stress and pain."
      },
      {
        title: "Other Issues That Cause Back Pain",
        image: "backpain7",
        content: "Conditions such as obesity, arthritis, kidney stones, and urinary tract infections have been shown to cause symptoms of lower back pain. These are all serious issues that need to be identified and treated immediately to avoid long-term health issues. Cave Creek chiropractic doctors are trained to identify these issues and support you in getting the appropriate treatment. Many of these issues can have their source in spinal misalignments and respond well to chiropractic adjustments.<br /><br />If you have questions about how our team at Tatum Chiropractic and Wellness can help you, please schedule a consultation today."
      }
    ]
  },
  {
    title: "Neck Pain",
    slug: "neck-pain",
    description: "Relief from neck pain, stiffness, and related symptoms through gentle adjustments.",
    content: "Neck pain can be debilitating. Our chiropractors use proven techniques to relieve pain and restore mobility to your neck and upper back.",
    featured_image: "neckpain",
    parent_id: 1,
    order: 2,
    status: "Published",
    meta_title: "Neck Pain Treatment | Tatum Chiropractic",
    meta_description: "Professional neck pain treatment in Cave Creek, AZ. Get relief from stiffness, pain, and limited mobility.",
    is_featured: true,
  },
  {
    title: "Headache & Migraine",
    slug: "headache-migraine",
    description: "Natural headache and migraine relief through chiropractic care.",
    content: "Headaches are not fun, and migraines are another level of awful. Chiropractic care addresses the root cause rather than just masking symptoms.",
    featured_image: "headache",
    parent_id: 1,
    order: 3,
    status: "Published",
    meta_title: "Headache & Migraine Treatment | Tatum Chiropractic",
    meta_description: "Natural headache and migraine treatment in Cave Creek, AZ without medication.",
    is_featured: true,
  },
  {
    title: "Sciatica",
    slug: "sciatica",
    description: "Treatment for sciatica pain radiating from the back down to the legs.",
    content: "If you are experiencing pain that radiates from the back or buttocks all the way down the legs, you may have a common condition called sciatica that responds well to chiropractic care.",
    featured_image: "scartica",
    parent_id: 1,
    order: 4,
    status: "Published",
    meta_title: "Sciatica Treatment | Tatum Chiropractic",
    meta_description: "Effective sciatica pain relief in Cave Creek, AZ. Get treatment for radiating leg pain.",
    is_featured: true,
  },
  {
    title: "Scoliosis",
    slug: "scoliosis",
    description: "Evaluation and management of scoliosis in patients of all ages.",
    content: "Scoliosis treatment requires expertise. Our chiropractors are trained and experienced in treating scoliosis in Cave Creek, AZ patients.",
    featured_image: "scoliosis",
    parent_id: 1,
    order: 5,
    status: "Published",
    meta_title: "Scoliosis Treatment | Tatum Chiropractic",
    meta_description: "Scoliosis evaluation and management in Cave Creek, AZ for all ages.",
    is_featured: true,
  },
  {
    title: "Vertigo",
    slug: "vertigo",
    description: "Chiropractic care for vertigo and balance disorders.",
    content: "Vertigo can literally turn your life upside down. Many people with vertigo seek out a Cave Creek chiropractor and find significant improvement.",
    featured_image: "vertigo",
    parent_id: 1,
    order: 6,
    status: "Published",
    meta_title: "Vertigo Treatment | Tatum Chiropractic",
    meta_description: "Vertigo and dizziness treatment through chiropractic care in Cave Creek, AZ.",
    is_featured: true,
  },
  // Injuries children
  {
    title: "Disc Injury",
    slug: "disc-injury",
    description: "Expert disc injury treatment for bulges, herniations, and degenerations.",
    content: "Are you in North Scottsdale looking for disc injury treatment near you? Dr. Lind and his team have the experience to provide optimum disc injury treatment.",
    featured_image: "disc1",
    parent_id: 2, // Injuries
    order: 1,
    status: "Published",
    meta_title: "Disc Injury Treatment | Tatum Chiropractic",
    meta_description: "Professional disc injury treatment in Cave Creek, AZ for herniated, bulging, or degenerated discs.",
    is_featured: true,
    sections: [
      {
        title: "Disc Injury Treatment in Cave Creek, AZ",
        image: "disc1",
        content: "Are you in North Scottsdale, and you’re looking for disc injury treatment near you from a top-rated wellness and chiropractic clinic in Cave Creek, AZ? If so, you’ll be happy to read that whether your pain is mild or severe, Dr. Lind and his team have the experience, skills, and equipment that’s required to provide optimum disc injury treatment near you."
      },
      {
        title: "Not Sure if You Have a Disc Injury?",
        image: "disc2",
        content: "Some of the symptoms you may notice that signal a disc injury include back pain, neck pain, weakness in your legs or feet, pain and/or numbness in your legs and feet, as well as the loss of bladder or bowel control.<br /><br />Our chiropractor in Cave Creek, AZ, will be able to diagnose whether you’re experiencing a disc injury through a series of techniques, including physical palpation, movement tests, muscle strength tests, and other tests that utilize state-of-the-art equipment.<br /><br />The key to relief from your disc injury is to seek treatment promptly so the condition can be stabilized and relief from pain administered. At Tatum Chiropractic and Wellness, your disc injury assessment will involve a thorough understanding of any event that may have led to the injury (such as a car accident or a fall at work or school), your medical history, x-rays if needed, and a physical examination to determine the extent of the disc injury and the appropriate treatment protocol to provide pain relief and recovery.<br /><br />In some cases, patients will experience relief from their symptoms after one visit; however, if it’s determined that your disc injury treatment requires a series of appointments to achieve complete recovery, our approach to your treatment will be tailored to your exact area of need and recovery goals."
      },
      {
        title: "Our Goal for Your Disc Injury Treatment",
        image: "disc3",
        content: "As one of the highest-rated chiropractic clinics near you, the goal of our chiropractor in Cave Creek, AZ, is to help you reclaim a life that’s pain-free and fully mobile. Whether your disc disorder is diagnosed as a protruding disc, a herniated disc, or a disc extrusion, the chiropractic care you’ll receive from our team is always tailored to your specific area of need using the gentlest techniques available in modern chiropractic care."
      },
      {
        title: "Make an Appointment Today for Disc Injury Treatment Near You",
        image: "disc4",
        content: "Whether you’re seeking chiropractic care for disc injury treatment, general back or neck pain, or any of the other wide range of treatments we provide at Tatum Chiropractic and Wellness, we invite you to make an appointment today to experience the top-rated holistic care provided by our chiropractor near you."
      }
    ]
  },
  {
    title: "Whiplash",
    slug: "whiplash",
    description: "Whiplash injury treatment following auto accidents or trauma.",
    content: "Whiplash can cause acute pain and long-term issues if not treated properly. We provide comprehensive care for whiplash injuries.",
    featured_image: "whiplash1",
    parent_id: 2,
    order: 2,
    status: "Published",
    is_featured: false,
  },
  {
    title: "Work Injury",
    slug: "work-injury",
    description: "Chiropractic care for workplace injuries and occupational health.",
    content: "Work-related injuries require prompt attention. We help patients recover from workplace injuries and return to work safely.",
    featured_image: "work1",
    parent_id: 2,
    order: 3,
    status: "Published",
    is_featured: false,
  },
  // Chiropractic Care children
  {
    title: "Chiropractic Care for Kids",
    slug: "chiropractic-care-for-kids",
    description: "Gentle pediatric chiropractic care to support development.",
    content: "A child's nervous system is the controller of all other systems. Stress and misalignment can impact overall health, behavior, and development.",
    featured_image: "kid1",
    parent_id: 3,
    order: 1,
    status: "Published",
    meta_title: "Pediatric Chiropractic | Tatum Chiropractic",
    meta_description: "Gentle pediatric chiropractic care in Cave Creek, AZ to support child development.",
    is_featured: true,
    sections: [
      {
        title: "Chiropractic Care for Kids in Cave Creek, AZ",
        image: "kid1",
        content: "A child’s nervous system is the controller and regulator of all the other systems in their growing body. From blood flow to brain function and bone growth, the nervous system plays a central role in keeping things working and healthy. Stress and misalignment of the spine can have serious impacts on your child’s overall health, behavior, and development.<br /><br /><strong>Tatum Chiropractic and Wellness is a chiropractic clinic</strong> that offers gentle and non-invasive therapy that works to correct underlying issues before they become hard-wired in during development, providing support for a pain-free and successful childhood."
      },
      {
        title: "Pediatric Chiropractic In Cave Creek",
        image: "kid2",
        content: "It may be difficult to imagine that a child would need chiropractic care. They seldom complain of chronic pain the way adults do, and their bodies appear to be made of rubber in the way they bounce back from injury. The truth is, children’s bodies are under a lot of stress while they are in a state of development, and keeping them healthy requires maintenance.<br /><br />Stress and trauma to the body and spine commonly begin with the birthing process. Infant’s spines can easily become misaligned from the intense pressure involved in both natural and Cesarean births. Unfortunately, other than crying, they have no way of communicating their pain, and it’s the source to us.<br /><br />Throughout infancy, they may sleep in awkward positions and occasionally take a tumble. As children, they grow into toddlers who strain and twist, and fall, while learning to crawl and walk. Luckily, they are very resilient and can take a lot of impacts, but it is not uncommon for these injuries to develop into patterns of movement that will pull a child’s bones out of alignment over time."
      },
      {
        title: "How Can I Tell If My Child Needs Chiropractic Care?",
        image: "kid3",
        content: "As kids, they may start to develop bad posture. Sitting in front of a computer or TV can have serious repercussions on the spine. Playing contact sports, wearing heavy backpacks (most likely the wrong way), and even sitting in desks can all cause issues. As teenagers, they begin to deal with the stress of more daily responsibilities, like becoming part of the workforce and use their bodies to perform physical labor such as painting houses and serving tables.<br /><br />As you can see, there are plenty of opportunities throughout development for a child’s body, and particularly their spine, to become out of alignment, which will affect other aspects of their healthy nervous system function and development."
      },
      {
        title: "How Can I Tell If My Child Needs Chiropractic Care?",
        image: "kid4",
        content: "A child’s spine can become quite misaligned without any awareness on their part of pain or discomfort. Children have not always developed enough awareness of their bodies to identify a subtle chronic issue developing. Even when a child is experiencing pain, they may not be able to communicate it to you, and it can come across as grumpiness, acting out, or incessant crying. Issues with the spine can also be the source of many other childhood issues."
      },
      {
        title: "What Is Chiropractic Care For Kids?",
        image: "kid5",
        content: "A chiropractic treatment for a child begins with an extensive examination to determine the exact issue and the best route for treatment. Even if your child is too young to communicate or too shy, a chiropractor has the skills to work with them to find out exactly what is going on before proceeding with treatment; if it is determined that treatment is needed. Gentle and non-invasive adjustments are then made to the spine. Children will often become relaxed and even fall asleep following treatment, a good sign that it has been effective. If you are concerned about your child’s spinal health, call our team at Tatum Chiropractic and Wellness to set up a consultation today."
      }
    ]
  },
  {
    title: "Pregnancy Chiropractic Care",
    slug: "pregnancy-chiropractic-care",
    description: "Safe prenatal chiropractic care to support pregnancy comfort.",
    content: "Pregnancy chiropractic care helps reduce pain, improve comfort, and support prenatal wellness through natural, safe adjustments.",
    featured_image: "pregnancy1",
    parent_id: 3,
    order: 2,
    status: "Published",
    meta_title: "Pregnancy Chiropractic | Tatum Chiropractic",
    meta_description: "Safe, prenatal chiropractic care in Cave Creek to reduce pain and improve comfort during pregnancy.",
    is_featured: true,
  },
  {
    title: "Wellness Care",
    slug: "wellness-care",
    description: "Preventive spinal care and wellness plans for long-term health.",
    content: "Wellness care focuses on prevention, alignment, and optimal long-term health through regular chiropractic adjustments and lifestyle guidance.",
    featured_image: "wellness1",
    parent_id: 3,
    order: 3,
    status: "Published",
    meta_title: "Wellness Care | Tatum Chiropractic",
    meta_description: "Preventive spinal care and wellness plans in Cave Creek, AZ for optimal long-term health.",
    is_featured: true,
  },
  // Other Services children
  {
    title: "TMJ and Chiropractic Treatment",
    slug: "tmj-and-chiropractic-treatment",
    description: "Non-surgical TMJ treatment with chiropractic care.",
    content: "TMJ disorder affects many people. Our non-invasive chiropractic approach helps restore jaw function and relieve pain without surgery.",
    featured_image: "tmj1",
    parent_id: 4,
    order: 1,
    status: "Published",
    meta_title: "TMJ Treatment | Tatum Chiropractic",
    meta_description: "Non-surgical TMJ treatment with chiropractic care in Cave Creek, AZ for jaw pain relief.",
    is_featured: true,
    sections: [
      {
        title: "Chiropractic Care for TMJ Patients in Cave Creek, AZ",
        image: "tmj1",
        content: "According to the TMJ Association, an estimated 12 percent of Americans are impacted by TMJ disorder at any time. The condition contributes to pain and discomfort centered within the jaw and can bring about other issues like chronic headaches.<br /><br />When you feel that dental treatment isn’t getting you anywhere to relieve your distress, or if surgery scares you, you can consider a TMJ chiropractor near you. At Tatum Chiropractic and Wellness, we provide all-natural treatments to let you reestablish a pain-free jaw function. We provide TMJ chiropractic adjustment near you."
      },
      {
        title: "How Does TMJ Impact Your Life?",
        image: "tmj2",
        content: "Before you even see a chiropractor specializing in TMJ near you at Tatum Chiropractic and Wellness, it is prudent to understand how TMJ impacts your health and life.<br /><br />The temporomandibular joint controls a range of movements and motions. It allows the jaw to slide from side to side, back, and forward. The joint also opens and closes the complex motions needed for chewing and talking.<br /><br />Different things can cause the joint to malfunction. For instance, a blow to your face can cause the joint to be misaligned. The cartilaginous disc within the joint can also erode due to degeneration associated with aging. Mostly, bruxism of grinding and clenching of the jaw can result in TMJ."
      },
      {
        title: "Symptoms of TMJ",
        image: "tmj3",
        content: "TMJ can badly influence your quality of life, thus the need to see a chiropractor or specialist near you for help. A patient with TMJ shows symptoms like:<ul><li>Difficulties opening the mouth normally</li><li>Extreme pain when moving the jaw</li><li>Jaw stiffness</li><li>Facial pain and fatigue</li><li>Facial swelling</li><li>Clicking or popping sounds within the joint</li><li>Neck, shoulder, or ear pain</li></ul>Whenever you have any of these symptoms, seek a chiropractor for TMJ near you at Tatum Chiropractic and Wellness to receive TMJ symptoms treatment."
      },
      {
        title: "Effective, Surgery-Free Treatment for TMJ",
        image: "tmj4",
        content: "Some cases of TMJ may not be resolved with dental treatment. Therefore, a different approach is needed. Surgery may also come as a last resort. Our TMJ chiropractor in Cave Creek, AZ, can evaluate the function and position of your jaw joint and your symptoms. We also check your medical history and develop a drug-free, surgery-free treatment.<br /><br />Gentle chiropractic TMJ adjustment can help with jaw subluxation, helping restore the joint components to their alignment. Again, massage therapy can help relax chronically tense or strained jaw and neck muscles, thus helping relieve TMJ symptoms.<br /><br />Our chiropractor may also recommend lifestyle changes to help ease stress, which is considered a common culprit for bruxism. You will notice the difference between our TMJ chiropractor’s before and after treatment results."
      },
      {
        title: "Benefits of Chiropractic Care for TMJ",
        image: "tmj5",
        content: "Chiropractic care is a non-invasive, natural approach to the treatment of TMJ. A patient doesn’t have to undergo surgery, which may cause complications. Also, patients don’t have to rely on medications to stop pain or ease muscle tension and stress. Medication dependency can contribute to many other problems, such as drug addiction. Seek a chiropractor for TMJ pain near you and see the results before and after treatment."
      },
      {
        title: "Schedule An Appointment with Us!",
        image: "tmj6",
        content: "We can help you or a family member triumph over TMJ symptoms. Talk with our chiropractor for TMJ treatment near you, or seek TMJ headache treatment in Cave Creek, AZ, with chiropractic care. Contact our TMJ treatment chiropractor at Tatum Chiropractic and Wellness to make your appointment today to ease and manage your TMJ symptoms and improve your quality of life."
      }
    ]
  },
  {
    title: "Piezowave 2",
    slug: "piezowave-2",
    description: "Advanced acoustic wave therapy for pain relief and healing.",
    content: "Piezowave uses acoustic waves to stimulate healing and provide natural relief for a variety of painful conditions.",
    featured_image: "leg1",
    parent_id: 4,
    order: 2,
    status: "Published",
    meta_title: "Piezowave Therapy | Tatum Chiropractic",
    meta_description: "Discover effective Piezowave treatments for wrist, elbow, shoulder, back, knee, and ankle pain.",
    is_featured: true,
    sections: [
      {
        title: "Discover Effective Piezowave Treatments",
        image: "leg1",
        content: "Tatum Chiropractic and Wellness offers cutting-edge Piezowave treatments designed to alleviate a range of painful conditions. This advanced therapy uses acoustic waves to stimulate healing and provide relief naturally. Here are the conditions we effectively treat with Piezowave therapy:"
      },
      {
        title: "Conditions Treated",
        image: "leg2",
        content: "<ul><li>Wrist Pain: Relief for carpal tunnel and strain.</li><li>Elbow Pain: Treatment for tennis and golfer's elbow.</li><li>Shoulder Pain: Improve mobility and reduce inflammation.</li><li>Back Pain: Relax muscle tension and alleviate nerve irritation.</li><li>Knee Pain: Effective for arthritis and injuries.</li><li>Ankle Pain: Promotes faster healing for sprains and tendinitis.</li></ul>"
      },
      {
        title: "Plantar Fasciitis",
        image: "leg2",
        content: "Piezowave therapy is highly effective for plantar fasciitis, a common cause of heel pain. By targeting the inflamed tissue, it reduces pain and accelerates healing, allowing for improved movement and comfort.<br /><br />Experience the benefits of Piezowave therapy at Tatum Chiropractic and Wellness. Our non-invasive approach helps you regain a pain-free lifestyle and optimal mobility. Contact us today to schedule your appointment and start your journey toward relief and recovery."
      }
    ]
  },
];

// Galleries data
const galleries = [
  {
    title: "Clinic Gallery",
    slug: "clinic-gallery",
    description: "A visual tour of Tatum Chiropractic and Wellness in Cave Creek.",
    images: [
      { id: 1, url: "gallery-1", caption: "Reception Area", alt_text: "Tatum Wellness reception", order: 1 },
      { id: 2, url: "gallery-2", caption: "Treatment Room", alt_text: "Modern treatment room", order: 2 },
      { id: 3, url: "gallery-3", caption: "Adjustment Table", alt_text: "State-of-the-art adjustment table", order: 3 },
      { id: 4, url: "gallery-4", caption: "Waiting Area", alt_text: "Comfortable waiting room", order: 4 },
      { id: 5, url: "gallery-5", caption: "Equipment", alt_text: "Chiropractic tools and equipment", order: 5 },
      { id: 6, url: "gallery-6", caption: "Office Exterior", alt_text: "Tatum Wellness exterior", order: 6 },
    ],
    is_active: true,
  },
];

// Testimonials data
const testimonials = [
  {
    author_name: "Jane D.",
    author_title: "Patient",
    content: "Dr. Lind is amazing! I came in with severe back pain and after just a few visits, I felt like a new person. Highly recommend Tatum Chiropractic!",
    rating: 5,
    image: null,
    is_active: true,
    order: 1,
  },
  {
    author_name: "Michael R.",
    author_title: "Patient",
    content: "The staff is incredibly friendly and professional. The treatments have helped me manage my chronic neck pain better than I ever thought possible.",
    rating: 5,
    image: null,
    is_active: true,
    order: 2,
  },
  {
    author_name: "Sarah K.",
    author_title: "Patient",
    content: "I was skeptical about chiropractic care, but Tatum Wellness changed my mind. Their approach is gentle, effective, and truly cares about patient outcomes.",
    rating: 5,
    image: null,
    is_active: true,
    order: 3,
  },
];

export { settings, pages, blogPosts, services, galleries, testimonials };
