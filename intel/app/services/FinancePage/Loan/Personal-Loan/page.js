import Head from 'next/head';
import Link from 'next/link';

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
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/unsecured-loans" className="text-blue-500 hover:underline">
              Unsecured Loans
            </Link>
          </li>
          <li>
            <Link href="/secured-loans" className="text-blue-500 hover:underline">
              Secured Loans
            </Link>
          </li>
          <li>
            <Link href="/debt-consolidation-loans" className="text-blue-500 hover:underline">
              Debt Consolidation Loans
            </Link>
          </li>
          <li>
            <Link href="/wedding-loans" className="text-blue-500 hover:underline">
              Wedding Loans
            </Link>
          </li>
          <li>
            <Link href="/home-renovation-loans" className="text-blue-500 hover:underline">
              Home Renovation Loans
            </Link>
          </li>
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
                { institution: "SBI", rate: "10.50% - 15.50%", tenure: "1 - 5 years" },
                { institution: "HDFC Bank", rate: "11.25% - 16.25%", tenure: "1 - 5 years" },
                { institution: "ICICI Bank", rate: "11.50% - 17.50%", tenure: "1 - 5 years" },
                { institution: "Axis Bank", rate: "12.00% - 18.00%", tenure: "1 - 5 years" },
                { institution: "Yes Bank", rate: "12.50% - 19.50%", tenure: "1 - 5 years" },
                { institution: "Kotak Mahindra Bank", rate: "13.00% - 20.00%", tenure: "1 - 5 years" },
                { institution: "IndusInd Bank", rate: "13.50% - 21.50%", tenure: "1 - 5 years" },
                { institution: "HSBC", rate: "14.00% - 22.00%", tenure: "1 - 5 years" },
                { institution: "Standard Chartered", rate: "14.50% - 23.50%", tenure: "1 - 5 years" },
                { institution: "Citibank", rate: "15.00% - 24.00%", tenure: "1 - 5 years" },
                { institution: "Bajaj Finserv", rate: "15.50% - 25.50%", tenure: "1 - 5 years" },
                { institution: "Tata Capital", rate: "16.00% - 26.00%", tenure: "1 - 5 years" },
                { institution: "Mahindra Finance", rate: "16.50% - 27.50%", tenure: "1 - 5 years" },
                { institution: "Fullerton India", rate: "17.00% - 28.50%", tenure: "1 - 5 years" },
                { institution: "Capital First", rate: "17.50% - 29.50%", tenure: "1 - 5 years" },
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">EMI Calculator</h2>
        <div className="bg-white p-4 rounded shadow-md">
          <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
          <div className="elfsight-app-9b8cf743-c2ee-40b0-804f-a6ef5eb89520" data-elfsight-app-lazy></div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
