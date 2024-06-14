import Head from 'next/head';

function PersonalLoan() {
  return (
    <div>
      <Head>
        <title>Personal Loan</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Personal Loan</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name of Bank</th>
            <th className="px-4 py-2">Rate of Interest</th>
            <th className="px-4 py-2">Tenure of Loan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">SBI</td>
            <td className="px-4 py-2">10.5%</td>
            <td className="px-4 py-2">1-5 years</td>
          </tr>
          <tr>
            <td className="px-4 py-2">HDFC</td>
            <td className="px-4 py-2">11.25%</td>
            <td className="px-4 py-2">1-7 years</td>
          </tr>
          <tr>
            <td className="px-4 py-2">ICICI</td>
            <td className="px-4 py-2">10.75%</td>
            <td className="px-4 py-2">1-6 years</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PersonalLoan;