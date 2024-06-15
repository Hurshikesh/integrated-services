import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tax Saving Methods</title>
        <meta name="description" content="Learn about various types of taxes, tax saving methods, and how to file income tax." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-center text-black">Tax</h1>

          <section id="types-of-taxes" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Different Types of Taxes</h2>
            <div className="space-y-4 text-black">
              <div>
                <h3 className="text-xl font-semibold text-black">Income Tax</h3>
                <p>Income tax is a tax imposed on individuals or entities based on their income or profits. It is progressive, meaning the tax rate increases as the taxpayer's income increases.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">Corporate Tax</h3>
                <p>Corporate tax is levied on the profits of corporations. The tax rate can vary depending on the country and the corporation's income.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">Sales Tax</h3>
                <p>Sales tax is a consumption tax imposed on the sale of goods and services. It is typically calculated as a percentage of the purchase price.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">Property Tax</h3>
                <p>Property tax is levied on the value of real estate or other property. The amount of tax is typically based on the value of the property.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">Capital Gains Tax</h3>
                <p>Capital gains tax is imposed on the profit from the sale of assets or investments. It applies to both individuals and corporations.</p>
              </div>
            </div>
          </section>

          <section id="tax-saving-methods" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Tax Saving Methods</h2>
            <h3 className="text-xl font-semibold mb-2 text-black">Section 80C</h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>Investments: PPF, EPF, NSC, ELSS, SSY, Tax Saving FD.</li>
              <li>Expenses: Life Insurance Premiums, Tuition Fees, Home Loan Principal Repayment.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-4 text-black">Section 80D</h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>Health Insurance Premiums for self, spouse, children, and parents.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-4 text-black">Section 80E</h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>Education Loan Interest.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-4 text-black">Section 80G</h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>Donations to specified funds and charitable institutions.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-4 text-black">Other Sections</h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>Section 24(b): Deduction for interest on home loan.</li>
              <li>Section 80EE: Additional deduction for first-time homebuyers.</li>
              <li>Section 80TTB: Deduction for interest on deposits for senior citizens.</li>
            </ul>
          </section>

          <section id="how-to-file-income-tax" className="mb-12 text-black">
            <h2 className="text-2xl font-bold mb-4 text-black">How to File Income Tax</h2>
            <ol className="list-decimal pl-6 space-y-2 text-black">
              <li>Gather Required Documents.</li>
              <li>Register on the Income Tax Department Website.</li>
              <li>Link Aadhaar with PAN.</li>
              <li>Choose the Correct ITR Form.</li>
              <li>Fill in the Details.</li>
              <li>Verify the Data.</li>
              <li>Compute Tax Liability.</li>
              <li>Submit and E-Verify.</li>
            </ol>
          </section>

          <section id="faq" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">FAQs</h2>
            <div className="space-y-4 text-black">
              <div>
                <h3 className="text-lg font-semibold">Q1. What is the due date for filing income tax returns?</h3>
                <p>A: Typically, the due date for individual taxpayers is July 31st of the assessment year.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Q2. Can I file my income tax return after the due date?</h3>
                <p>A: Yes, you can file a belated return before December 31st of the assessment year, but a late fee may be applicable.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Q3. How can I check my income tax refund status?</h3>
                <p>A: You can check the status of your refund on the Income Tax e-Filing Portal or through the TIN NSDL website.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Q4. What is Form 26AS?</h3>
                <p>A: Form 26AS is a consolidated tax statement that includes details of tax deducted/collected at source, advance tax payments, and self-assessment taxes paid.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Q5. How can I reduce my tax liability legally?</h3>
                <p>A: You can reduce your tax liability by investing in tax-saving instruments like PPF, NSC, ELSS, claiming deductions under various sections such as 80C, 80D, 80E, and by planning your finances efficiently.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
