import React from 'react';

const PensionConsultants = () => {
  const defaultLogo = 'https://via.placeholder.com/50'; // Default logo placeholder

  const indianFirms = [
    { name: 'Mercer', description: 'At Mercer, we make a difference in the lives of more than 110 million people every day by advancing their health, wealth and careers. We’re in the business of creating more secure and rewarding futures.', logo: 'https://www.mercer.com/favicon.ico', url: 'https://www.mercer.com' },
    { name: 'EY', description: 'At EY, we are committed to building a better working world — with increased trust and confidence in business, sustainable growth, development of talent in all its forms, and greater collaboration.', logo: 'https://www.ey.com/favicon.ico', url: 'https://www.ey.com' },
    { name: 'McKinsey & Company', description: 'McKinsey & Company is a global management consulting firm. We are the trusted advisor to the world\'s leading businesses, governments, and institutions. We strive for world-shaping client impact.', logo: 'https://www.mckinsey.com/favicon.ico', url: 'https://www.mckinsey.com' },
    { name: 'PwC', description: 'The company profile of PwC on Consultancy.in is currently not activated.', logo: 'https://www.pwc.com/favicon.ico', url: 'https://www.pwc.com' },
    { name: 'Deloitte', description: 'In India, Deloitte offers a range of Audit, Risk Advisory, Tax, Consulting and Financial Advisory services across thirteen cities. Our existence for over a century in the professional arena supplements the technical proficiency of the client service teams to create powerful business solutions tailored to the client\'s need.', logo: 'https://www2.deloitte.com/favicon.ico', url: 'https://www2.deloitte.com' },
    { name: 'Accenture', description: 'Accenture is not a partner of Consultancy.in and does not have an active company profile.', logo: 'https://www.accenture.com/favicon.ico', url: 'https://www.accenture.com' },
    { name: 'Milliman', description: 'Milliman The company profile of Milliman on Consultancy.in is currently not activated.', logo: 'https://www.milliman.com/favicon.ico', url: 'https://www.milliman.com' },
    { name: 'KPMG', description: 'KPMG was established in India in September 1993, and has rapidly built a significant competitive presence in the country. The firm operates from its offices in Ahmedabad, Bengaluru, Chandigarh, Chennai, Gurugram, Hyderabad, Kochi, Kolkata, Mumbai, Noida, Pune, and Vadodara.', logo: 'https://home.kpmg/favicon.ico', url: 'https://home.kpmg' },
    { name: 'Boston Consulting Group', description: 'The Boston Consulting Group is a global management consulting firm and the world\'s leading advisor on business strategy. We partner with clients from the private, public, and not-for-profit sectors in all regions to identify their highest-value opportunities, address their most critical challenges, and transform their enterprises.', logo: 'https://www.bcg.com/favicon.ico', url: 'https://www.bcg.com' },
    { name: 'Aon', description: 'The company profile of Aon on Consultancy.in is currently not activated.', logo: 'https://www.aon.com/favicon.ico', url: 'https://www.aon.com' },
    { name: 'Synechron', description: 'Synechron, one of the fastest-growing digital, business consulting & technology services providers, is a $500 million firm based in New York. Since inception in 2001, Synechron has been on a steep growth trajectory.', logo: 'https://www.synechron.com/favicon.ico', url: 'https://www.synechron.com' },
    { name: 'Oliver Wyman', description: 'Oliver Wyman is a global leader in management consulting. With offices in over 70 cities across 30 countries, we combine deep industry knowledge with specialized expertise in strategy, operations, risk management, and organization transformation.', logo: 'https://www.oliverwyman.com/favicon.ico', url: 'https://www.oliverwyman.com' },
    { name: 'Bain & Company', description: 'Bain & Company is not a partner of Consultancy India and does not have an active company profile.', logo: 'https://www.bain.com/favicon.ico', url: 'https://www.bain.com' },
    { name: 'Grant Thornton', description: 'Dynamic organisations know they need to apply both reason and instinct to decision making. At Grant Thornton UK LLP, this is how we advise our clients every day. We combine award-winning technical expertise with the intuition, insight and confidence gained from our extensive sector experience and a deeper understanding of our clients.', logo: 'https://www.grantthornton.global/favicon.ico', url: 'https://www.grantthornton.global' },
    { name: 'Delta Capita', description: 'Delta Capita is an independent business and technology consultancy. Getting it done We’re achievers; Our partners and consultants are seasoned professionals who have worked at senior levels in complex, high-profile projects.', logo: 'https://www.deltacapita.com/favicon.ico', url: 'https://www.deltacapita.com' },
    { name: 'BDO', description: 'BDO is the world\'s 5th largest accountancy and business advisory firm providing services to businesses within India and worldwide.', logo: 'https://www.bdo.global/favicon.ico', url: 'https://www.bdo.global' },
    { name: 'Capgemini Invent', description: 'The company profile of Capgemini Invent on Consultancy.in is currently not activated.', logo: 'https://www.capgemini.com/favicon.ico', url: 'https://www.capgemini.com' },
    { name: 'Protiviti', description: 'Protiviti is a global consulting firm that delivers deep expertise, objective insights, a tailored approach, and unparalleled collaboration to help leaders confidently face the future. Protiviti and our independently owned Member Firms provide consulting solutions in finance, technology, operations, data, analytics, governance, risk and internal audit to our clients through our network of more than 85 offices in over 25 countries.', logo: 'https://www.protiviti.com/favicon.ico', url: 'https://www.protiviti.com' },
    { name: 'Willis Towers Watson', description: 'Willis Towers Watson has no active profile on Consultancy.in.', logo: 'https://www.wtwco.com/favicon.ico', url: 'https://www.wtwco.com' },
    { name: 'Mazars', description: 'The company profile of Mazars on Consultancy.in is currently not activated.', logo: 'https://www.mazars.com/favicon.ico', url: 'https://www.mazars.com' },
    { name: 'Korn Ferry', description: '...', logo: 'https://www.kornferry.com/favicon.ico', url: 'https://www.kornferry.com' }
  ];

  const additionalIndianFirms = [
    { name: 'Life Insurance Corporation of India (LIC)', description: 'LIC provides consultancy services for pension schemes, gratuity, and provident funds.', logo: 'https://www.licindia.in/favicon.ico', url: 'https://www.licindia.in' },
    { name: 'HDFC Pension Management Company', description: 'HDFC offers pension fund management and consulting services for organizations and individuals.', logo: 'https://www.hdfcpension.com/favicon.ico', url: 'https://www.hdfcpension.com' },
    { name: 'SBI Pension Funds', description: 'SBI provides pension fund management and related consultancy services.', logo: 'https://www.sbipensionfunds.com/favicon.ico', url: 'https://www.sbipensionfunds.com' },
    { name: 'ICICI Prudential Pension Funds', description: 'ICICI Prudential offers pension fund management and consulting services for corporate clients and individuals.', logo: 'https://www.iciciprulife.com/favicon.ico', url: 'https://www.iciciprulife.com' },
    { name: 'Reliance Nippon Life Pension Fund', description: 'Reliance Nippon provides pension fund management and consultancy services for retirement planning.', logo: 'https://www.reliancenipponlife.com/favicon.ico', url: 'https://www.reliancenipponlife.com' },
    { name: 'Kotak Mahindra Pension Fund', description: 'Kotak Mahindra offers pension fund management and consultancy services for organizations and individuals.', logo: 'https://www.kotak.com/favicon.ico', url: 'https://www.kotak.com' },
    { name: 'Birla Sun Life Pension Management', description: 'Birla Sun Life provides pension fund management and related consultancy services.', logo: 'https://www.adityabirlasunlife.com/favicon.ico', url: 'https://www.adityabirlasunlife.com' },
    { name: 'Tata AIA Life Insurance', description: 'Tata AIA offers pension and retirement planning consultancy services, including provident fund and gratuity management.', logo: 'https://www.tataaia.com/favicon.ico', url: 'https://www.tataaia.com' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Consultancy Firms</h1>
        <div className="flex flex-col gap-4">
          {[...indianFirms, ...additionalIndianFirms].map((firm, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 text-blue-600">
              <div className="flex items-center mb-4">
                <img src={firm.logo || defaultLogo} alt={`${firm.name} logo`} className="w-12 h-12 mr-4" />
                <h3 className="text-xl font-semibold">{firm.name}</h3>
              </div>
              <p className="text-gray-700 mb-4">{firm.description}</p>
              <a href={firm.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View company profile</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PensionConsultants;
