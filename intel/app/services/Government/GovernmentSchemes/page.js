'use client'
import React, { useState } from 'react';

const schemes = [
    {
        name: "Agnipath Scheme",
        category: "CS",
        ministry: "Ministry of Defence (India)",
        year: 2022,
        sector: "Defense",
        description: "For recruitment of soldiers below the rank of commissioned officers into the three services of the armed forces. The Agnipath Scheme will be the only route for recruitment into the military. All recruits will be hired only for a four-year period. Personnel recruited under this system are to be called Agniveers which will be a new military rank."
    },
    {
        name: "Mahila Samman Savings Certificate (MSSC)",
        category: "-",
        ministry: "-",
        year: 2023,
        sector: "Finance",
        description: "MSSC Scheme was launched by Government of India in Budget 2023 for woman and girls in India."
    },
    {
        name: "PM Poshan Shakti Nirman Abhiyaan",
        category: "CSS",
        ministry: "MoWCD",
        year: 2021,
        sector: "Health",
        description: "Revamped version of 1995 Midday Meal Scheme (Madhyanh Bhojan Yojana) to provide free lunch to school-children. Financial outlay in 2022 was ₹10,233 crore (equivalent to ₹110 billion or US$1.4 billion in 2023). POSHAN Abhiyaan was launched in 2018. Grouped under the umbrella scheme 'Saksham Anganwadi and POSHAN 2.0'. Expanded aims include reduce stunting, under-nutrition, anemia and low birth weight."
    },
    {
        name: "Strengthening Teaching-Learning and Results for States (STARS)",
        category: "CSS",
        ministry: "MoE",
        year: 2020,
        sector: "Education",
        description: "To improve school education in six states covering 10 million teachers. Financial support by World Bank. This is a continuation of GOI-World Bank efforts since 1994 towards the same goal. Implemented through Samagra Shiksha Abhiyan."
    },
    {
        name: "Svamitva Yojana",
        category: "CS",
        ministry: "MoPR",
        year: 2020,
        sector: "Rural development",
        description: "To help in mapping of properties in villages with the help of drones. Aims in helping to reduce disputes over property. The portal will help in making it easier for villagers to avail bank loans."
    },
    {
        name: "Garib Kalyan Rojgar Abhiyaan",
        category: "CS",
        ministry: "12 ministries",
        year: 2020,
        sector: "Employment",
        description: "Employment campaign for the poor following coronavirus pandemic covering 12 ministries and 6 states. Launched on 20 June 2020 and ended on 22 October 2020."
    },
    {
        name: "PM Matsya Sampada Yojana",
        category: "CSS",
        ministry: "MoFAHD",
        year: 2020,
        sector: "Fisheries",
        description: "Nationwide welfare measures for farmers in the fisheries sector. For the period 2020-2024 estimated allocation of ₹20,050 crore (equivalent to ₹220 billion or US$2.7 billion in 2023) for implementation."
    },
    {
        name: "PM Kisan Samman Nidhi (PM KISAN)",
        category: "CS",
        ministry: "MoF",
        year: 2019,
        sector: "Agriculture",
        description: "Income support of ₹6,000 (equivalent to ₹6,700 or US$81 in 2023) per year to eligible farmers through Direct Benefit Transfer."
    },
    {
        name: "Jal Jeevan Mission",
        category: "CSS",
        ministry: "MoJS",
        year: 2019,
        sector: "Rural development",
        description: "Accelerated Rural Water Supply Programme began in 1972. Restructured into National Rural Drinking Water Programme (NRDWP) in 2009. To provide water to each rural household through individual taps. Financial outlay in 2022 is ₹60,000 crore (equivalent to ₹670 billion or US$8.1 billion in 2023). Consists of 'Har Ghar Nal Se Jal' or 'Nal Se Jal Scheme'. Also Har Ghar Jal."
    },
    {
        name: "Atal Bhujal Yojana",
        category: "CS",
        ministry: "MoJS",
        year: 2019,
        sector: "Water",
        description: "World Bank funded scheme (50:50) to improve ground water management with focus on Panchayats. Implementation in seven states between 2020 and 2025 with initial funding of ₹6,000 crore (equivalent to ₹67 billion or US$810 million in 2023)."
    },
    {
        name: "PM Kisan Urja Suraksha Evam Utthan Mahabhiyan (PM KUSUM)",
        category: "CS",
        ministry: "MoNRE",
        year: 2019,
        sector: "Agriculture",
        description: "For the installation of solar pumps and other renewable power plants across the nation targeted towards farmers. Towards Paris Agreement targets for renewable energy."
    },
    {
        name: "PM Shram Yogi Mandhan (PM SYM)",
        category: "CS",
        ministry: "MoLE",
        year: 2019,
        sector: "Financial security",
        description: "Social security to unorganized sector and through voluntary contribution and monthly pension after 60 through direct benefit transfer. Implemented by LIC and CSCs."
    },
    {
        name: "PM Annadata Aay Sanrakshan Abhiyan (PM AASHA)",
        category: "CS",
        ministry: "MoAFW",
        year: 2018,
        sector: "Agriculture",
        description: "For farmer welfare through creating a profitable ecosystem for selected products. Consists of sub-schemes such as Price Support Scheme (PSS) and Price Deficiency Payment Scheme (PDPS)."
    },
    {
        name: "Ayushman Bharat Yojana (AB PM-JAY)",
        category: "CSS",
        ministry: "MoHFW",
        year: 2018,
        sector: "Health",
        description: "Ayushman Bharat National Health Protection Scheme (AB-NHPS) aims to provide free access to healthcare for 50 crore people in the country. Implemented across India except 3 states/UTs. By July 2021 Ayushman cards issued numbered 16.14 crore. By March 2022 hospitalisations under the scheme had crossed 30 million with a valuation of ₹35,000 crore (equivalent to ₹390 billion or US$4.7 billion in 2023)."
    },
    {
        name: "Samagra Shiksha (National Education Mission)",
        category: "CSS",
        ministry: "MoE",
        year: 2018,
        sector: "Education",
        description: "To ensure inclusive and equitable quality education at all levels of school education."
    },
    {
        name: "PM Jan Vikas Karyakaram (PMJVK, PM People Progress Programme)",
        category: "CSS",
        ministry: "MoMA",
        year: 2018,
        sector: "Development",
        description: "Started in 2008 as Multi-sectoral Development Programme (MSDP). Development of minority concentration areas."
    },
    {
        name: "Rashtriya Gram Swaraj Abhiyan (RGSA, National Village Swaraj Campaign)",
        category: "CSS",
        ministry: "MoPR",
        year: 2018,
        sector: "Rural development",
        description: "To strengthen Panchayati Raj institutions and support them towards achieving Sustainable Development Goals."
    },
    {
        name: "World Class Institutions Scheme",
        category: "CS",
        ministry: "MoE",
        year: 2017,
        sector: "Education",
        description: "To enable 10 private and public institutions to attain world class academic and research facilities. Aim is to create Institutes of Eminence."
    },
    {
        name: "Khelo India – National Programme for Development of Sports",
        category: "CS",
        ministry: "MoYAS",
        year: 2017,
        sector: "Sports",
        description: "Sporting infrastructure, sponsorship, excellence. Competitions such as Khelo India University Games and Winter Games. General fitness of the population."
    },
    {
        name: "Krishonnati Yojana",
        category: "CSS",
        ministry: "MoAFW",
        year: 2017,
        sector: "Agriculture",
        description: "Umbrella scheme subsuming 11 schemes."
    },
    {
        name: "PM Matritva Vandana Yojana (PM Maternity Support Scheme)",
        category: "-",
        ministry: "MoWCD",
        year: 2017,
        sector: "Mother Care",
        description: "Launched as the Indira Gandhi Matritva Sahyog Yojana in 2010. Renamed in 2017. A cash incentive of not less than ₹6,000 (equivalent to ₹6,400 or US$76 in 2023) to pregnant/lactating women."
    },
    {
        name: "PM Ujjwala Yojana (PM Lighting Scheme)",
        category: "CSS",
        ministry: "MoP&NG",
        year: 2016,
        sector: "Poverty",
        description: "Launched to provide free LPG connections to women from below poverty line families. While the scheme mainly addresses distribution of cylinders, their usage has been in question."
    },
    {
        name: "PM Fasal Bima Yojana (PM Crop Insurance Scheme)",
        category: "CS",
        ministry: "Multiple",
        year: 2016,
        sector: "Agriculture",
        description: "Insurance and finance scheme for farmers."
    },
    {
        name: "Stand-Up India",
        category: "CS",
        ministry: "MoF, MoSJE",
        year: 2016,
        sector: "Entrepreneurship",
        description: "Loans for scheduled castes, scheduled tribes and women entrepreneurs for greenfield enterprises. Loans can be applied online. By July 2021, 1.16 lakh loans disbursed amounting to ₹26,204 crore (equivalent to ₹290 billion or US$3.5 billion in 2023). By 2022, 81% of loan beneficiaries are women."
    },
    {
        name: "National Hydrology Project",
        category: "CS",
        ministry: "MoJS",
        year: 2016,
        sector: "Water",
        description: "Multi-pronged project to improve hydrology related practices. World Bank supported. Australian Water Partnership (AWP) provides technical assistance. The Hydrology Project started in 1995 and was expanded through the National Hydrology Project in 2016."
    },
    {
        name: "PM Krishi Sinchai Yojana (PMKSY, PM Agriculture Irrigation Scheme)",
        category: "CSS",
        ministry: "Multiple",
        year: 2015,
        sector: "Agriculture",
        description: "Multi-pronged scheme focusing on improving agricultural productivity through irrigation support and better practices. In 2022 financial outlay is ₹10,954 crore (equivalent to ₹120 billion or US$1.5 billion in 2023). Part of Rashtriya Krishi Vikas Yojna."
    },
    {
        name: "PM Mudra Yojana (PM Micro Units Development and Refinance Agency Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Finance",
        description: "MUDRA is a financial institution for funding small businesses. 34,42,00,000 beneficiaries have received ₹18.6 lakh crore (equivalent to ₹21 trillion or US$250 billion in 2023). New entrepreneurs consist 22% of the beneficiaries."
    },
    {
        name: "Smart Cities Mission",
        category: "CSS",
        ministry: "MoHUA",
        year: 2015,
        sector: "Urban",
        description: "Redevelopment, retrofitting, greenfield development of 100 cities. Large diversity in success of implementation."
    },
    {
        name: "Digital India",
        category: "CS",
        ministry: "MeitY, MoF",
        year: 2015,
        sector: "IT",
        description: "It aims to ensure that government services are available to citizens electronically and people get benefits from the latest information and communication technology."
    },
    {
        name: "Faster Adoption and Manufacturing of Electric (& Hybrid) Vehicles in India Scheme (FAME India Scheme)",
        category: "CS",
        ministry: "MoHI",
        year: 2015,
        sector: "Fuel security",
        description: "Part of the National Electric Mobility Mission Plan (NEMMP) 2020."
    },
    {
        name: "PM Awas Yojana - (Gramin) (PMAY-G, PM Housing Scheme Rural)",
        category: "CSS",
        ministry: "MoRD",
        year: 2015,
        sector: "Housing",
        description: "Provides financial assistance to rural poor for constructing their houses themselves. Sample housing designs have been proposed through UNDP, MoRD and IIT, Delhi collaboration."
    },
    {
        name: "PM Awaas Yojana - (Urban) (PMAY-R, PM Housing Scheme Urban)",
        category: "CSS",
        ministry: "MoHUA",
        year: 2015,
        sector: "Housing",
        description: "To enable better living and drive economic growth stressing on the need for people centric urban planning and development."
    },
    {
        name: "Atal Pension Yojana (Atal Pension Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Pension",
        description: "A pension program that allows people to make voluntary contributions within a certain range with a matching government contribution to receive pension in the future."
    },
    {
        name: "PM Suraksha Bima Yojana (PMSBY, PM Safety Insurance Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Insurance",
        description: "This accident insurance scheme is for individuals and can be renewed every year."
    },
    {
        name: "PM Jeevan Jyoti Bima Yojana (PMJJBY, PM Life Light Insurance Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Insurance",
        description: "This life insurance scheme for individuals can be renewed every year."
    },
    {
        name: "Unnat Jyoti by Affordable LEDs for All (UJALA)",
        category: "CS",
        ministry: "MoP",
        year: 2015,
        sector: "Electrification",
        description: "Replaced the 'Bachat Lamp Yojana'. Reduces the cost of energy-saving compact fluorescent lamps."
    },
    {
        name: "PM Kaushal Vikas Yojna (PM Skill Development Scheme)",
        category: "CS",
        ministry: "MoSD&E",
        year: 2015,
        sector: "Skill development initiative schemes",
        description: "To provide encouragement to youth for development of employable skills by providing monetary rewards by recognition of prior learning or by undergoing certification training at affiliated centres."
    },
    {
        name: "PM Suraksha Bima Yojana (PMSBY, PM Safety Insurance Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Insurance",
        description: "This accident insurance scheme is for individuals and can be renewed every year."
    },
    {
        name: "PM Jeevan Jyoti Bima Yojana (PMJJBY, PM Life Light Insurance Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Insurance",
        description: "This life insurance scheme for individuals can be renewed every year."
    },
    {
        name: "Unnat Jyoti by Affordable LEDs for All (UJALA)",
        category: "CS",
        ministry: "MoP",
        year: 2015,
        sector: "Electrification",
        description: "Replaced the 'Bachat Lamp Yojana'. Reduces the cost of energy-saving compact fluorescent lamps."
    },
    {
        name: "PM Kaushal Vikas Yojna (PM Skill Development Scheme)",
        category: "CS",
        ministry: "MoSD&E",
        year: 2015,
        sector: "Skill development initiative schemes",
        description: "To provide encouragement to youth for development of employable skills by providing monetary rewards by recognition of prior learning or by undergoing certification training at affiliated centres."
    },
    {
        name: "PM Suraksha Bima Yojana (PMSBY, PM Safety Insurance Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Insurance",
        description: "This accident insurance scheme is for individuals and can be renewed every year."
    },
    {
        name: "PM Jeevan Jyoti Bima Yojana (PMJJBY, PM Life Light Insurance Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2015,
        sector: "Insurance",
        description: "This life insurance scheme for individuals can be renewed every year."
    }, {
        name: "Unnat Jyoti by Affordable LEDs for All (UJALA)",
        category: "CS",
        ministry: "MoP",
        year: 2015,
        sector: "Electrification",
        description: "Replaced the 'Bachat Lamp Yojana'. Reduces the cost of energy-saving compact fluorescent lamps."
    },
    {
        name: "Heritage City Development and Augmentation Yojana (HRIDAY)",
        category: "CSS",
        ministry: "MoUD",
        year: 2015,
        sector: "Urban",
        description: "Preserves and rejuvenates the cultural heritage of cities across India."
    },
    {
        name: "Sukanya Samridhi Yojana (Girl Child Prosperity Scheme)",
        category: "—",
        ministry: "MoWCD",
        year: 2015,
        sector: "Girl child",
        description: "Ensures financial security for girl children, promoting savings and welfare."
    },
    {
        name: "PM Kaushal Vikas Yojana (PM Skill Development Scheme)",
        category: "CS",
        ministry: "MoSD&E",
        year: 2015,
        sector: "Skill development initiative schemes",
        description: "Provides skill development training to enhance employability, with a focus on placement."
    },
    {
        name: "PM Bhartiya Jan Aushadhi Kendra (PM Indian Public Medicine Scheme, PMBJK)",
        category: "—",
        ministry: "MoCF",
        year: 2015,
        sector: "Health",
        description: "Provides quality generic medicines at affordable prices through Jan Aushadhi stores."
    },
    {
        name: "Deendayal Antyodaya Yojana",
        category: "CSS",
        ministry: "MoRD",
        year: 2015,
        sector: "Skill development initiative schemes",
        description: "Formerly NRLM, promotes self-employment among the poor through skill development."
    },
    {
        name: "National Career Service (NCS)",
        category: "—",
        ministry: "MoLE",
        year: 2015,
        sector: "Employment",
        description: "An online job portal to connect job-seekers with employers and provide career guidance."
    },
    {
        name: "Deendayal Upadhyaya Gram Jyoti Yojana",
        category: "CS",
        ministry: "MoP",
        year: 2015,
        sector: "Rural development",
        description: "Aims to provide electricity to rural households and improve rural electrification infrastructure."
    },
    {
        name: "Atal Mission for Rejuvenation and Urban Transformation (AMRUT)",
        category: "CSS",
        ministry: "MoUD",
        year: 2015,
        sector: "Urban",
        description: "Focuses on water supply, sewerage facilities, urban transport, and green spaces in cities."
    },
    {
        name: "Swachh Bharat Abhiyan (Clean India Mission)",
        category: "CSS",
        ministry: "MoDWS, MoHUA",
        year: 2014,
        sector: "Sanitation",
        description: "Aims for clean and open defecation-free India, promoting sanitation and hygiene practices."
    },
    {
        name: "PM Jan Dhan Yojana (PM's People's Wealth Scheme)",
        category: "CS",
        ministry: "MoF",
        year: 2014,
        sector: "Finance",
        description: "Promotes financial inclusion by providing access to banking services and benefits."
    },
    {
        name: "Deendayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY, Deen Dayal Upadhyaya Rural Skills Schemes)",
        category: "—",
        ministry: "MRD",
        year: 2014,
        sector: "Skill development initiative schemes",
        description: "Provides skill training and enhances employability of rural youth, especially SC/ST."
    },
    {
        name: "Namami Gange Programme",
        category: "CS",
        ministry: "MoWR",
        year: 2014,
        sector: "Sanitation",
        description: "Comprehensive programme for cleaning and conserving the Ganga river."
    },
    {
        name: "Rajiv Gandhi Scheme for Empowerment of Adolescent Boys (Saksham)",
        category: "CS",
        ministry: "MoWCD",
        year: 2014,
        sector: "Skill development initiative schemes",
        description: "Development of adolescent boys through education, skills, and awareness."
    },
    {
        name: "Sansad Adarsh Gram Yojana (SAGY, Saanjhi, Member of Parliament Model Village Scheme)",
        category: "—",
        ministry: "MoRD",
        year: 2014,
        sector: "Rural development",
        description: "Aims to develop model villages across India through convergence of various schemes."
    },
    {
        name: "Rashtriya Uchchatar Shiksha Abhiyan (National Higher Education Mission)",
        category: "CSS",
        ministry: "MoE",
        year: 2013,
        sector: "Education",
        description: "Enhances quality of higher education and promotes research in universities."
    },
    {
        name: "One Stop Crisis Centre (Sakhi)",
        category: "—",
        ministry: "MoWCD",
        year: 2013,
        sector: "Women",
        description: "Provides aid and shelter to women facing violence through dedicated crisis centres."
    },
    {
        name: "Direct Benefit Transfer (DBT)",
        category: "—",
        ministry: "—",
        year: 2013,
        sector: "Finance",
        description: "Ensures direct transfer of subsidies and benefits to the bank accounts of beneficiaries."
    },
    {
        name: "Scheme for Adolescent Girls (SAG, Adolescent Girls (AG) Scheme)",
        category: "CSS",
        ministry: "MoWCD",
        year: 2011,
        sector: "Skill development initiative schemes",
        description: "Empowers adolescent girls with education, nutrition, health, and vocational training."
    },
    {
        name: "PM Adarsh Gram Yojana (PM Model Village Scheme)",
        category: "—",
        ministry: "MoRD",
        year: 2010,
        sector: "Rural development",
        description: "Integrated development of Scheduled Caste majority villages."
    },
    {
        name: "Promotion of University Research and Scientific Excellence (PURSE)",
        category: "CS",
        ministry: "MoST",
        year: 2009,
        sector: "Infrastructure",
        description: "Enhances research infrastructure and promotes scientific excellence in universities."
    },
    {
        name: "Clean Energy Research Initiative (CERI)",
        category: "CS",
        ministry: "MoST",
        year: 2009,
        sector: "Energy",
        description: "Promotes research and development in clean energy technologies."
    },
    {
        name: "Innovation in Science Pursuit for Inspired Research Programme (INSPIRE Programme)",
        category: "CS",
        ministry: "MoST",
        year: 2008,
        sector: "Science",
        description: "Encourages talented youth towards science and research through scholarships and grants."
    },
    {
        name: "Cognitive Science Research Initiative (CSRI)",
        category: "CS",
        ministry: "MoST",
        year: 2008,
        sector: "Science",
        description: "Promotes research to improve the quality of life for those with cognitive disorders."
    },
    {
        name: "Rashtriya Swasthya Bima Yojana (RSBY, National Health Insurance Programme)",
        category: "CSS",
        ministry: "MoHFW",
        year: 2008,
        sector: "Insurance",
        description: "Provides health insurance to below poverty line families and unorganized sector workers."
    },
    {
        name: "National Action Plan for Climate Change (NAPCC)",
        category: "CCP",
        ministry: "MoST",
        year: 2008,
        sector: "Science",
        description: "Addresses climate change issues and enhances capabilities in science and technology."
    },
    {
        name: "PM's Employment Generation Programme (PMEGP)",
        category: "CS",
        ministry: "MoMSME",
        year: 2008,
        sector: "Employment",
        description: "Promotes self-employment through setting up of micro-enterprises."
    },
    {
        name: "Gramin Bhandaran Yojana (Rural Godown Scheme)",
        category: "—",
        ministry: "MoA",
        year: 2007,
        sector: "Agriculture",
        description: "Creates rural storage capacity for agricultural produce to prevent post-harvest losses."
    },
    {
        name: "Rashtriya Krishi Vikas Yojana (RKVY, National Agriculture Development Programme)",
        category: "CSS",
        ministry: "MoA",
        year: 2007,
        sector: "Agriculture",
        description: "Promotes agriculture through infrastructure development, water management, and more."
    },
    {
        name: "National Mission on Nano Science and Technology",
        category: "CS",
        ministry: "MoST",
        year: 2007,
        sector: "Science",
        description: "Promotes research and development in Nano Science and Technology."
    },
    {
        name: "Mahatma Gandhi National Rural Employment Guarantee Act (MG-NREGA)",
        category: "CSS",
        ministry: "MoRD",
        year: 2006,
        sector: "Employment",
        description: "Provides 100 days of guaranteed wage employment annually to rural households."
    },
    {
        name: "Pooled Finance Development Fund Scheme (PFDF)",
        category: "—",
        ministry: "MoUD",
        year: 2006,
        sector: "Infrastructure",
        description: "Enables Urban Local Bodies to raise credit for infrastructure investments."
    },
    {
        name: "National Creche Scheme",
        category: "CSS",
        ministry: "MoWCD",
        year: 2006,
        sector: "Women",
        description: "Provides daycare facilities for children of working mothers under various schemes."
    },
    {
        name: "Janani Suraksha Yojana (Maternity Safety Scheme)",
        category: "CSS",
        ministry: "MoHFW",
        year: 2005,
        sector: "Mother Care",
        description: "Provides financial assistance to pregnant women for safe institutional deliveries."
    },
    {
        name: "National Health Mission",
        category: "CSS",
        ministry: "MoHFW",
        year: 2005,
        sector: "Health",
        description: "Improves health infrastructure and services, integrates multiple health programmes."
    },
    {
        name: "Livestock Insurance Scheme",
        category: "CSS",
        ministry: "MoA",
        year: 2005,
        sector: "Agriculture",
        description: "Provides insurance cover to cattle and aims at improving livestock productivity."
    },
    {
        name: "Special Accelerated Road Development Programme (SARDP-NE)",
        category: "CS",
        ministry: "MoRTH",
        year: 2005,
        sector: "Transport",
        description: "Focused on improving road connectivity in Northeast India."
    },
    {
        name: "Kasturba Gandhi Balika Vidyalaya (KGBV)",
        category: "CSS",
        ministry: "MoHRD",
        year: 2004,
        sector: "Education",
        description: "Residential schools for girls from marginalized communities in educationally backward blocks."
    },
    {
        name: "National Pension System (NPS)",
        category: "—",
        ministry: "MoF",
        year: 2004,
        sector: "Pension",
        description: "Contribution-based pension system for government employees and the general public."
    },
    {
        name: "Deendayal Disabled Rehabilitation Scheme (DDRS)",
        category: "CS",
        ministry: "MoSJE",
        year: 2003,
        sector: "Social Justice",
        description: "Promotes voluntary action for persons with disabilities, ensuring equal opportunities and empowerment."
    },
    {
        name: "PM Swasthya Suraksha Yojana (PMSSY)",
        category: "CS",
        ministry: "MoHFW",
        year: 2003,
        sector: "Health",
        description: "Enhances health services accessibility and infrastructure, including new AIIMS."
    },
    {
        name: "Sampoorna Grameen Rozgar Yojana (SGRY)",
        category: "—",
        ministry: "MoRD",
        year: 2001,
        sector: "Employment",
        description: "Provides wage employment and food security, creates durable community assets in rural areas."
    },
    {
        name: "Swadhar Greh Scheme",
        category: "CSS",
        ministry: "MoWCD",
        year: 2001,
        sector: "Women",
        description: "Provides shelter and support to women in difficult circumstances."
    },
    {
        name: "PM Gram Sadak Yojana (PMGSY)",
        category: "CSS",
        ministry: "MoRD",
        year: 2000,
        sector: "Rural development",
        description: "Provides all-weather road connectivity to unconnected villages."
    },
    {
        name: "Antyodaya Anna Yojana (AAY)",
        category: "—",
        ministry: "MoCAFPD",
        year: 2000,
        sector: "Health",
        description: "Provides food grains to the poorest of the poor through targeted public distribution."
    },
    {
        name: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
        category: "CS",
        ministry: "MoST",
        year: 1999,
        sector: "Science",
        description: "Scholarship programme to encourage students to pursue research careers in sciences."
    },
    {
        name: "National Social Assistance Programme (NSAP)",
        category: "CSS",
        ministry: "MoRD",
        year: 1995,
        sector: "Pension",
        description: "Financial assistance to pensioners, widows, and other vulnerable categories."
    },
    {
        name: "Members of Parliament Local Area Development Scheme (MPLADS)",
        category: "CS",
        ministry: "MoSPI",
        year: 1993,
        sector: "Development",
        description: "Allows MPs to recommend development works in their constituencies."
    },
    {
        name: "National Scheme on Welfare of Fishermen",
        category: "CSS",
        ministry: "MoA",
        year: 1992,
        sector: "Agriculture",
        description: "Provides financial assistance and welfare measures for fishermen."
    },
    {
        name: "National Social Assistance Scheme (Old name: National Social Assistance Programme (NSAP))",
        category: "CSS",
        ministry: "MoRD",
        year: 1995,
        sector: "Pension",
        description: "Provides public assistance to citizens in cases of unemployment, old age, sickness, and more."
    },
    {
        name: "Eklavya Model Residential School (EMRS)",
        category: "CS",
        ministry: "MoTA",
        year: 1997,
        sector: "Education",
        description: "Establishes residential schools for tribal children to improve enrollment and education."
    },
    {
        name: "National Tuberculosis Elimination Program (NTEP)",
        category: "CSS",
        ministry: "MoHFW",
        year: 1997,
        sector: "Health",
        description: "National initiative to control and eliminate tuberculosis."
    },
    {
        name: "Voluntary Disclosure of Income Scheme (VDIS)",
        category: "—",
        ministry: "MoF",
        year: 1997,
        sector: "Finance",
        description: "Scheme to disclose undisclosed income at prevailing tax rates."
    },
    {
        name: "Infrastructure Facilities for Judiciary",
        category: "CSS",
        ministry: "MoLJ",
        year: 1993,
        sector: "Infrastructure",
        description: "Improves infrastructure for the judiciary including residential and digital facilities."
    },
    {
        name: "National Child Labour Projects (NCLP)",
        category: "—",
        ministry: "MoLE",
        year: 1987,
        sector: "Child labour",
        description: "Focused on eliminating child labour in hazardous industries through education and rehabilitation."
    },
    {
        name: "Interlinking of Rivers Project (ILR, NPP)",
        category: "CSS",
        ministry: "MoJS",
        year: 1980,
        sector: "Water",
        description: "Aims at developing water resources by linking rivers across India."
    },
    {
        name: "Urea subsidy",
        category: "CS",
        ministry: "MoCF",
        year: 1977,
        sector: "Agriculture",
        description: "Subsidy scheme for urea to support agriculture and farmers."
    },
    {
        name: "Integrated Child Development Services (ICDS)",
        category: "CSS",
        ministry: "MoWCD",
        year: 1975,
        sector: "Mother Care",
        description: "Addresses malnutrition and health issues in children and mothers through Anganwadi centres."
    },
    {
        name: "Food subsidy",
        category: "CS",
        ministry: "MoCAFPD",
        year: 1972,
        sector: "Health",
        description: "Subsidy for food grains to ensure food security and affordability."
    },
    {
        name: "National Service Scheme (NSS)",
        category: "CS",
        ministry: "MoYAS",
        year: 1969,
        sector: "Social and community",
        description: "Encourages personality development through social and community service."
    },
    {
        name: "Kerosene subsidy",
        category: "CS",
        ministry: "—",
        year: 1956,
        sector: "Subsidy",
        description: "Historical subsidy on kerosene, phased out in 2021."
    }
];

