import Head from 'next/head';
import Link from 'next/link';

function EducationLoanPage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-gray-50">
      <Head>
        <title>Education Loans | What is an Education Loan?</title>
        <meta name="description" content="Learn about education loans, its types, benefits, and how to apply. Compare rates and tenure from top banks and institutions." />
      </Head>

      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">What is an Education Loan?</h1>
        <p className="text-lg text-gray-600">An education loan helps you finance your higher education expenses, including tuition fees, books, and living expenses.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Types of Education Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>Undergraduate Loans</li>
          <li>Postgraduate Loans</li>
          <li>Professional Course Loans</li>
          <li>Study Abroad Loans</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits of Education Loans</h2>
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>Flexible repayment options</li>
          <li>Lower interest rates</li>
          <li>Moratorium period</li>
          <li>Tax benefits under Section 80E</li>
          <li>Coverage of a wide range of expenses</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>Applicant should be an Indian citizen</li>
          <li>Secured admission to a recognized institution in India or abroad</li>
          <li>Co-applicant (parent/guardian) with a stable income source</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Required Documents</h2>
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>Admission letter from the educational institution</li>
          <li>Mark sheets of the previous qualifying examination</li>
          <li>Income proof of the co-applicant</li>
          <li>Identity and address proof of the applicant and co-applicant</li>
          <li>Bank statements of the co-applicant</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Compare Education Loans from Top Banks and Institutions</h2>
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
                { institution: "SBI", rate: "8.50% - 10.50%", tenure: "5 - 15 years" },
                { institution: "HDFC Bank", rate: "9.00% - 11.00%", tenure: "5 - 15 years" },
                { institution: "ICICI Bank", rate: "9.50% - 11.50%", tenure: "5 - 15 years" },
                { institution: "Axis Bank", rate: "10.00% - 12.00%", tenure: "5 - 15 years" },
                { institution: "Yes Bank", rate: "10.50% - 12.50%", tenure: "5 - 15 years" },
                { institution: "Kotak Mahindra Bank", rate: "11.00% - 13.00%", tenure: "5 - 15 years" },
                { institution: "IndusInd Bank", rate: "11.50% - 13.50%", tenure: "5 - 15 years" },
                { institution: "HSBC", rate: "12.00% - 14.00%", tenure: "5 - 15 years" },
                { institution: "Standard Chartered", rate: "12.50% - 14.50%", tenure: "5 - 15 years" },
                { institution: "Citibank", rate: "13.00% - 15.00%", tenure: "5 - 15 years" },
                { institution: "Bajaj Finserv", rate: "13.50% - 15.50%", tenure: "5 - 15 years" },
                { institution: "Tata Capital", rate: "14.00% - 16.00%", tenure: "5 - 15 years" },
                { institution: "Mahindra Finance", rate: "14.50% - 16.50%", tenure: "5 - 15 years" },
                { institution: "Fullerton India", rate: "15.00% - 17.00%", tenure: "5 - 15 years" },
                { institution: "Capital First", rate: "15.50% - 17.50%", tenure: "5 - 15 years" },
              ].map((loan, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 border border-black text-black">{loan.institution}</td>
                  <td className="px-4 py-2 border border-black text-black">{loan.rate}</td>
                  <td className="px-4 py-2 border border-black text-black">{loan.tenure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Loan Application Process</h2>
        <ul className="list-decimal pl-6 space-y-2 text-black">
          <li>Check eligibility and gather required documents</li>
          <li>Choose the preferred bank and loan scheme</li>
          <li>Fill out the loan application form</li>
          <li>Submit the form along with documents to the bank</li>
          <li>Wait for the loan approval and disbursement</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">EMI Calculator</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
          <div className="elfsight-app-9b8cf743-c2ee-40b0-804f-a6ef5eb89520" data-elfsight-app-lazy></div>
        </div>
      </section>

    </div>
  );
}

export default EducationLoanPage;
