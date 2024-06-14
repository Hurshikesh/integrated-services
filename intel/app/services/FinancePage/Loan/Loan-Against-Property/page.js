import Head from 'next/head';
import Link from 'next/link';

function LoanAgainstPropertyPage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-blue-50">
      <Head>
        <title>Loan Against Property | What is a Loan Against Property?</title>
        <meta name="description" content="Learn about loans against property, their types, benefits, eligibility criteria, and how to apply. Compare rates and tenure from top banks and institutions." />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">What is a Loan Against Property?</h1>
        <p className="text-lg text-gray-600 mt-4">A loan against property allows you to borrow money by mortgaging your residential or commercial property. It's a secure way to fund your financial needs with lower interest rates.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Types of Loan Against Property</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Residential Property Loan</li>
          <li>Commercial Property Loan</li>
          <li>Lease Rental Discounting</li>
          <li>Second Mortgage Loan</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Benefits of Loan Against Property</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Lower interest rates compared to personal loans</li>
          <li>Longer repayment tenure</li>
          <li>Retain ownership of the property</li>
          <li>Large loan amounts available</li>
          <li>Flexible usage of loan amount</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Applicant should be an Indian citizen</li>
          <li>Age: 21 years and above</li>
          <li>Ownership of residential or commercial property</li>
          <li>Stable income source</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Required Documents</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Identity proof (Aadhar card, PAN card, etc.)</li>
          <li>Address proof (utility bills, rental agreement, etc.)</li>
          <li>Income proof (salary slips, bank statements, etc.)</li>
          <li>Property documents (ownership papers, property tax receipts, etc.)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Compare Loans Against Property from Top Banks and Institutions</h2>
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
                { institution: "SBI", rate: "9.00% - 11.00%", tenure: "5 - 20 years" },
                { institution: "HDFC Bank", rate: "9.50% - 11.50%", tenure: "5 - 20 years" },
                { institution: "ICICI Bank", rate: "10.00% - 12.00%", tenure: "5 - 20 years" },
                { institution: "Axis Bank", rate: "10.50% - 12.50%", tenure: "5 - 20 years" },
                { institution: "Yes Bank", rate: "11.00% - 13.00%", tenure: "5 - 20 years" },
                { institution: "Kotak Mahindra Bank", rate: "11.50% - 13.50%", tenure: "5 - 20 years" },
                { institution: "IndusInd Bank", rate: "12.00% - 14.00%", tenure: "5 - 20 years" },
                { institution: "HSBC", rate: "12.50% - 14.50%", tenure: "5 - 20 years" },
                { institution: "Standard Chartered", rate: "13.00% - 15.00%", tenure: "5 - 20 years" },
                { institution: "Citibank", rate: "13.50% - 15.50%", tenure: "5 - 20 years" },
                { institution: "Bajaj Finserv", rate: "14.00% - 16.00%", tenure: "5 - 20 years" },
                { institution: "Tata Capital", rate: "14.50% - 16.50%", tenure: "5 - 20 years" },
                { institution: "Mahindra Finance", rate: "15.00% - 17.00%", tenure: "5 - 20 years" },
                { institution: "Fullerton India", rate: "15.50% - 17.50%", tenure: "5 - 20 years" },
                { institution: "Capital First", rate: "16.00% - 18.00%", tenure: "5 - 20 years" },
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

export default LoanAgainstPropertyPage;