const Home = () => {
    const [selectedSector, setSelectedSector] = useState('Finance');

    const handleChangeSector = (event) => {
        setSelectedSector(event.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Government Schemes</h1>

                {/* Sector dropdown */}
                <div className="mb-4">
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                        Select Sector:
                    </label>
                    <select
                        id="sector"
                        name="sector"
                        className="mt-1 block w-full py-2 px-3 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleChangeSector}
                        value={selectedSector}
                    >
                        <option value="Agriculture">Agriculture</option>
                        <option value="Child labour">Child labour</option>
                        <option value="Defense">Defense</option>
                        <option value="Development">Development</option>
                        <option value="Education">Education</option>
                        <option value="Electrification">Electrification</option>
                        <option value="Energy">Energy</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                        <option value="Finance">Finance</option>
                        <option value="Financial security">Financial security</option>
                        <option value="Fisheries">Fisheries</option>
                        <option value="Fuel security">Fuel security</option>
                        <option value="Girl child">Girl child</option>
                        <option value="Health, Education">Health</option>
                        <option value="Housing">Housing</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Insurance">Insurance</option>
                        <option value="IT">IT</option>
                        <option value="Mother Care">Mother Care</option>
                        <option value="Pension">Pension</option>
                        <option value="Poverty">Poverty</option>
                        <option value="Rural development">Rural development</option>
                        <option value="Sanitation">Sanitation</option>
                        <option value="Science">Science</option>
                        <option value="Skill development initiative schemes">Skill development initiative schemes</option>
                        <option value="Social and community">Social and community</option>
                        <option value="Social Justice">Social Justice</option>
                        <option value="Sports">Sports</option>
                        <option value="Transport">Transport</option>
                        <option value="Urban">Urban</option>
                        <option value="Water">Water</option>
                        <option value="Women">Women</option>

                    </select>
                </div>

                {/* Schemes grid based on selected sector */}
                <div className="grid grid-cols-1 gap-6">
                    {schemes
                        .filter((scheme) => scheme.sector === selectedSector)
                        .map((scheme, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">{scheme.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {scheme.category}</p>
                                    <p className="text-sm text-gray-600 mb-2"><strong>Ministry:</strong> {scheme.ministry}</p>
                                    <p className="text-sm text-gray-600 mb-2"><strong>Year:</strong> {scheme.year}</p>
                                    <p className="text-sm text-gray-600 mb-4"><strong>Sector:</strong> {scheme.sector}</p>
                                    <p className="text-sm text-gray-700">{scheme.description}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Home;