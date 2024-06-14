import Head from 'next/head';
import Link from 'next/link';

function GoldLoanPage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-yellow-50">
      <Head>
        <title>Gold Loans | What is a Gold Loan?</title>
        <meta name="description" content="Learn about gold loans, their types, benefits, eligibility criteria, and how to apply. Compare rates and tenure from top banks and institutions." />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">What is a Gold Loan?</h1>
        <p className="text-lg text-gray-600 mt-4">A gold loan allows you to borrow money against your gold ornaments or coins. It's a quick and easy way to meet urgent financial needs.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Types of Gold Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Short-term Gold Loans</li>
          <li>Long-term Gold Loans</li>
          <li>Bullet Repayment Gold Loans</li>
          <li>Overdraft Against Gold</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Benefits of Gold Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Quick disbursement of funds</li>
          <li>No credit history required</li>
          <li>Low interest rates</li>
          <li>Minimal documentation</li>
          <li>Flexible repayment options</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Applicant should be an Indian citizen</li>
          <li>Age: 18 years and above</li>
          <li>Ownership of gold ornaments or coins</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Required Documents</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Identity proof (Aadhar card, PAN card, etc.)</li>
          <li>Address proof (utility bills, rental agreement, etc.)</li>
          <li>Photographs of the applicant</li>
          <li>Gold ownership proof (if applicable)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Compare Gold Loans from Top Banks and Institutions</h2>
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
                { institution: "SBI", rate: "7.50% - 8.50%", tenure: "6 months - 3 years" },
                { institution: "HDFC Bank", rate: "8.00% - 9.00%", tenure: "6 months - 3 years" },
                { institution: "ICICI Bank", rate: "8.50% - 9.50%", tenure: "6 months - 3 years" },
                { institution: "Axis Bank", rate: "9.00% - 10.00%", tenure: "6 months - 3 years" },
                { institution: "Yes Bank", rate: "9.50% - 10.50%", tenure: "6 months - 3 years" },
                { institution: "Kotak Mahindra Bank", rate: "10.00% - 11.00%", tenure: "6 months - 3 years" },
                { institution: "IndusInd Bank", rate: "10.50% - 11.50%", tenure: "6 months - 3 years" },
                { institution: "HSBC", rate: "11.00% - 12.00%", tenure: "6 months - 3 years" },
                { institution: "Standard Chartered", rate: "11.50% - 12.50%", tenure: "6 months - 3 years" },
                { institution: "Citibank", rate: "12.00% - 13.00%", tenure: "6 months - 3 years" },
                { institution: "Bajaj Finserv", rate: "12.50% - 13.50%", tenure: "6 months - 3 years" },
                { institution: "Tata Capital", rate: "13.00% - 14.00%", tenure: "6 months - 3 years" },
                { institution: "Mahindra Finance", rate: "13.50% - 14.50%", tenure: "6 months - 3 years" },
                { institution: "Fullerton India", rate: "14.00% - 15.00%", tenure: "6 months - 3 years" },
                { institution: "Capital First", rate: "14.50% - 15.50%", tenure: "6 months - 3 years" },
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
    </div>
  );
}

export default GoldLoanPage;
