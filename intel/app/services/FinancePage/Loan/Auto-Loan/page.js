import Head from 'next/head';
import Link from 'next/link';

function AutoLoanPage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-gray-50">
      <Head>
        <title>Auto Loans | What is an Auto Loan?</title>
        <meta name="description" content="Learn about auto loans, their types, benefits, and how to apply. Compare rates and tenure from top banks and institutions." />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">What is an Auto Loan?</h1>
        <p className="text-lg text-gray-600 mt-4">An auto loan helps you finance the purchase of a new or used vehicle, allowing you to pay over time with affordable installments.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Types of Auto Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>New Car Loans</li>
          <li>Used Car Loans</li>
          <li>Refinance Auto Loans</li>
          <li>Lease Buyout Loans</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Benefits of Auto Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Fixed interest rates and EMIs</li>
          <li>No collateral required</li>
          <li>Flexible repayment options</li>
          <li>Quick processing and disbursal</li>
          <li>Improved credit score with timely repayments</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Applicant should be an Indian citizen</li>
          <li>Minimum age: 21 years</li>
          <li>Maximum age at loan maturity: 65 years</li>
          <li>Stable income source</li>
          <li>Good credit history</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Required Documents</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Identity proof (Aadhar card, PAN card, etc.)</li>
          <li>Address proof (utility bills, rental agreement, etc.)</li>
          <li>Income proof (salary slips, bank statements, etc.)</li>
          <li>Vehicle details and proforma invoice</li>
          <li>Photographs of the applicant</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Compare Auto Loans from Top Banks and Institutions</h2>
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
                { institution: "SBI", rate: "7.50% - 9.50%", tenure: "1 - 7 years" },
                { institution: "HDFC Bank", rate: "8.00% - 10.00%", tenure: "1 - 7 years" },
                { institution: "ICICI Bank", rate: "8.50% - 10.50%", tenure: "1 - 7 years" },
                { institution: "Axis Bank", rate: "9.00% - 11.00%", tenure: "1 - 7 years" },
                { institution: "Yes Bank", rate: "9.50% - 11.50%", tenure: "1 - 7 years" },
                { institution: "Kotak Mahindra Bank", rate: "10.00% - 12.00%", tenure: "1 - 7 years" },
                { institution: "IndusInd Bank", rate: "10.50% - 12.50%", tenure: "1 - 7 years" },
                { institution: "HSBC", rate: "11.00% - 13.00%", tenure: "1 - 7 years" },
                { institution: "Standard Chartered", rate: "11.50% - 13.50%", tenure: "1 - 7 years" },
                { institution: "Citibank", rate: "12.00% - 14.00%", tenure: "1 - 7 years" },
                { institution: "Bajaj Finserv", rate: "12.50% - 14.50%", tenure: "1 - 7 years" },
                { institution: "Tata Capital", rate: "13.00% - 15.00%", tenure: "1 - 7 years" },
                { institution: "Mahindra Finance", rate: "13.50% - 15.50%", tenure: "1 - 7 years" },
                { institution: "Fullerton India", rate: "14.00% - 16.00%", tenure: "1 - 7 years" },
                { institution: "Capital First", rate: "14.50% - 16.50%", tenure: "1 - 7 years" },
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

export default AutoLoanPage;
