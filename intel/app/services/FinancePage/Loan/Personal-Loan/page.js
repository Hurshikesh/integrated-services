import Head from 'next/head';

function HomePage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-gray-50">
      <Head>
        <title>Personal Loans | What is a Personal Loan?</title>
        <meta name="description" content="Learn about personal loans, its types, and benefits. Compare rates and tenure from top banks and institutions." />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">What is a Personal Loan?</h1>
        <p className="text-lg text-gray-600">A personal loan is an unsecured loan that allows you to borrow money for various purposes such as weddings, education, home renovation, or debt consolidation.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Types of Personal Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Unsecured Loans</li>
          <li>Secured Loans</li>
          <li>Debt Consolidation Loans</li>
          <li>Wedding Loans</li>
          <li>Home Renovation Loans</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits of Personal Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>Flexibility to use the loan amount for any purpose</li>
          <li>No collateral required</li>
          <li>Quick and easy application process</li>
          <li>Competitive interest rates</li>
          <li>Flexible repayment tenure</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Compare Personal Loans from Top Banks and Institutions</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-black text-black">Institution</th>
                <th className="px-4 py-2 border border-black text-black">Interest Rate</th>
                <th className="px-4 py-2 border border-black text-black">Tenure</th>
              </tr>
            </thead>
            <tbody>
              {[
                { institution: "SBI", rate: "10.50% - 15.50%", tenure: "1 - 5 years", url: "https://www.sbi.co.in/web/personal-banking/loans/personal-loans" },
                { institution: "HDFC Bank", rate: "11.25% - 16.25%", tenure: "1 - 5 years", url: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan" },
                { institution: "ICICI Bank", rate: "11.50% - 17.50%", tenure: "1 - 5 years", url: "https://www.icicibank.com/Personal-Banking/loans/personal-loan/index.page" },
                { institution: "Axis Bank", rate: "12.00% - 18.00%", tenure: "1 - 5 years", url: "https://www.axisbank.com/retail/loans/personal-loan" },
                { institution: "Yes Bank", rate: "12.50% - 19.50%", tenure: "1 - 5 years", url: "https://www.yesbank.in/personal-banking/yes-individual/loans/personal-loan" },
                { institution: "Kotak Mahindra Bank", rate: "13.00% - 20.00%", tenure: "1 - 5 years", url: "https://www.kotak.com/en/personal-banking/loans/personal-loan.html" },
                { institution: "IndusInd Bank", rate: "13.50% - 21.50%", tenure: "1 - 5 years", url: "https://www.indusind.com/in/en/personal/loans/personal-loan.html" },
                { institution: "HSBC", rate: "14.00% - 22.00%", tenure: "1 - 5 years", url: "https://www.hsbc.co.in/loans/products/personal/" },
                { institution: "Standard Chartered", rate: "14.50% - 23.50%", tenure: "1 - 5 years", url: "https://www.sc.com/in/loans/personal-loans/" },
                { institution: "Citibank", rate: "15.00% - 24.00%", tenure: "1 - 5 years", url: "https://www.online.citibank.co.in/portal/newgen/cards/tab/personalloan.htm" },
                { institution: "Bajaj Finserv", rate: "15.50% - 25.50%", tenure: "1 - 5 years", url: "https://www.bajajfinserv.in/personal-loan" },
                { institution: "Tata Capital", rate: "16.00% - 26.00%", tenure: "1 - 5 years", url: "https://www.tatacapital.com/personal-loan.html" },
                { institution: "Mahindra Finance", rate: "16.50% - 27.50%", tenure: "1 - 5 years", url: "https://www.mahindrafinance.com/personal-loans" },
                { institution: "Fullerton India", rate: "17.00% - 28.50%", tenure: "1 - 5 years", url: "https://www.fullertonindia.com/personal-loan.aspx" },
                { institution: "Capital First", rate: "17.50% - 29.50%", tenure: "1 - 5 years", url: "https://www.idfcfirstbank.com/personal-banking/loans/personal-loan" },
              ].map((loan, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border border-black text-black">
                    <a href={loan.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {loan.institution}
                    </a>
                  </td>
                  <td className="px-4 py-2 border border-black text-black">{loan.rate}</td>
                  <td className="px-4 py-2 border border-black text-black">{loan.tenure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">EMI Calculator</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
          <div className="elfsight-app-9b8cf743-c2ee-40b0-804f-a6ef5eb89520" data-elfsight-app-lazy></div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <details className="mb-4">
            <summary className="font-semibold text-gray-800">What is the maximum tenure for a personal loan?</summary>
            <p className="mt-2 text-gray-700">The maximum tenure for a personal loan is typically up to 5 years.</p>
          </details>
          <details className="mb-4">
            <summary className="font-semibold text-gray-800">Can I get a personal loan with a bad credit score?</summary>
            <p className="mt-2 text-gray-700">It may be difficult to get a personal loan with a bad credit score. However, some lenders may offer loans at higher interest rates.</p>
          </details>
          <details className="mb-4">
            <summary className="font-semibold text-gray-800">What documents are required for a personal loan application?</summary>
            <p className="mt-2 text-gray-700">Generally, you'll need identity proof, address proof, income proof, and bank statements.</p>
          </details>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
