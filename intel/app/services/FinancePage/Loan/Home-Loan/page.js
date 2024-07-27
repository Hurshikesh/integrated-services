import Head from 'next/head';

function HomeLoanPage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-gray-50">
      <Head>
        <title>Home Loan | What is a Home Loan?</title>
        <meta name="description" content="Learn about home loans, their types, benefits, eligibility criteria, and how to apply. Compare rates and tenure from top banks and institutions." />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">What is a Home Loan?</h1>
        <p className="text-lg text-gray-600 mt-4">A home loan is a secured loan that helps you purchase or construct your dream home. With attractive interest rates and flexible repayment options, owning a home is now easier.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Types of Home Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Home Purchase Loan</li>
          <li>Home Construction Loan</li>
          <li>Home Improvement Loan</li>
          <li>Home Extension Loan</li>
          <li>Land Purchase Loan</li>
          <li>Balance Transfer Home Loan</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Benefits of Home Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Tax benefits on principal and interest repayment</li>
          <li>Longer repayment tenure up to 30 years</li>
          <li>Lower interest rates compared to personal loans</li>
          <li>Fixed and floating interest rate options</li>
          <li>Higher loan amounts based on eligibility</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Applicant should be an Indian citizen</li>
          <li>Age: 21 years and above</li>
          <li>Stable income source</li>
          <li>Good credit score</li>
          <li>Minimum employment tenure: 2 years</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Required Documents</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Identity proof (Aadhar card, PAN card, etc.)</li>
          <li>Address proof (utility bills, rental agreement, etc.)</li>
          <li>Income proof (salary slips, bank statements, etc.)</li>
          <li>Property documents (sale agreement, property tax receipts, etc.)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Compare Home Loans from Top Banks and Institutions</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-400 text-gray-800">Institution</th>
                <th className="px-4 py-2 border border-gray-400 text-gray-800">Interest Rate</th>
                <th className="px-4 py-2 border border-gray-400 text-gray-800">Tenure</th>
              </tr>
            </thead>
            <tbody>
              {[
                { institution: "SBI", rate: "6.75% - 8.00%", tenure: "5 - 30 years" },
                { institution: "HDFC Bank", rate: "6.90% - 8.15%", tenure: "5 - 30 years" },
                { institution: "ICICI Bank", rate: "7.00% - 8.25%", tenure: "5 - 30 years" },
                { institution: "Axis Bank", rate: "7.10% - 8.35%", tenure: "5 - 30 years" },
                { institution: "Yes Bank", rate: "7.20% - 8.45%", tenure: "5 - 30 years" },
                { institution: "Kotak Mahindra Bank", rate: "7.25% - 8.50%", tenure: "5 - 30 years" },
                { institution: "IndusInd Bank", rate: "7.35% - 8.60%", tenure: "5 - 30 years" },
                { institution: "HSBC", rate: "7.45% - 8.70%", tenure: "5 - 30 years" },
                { institution: "Standard Chartered", rate: "7.55% - 8.80%", tenure: "5 - 30 years" },
                { institution: "Citibank", rate: "7.65% - 8.90%", tenure: "5 - 30 years" },
                { institution: "Bajaj Finserv", rate: "7.75% - 9.00%", tenure: "5 - 30 years" },
                { institution: "Tata Capital", rate: "7.85% - 9.10%", tenure: "5 - 30 years" },
                { institution: "Mahindra Finance", rate: "7.95% - 9.20%", tenure: "5 - 30 years" },
                { institution: "Fullerton India", rate: "8.05% - 9.30%", tenure: "5 - 30 years" },
                { institution: "Capital First", rate: "8.15% - 9.40%", tenure: "5 - 30 years" },
              ].map((loan, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border border-gray-400 text-gray-700">{loan.institution}</td>
                  <td className="px-4 py-2 border border-gray-400 text-gray-700">{loan.rate}</td>
                  <td className="px-4 py-2 border border-gray-400 text-gray-700">{loan.tenure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Loan Application Process</h2>
        <ul className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Check eligibility and gather required documents</li>
          <li>Choose the preferred bank and loan scheme</li>
          <li>Fill out the loan application form</li>
          <li>Submit the form along with documents to the bank</li>
          <li>Wait for the loan approval and disbursement</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">EMI Calculator</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
          <div className="elfsight-app-9b8cf743-c2ee-40b0-804f-a6ef5eb89520" data-elfsight-app-lazy></div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">FAQ</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <details className="mb-4">
            <summary className="font-semibold text-gray-800">What is the maximum tenure for a home loan?</summary>
            <p className="mt-2 text-gray-700">The maximum tenure for a home loan is typically up to 30 years.</p>
          </details>
          <details className="mb-4">
            <summary className="font-semibold text-gray-800">Can I get tax benefits on a home loan?</summary>
            <p className="mt-2 text-gray-700">Yes, you can avail tax benefits on both the principal and interest components of the home loan under the Income Tax Act.</p>
          </details>
          <details className="mb-4">
            <summary className="font-semibold text-gray-800">What is the minimum credit score required for a home loan?</summary>
            <p className="mt-2 text-gray-700">A minimum credit score of 650 is generally required, but a score of 700 and above is preferred for better interest rates.</p>
          </details>
        </div>
      </section>
    </div>
  );
}

export default HomeLoanPage;
