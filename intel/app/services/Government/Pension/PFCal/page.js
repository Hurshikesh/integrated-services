'use client';
import { useState } from "react";

const PFCalculator = () => {
  const [investment, setInvestment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("half-yearly");
  const [pfAmount, setPfAmount] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const annualInterestRate = parseFloat(interestRate) / 100;
    let contributionPerPeriod, periodsPerYear;

    switch (frequency) {
      case "monthly":
        contributionPerPeriod = parseFloat(investment);
        periodsPerYear = 12;
        break;
      case "quarterly":
        contributionPerPeriod = parseFloat(investment);
        periodsPerYear = 4;
        break;
      case "half-yearly":
        contributionPerPeriod = parseFloat(investment);
        periodsPerYear = 2;
        break;
      case "yearly":
        contributionPerPeriod = parseFloat(investment);
        periodsPerYear = 1;
        break;
      default:
        return;
    }

    const totalPeriods = parseInt(duration) * periodsPerYear;
    const periodInterestRate = annualInterestRate / periodsPerYear;

    let totalAmount = 0;

    for (let period = 0; period < totalPeriods; period++) {
      totalAmount += contributionPerPeriod;
      totalAmount += totalAmount * periodInterestRate;
    }

    setPfAmount(totalAmount.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start justify-center pt-10">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-full flex">
        <div className="w-1/2 pr-4">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            PF Calculator
          </h1>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-gray-700 mb-2" htmlFor="investment">
                Investment Amount (INR)
              </label>
              <input
                type="number"
                id="investment"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter investment amount"
                required
              />
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-gray-700 mb-2" htmlFor="interestRate">
                Current PF Interest Rate (FY 2023-24) (%)
              </label>
              <input
                type="number"
                step="0.01"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter interest rate"
                required
              />
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-gray-700 mb-2" htmlFor="duration">
                Duration of Investment (Years)
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter duration"
                required
              />
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-gray-700 mb-2" htmlFor="frequency">
                Frequency of Investment
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Calculate PF
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-4">
          <div className="rounded-lg p-4 h-full flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-center text-black">Calculated PF Amount</h2>
            <p className="text-center text-2xl mt-2 text-black">₹{pfAmount}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">What is EPF?</h2>
        <p className="text-gray-700 mb-4">
        The Employee Provident Fund or the EPF is a retirement benefits scheme for salaried employees in the private sector. The Employees Provident Fund Organisation (EPFO) manages the EPF. Any organisation or firm with 20 or more employees gets covered under the EPFO. The Employees Provident Fund Organisation operates three schemes.It is compulsory for all employees who draw a basic salary of less than Rs 15,000 per month to become members of the EPF. You cannot opt-out of the EPF scheme once you become a scheme member. An employee can make an enhanced contribution up to a maximum of 100% of the basic salary to the voluntary provident fund. The employer will not match the contributi
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Formula to Calculate EPF Amount</h2>
        <p className="text-gray-700 mb-4">
          To understand how to calculate EPF, let us have an example.
        </p>
        <p className="text-gray-700 mb-4">
          Employee basic salary + dearness allowance = Rs 14,000 <br/>
          Employee contribution towards the EPF = 12% * 14,000 = Rs 1,680 <br/>
          Employer contribution towards the EPF = 3.67% * 14,000 = Rs 514 <br/>
          Employer contribution towards EPS = 8.33% * 14,000 = Rs 1,166. <br/>
          The total contribution by the employer and employee towards the EPF account of the employee = Rs 1,680 + Rs 514 = Rs 2,194. <br/>
          Now with the applicable interest rate of 8.25% p.a, the monthly earned interest will be; 8.25%/12 = 0.679% <br/>
          Assuming the employee joined the Firm XYZ in April 2019. The total EPF contribution for April will be Rs 2,194. The EPF scheme will not pay any interest for April. <br/>
          The total amount in EPF account May 2019 = Rs 4,388 (Rs 2,194 + Rs 2,194). <br/>
          He receives an interest of Rs 4,388 * 0.679% = Rs 29.79. <br/>
        </p>
        <p className="text-gray-700 mb-4">
          The calculation will be continued until the retirement age (60) of the employee. The calculator will show the PF final amount.
        </p>

        <h2 className="text-2xl font-bold text-blue-600 mb-4">How can PF Calculator help you?</h2>
        <p className="text-gray-700 mb-4">
          <strong>Financial Planning Support:</strong> A PF calculator aids salaried individuals in planning their retirement by providing a clear view of their projected Provident Fund (PF) balance at retirement, helping them understand how much they need to save monthly to meet their financial goals.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Effortless Tracking:</strong> It automates the calculation of total contributions and interest accrued over time, eliminating the hassle of manual calculations and ensuring accuracy in the tracking of their retirement savings.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Immediate Updates:</strong> Salaried users receive immediate updates on any changes in PF policies, such as adjustments in interest rates or contribution ratios, enabling them to make informed decisions about their investments and savings strategy.
        </p>

        <h2 className="text-2xl font-bold text-blue-600 mb-4">How to use the ClearTax PF Calculator?</h2>
        <div className="text-gray-700 mb-4">
          <ol className="list-decimal ml-5">
            <li>Enter contribution amount for Provident Fund.</li>
            <li>Current EPF Interest Rate is automatically entered.</li>
            <li>Now, fill the duration column by using the slider.</li>
            <li>In the end, select the frequency of the contribution which is Monthly, Quarterly, Half-yearly, and Yearly.</li>
            <li>The ClearTax EPF Calculator will show you the EPF funds that will be available to you at retirement.</li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 mb-4">Benefits of using the EPF Calculator</h2>
        <p className="text-gray-700 mb-4">
          <strong>The EPF Calculator shows you the accumulated amount in your EPF fund at retirement:</strong> You get an idea of the retirement corpus, which helps you manage other investments in a better manner.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Increase your contribution towards retirement:</strong> If you feel the corpus accumulated at retirement is not enough to meet your requirements, then increase the percentage of your contributions to get a bigger corpus at retirement.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Easy to use:</strong> The EPF Calculator is easy to use and shows the EPF corpus at your retirement in seconds.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Plan your retirement:</strong> You can increase the contribution percentage if you want to retire at an early age. You get an idea of the EPF corpus at different retirement periods, which helps you get the finances for early retirement.
        </p>

        <h2 className="text-2xl font-bold text-blue-600 mb-4">What must you know about EPF contributions?</h2>
        <p className="text-gray-700 mb-4">
          <strong>Employee and Employer Contributions:</strong> EPF contributions are not taken only from your salary. Your employer is also bound to make equal contributions to your EPF account every month.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Link Aadhaar and Bank Account:</strong> Employees must link the Aadhaar number and the bank account with the UAN.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Nomination:</strong> You can nominate anyone for your EPF account. In case of the account holder’s demise, the nominee will receive the account balance. You can change the nominee by submitting Form 2 to your company’s finance department or the EPFO department.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Employee Pension Scheme (EPS):</strong> About 8.33% of your employer’s monthly contribution (up to Rs 1,250) will be redirected to the EPS. This will help you get a monthly pension once you retire and fulfil certain conditions.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Withdrawals:</strong> If you decide to quit your job and withdraw the balance from your EPF account once and for all, you will only be able to remove a portion of the amount based on the purpose of withdrawal. Some valid reasons are unemployment, retirement, purchase of land, purchase/construction of a house, renovating a house, wedding, education, repaying a home loan, and medical reasons.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Continuous Employment:</strong> If you are a retired person and have had continuous employment for the last 10 years, you can withdraw 100% of the EPS account balance. In case, you don’t have continuous employment for the last 10 years, you can only withdraw money from the EPS account, according to the slabs based on your previous drawn salary as mentioned in the Table ‘D’ below:
        </p>
        <table className="table-auto w-full mb-4">
          <thead className="text-gray-400">
            <tr>
              <th className="px-4 py-2">Number of Years of Service</th>
              <th className="px-4 py-2">Eligible Portion of EPS Withdrawal</th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">1.02</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">1.99</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">2.98</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">3.99</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">5.02</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">6</td>
              <td className="border px-4 py-2">6.07</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">7</td>
              <td className="border px-4 py-2">7.13</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">8</td>
              <td className="border px-4 py-2">8.22</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">9</td>
              <td className="border px-4 py-2">9.33</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-700 mb-4">
          Irrespective of the last drawn salary, the maximum salary considered for this calculation is Rs 15,000. Therefore, if your last drawn salary is Rs 42,000 and you have worked for eight consecutive years, the EPS amount you can withdraw is Rs 15,000 * 8.22 = Rs 1,23,300.
        </p>

        <p className="text-gray-700 mb-4">
          <strong>Account Continuity:</strong> You don’t have to withdraw the EPF contributions or close the account when you switch jobs. Just provide your UAN to the new employer. The new PF number created by your new employer will still be under your existing UAN. You must manually transfer the PF account balance from your previous employer to the PF account created by your new employer by filling Form 13. Alternatively, you can fill Form 11 to transfer the PF contributions to the new account automatically.
        </p>

        <h2 className="text-2xl font-bold text-blue-600 mb-4">Checking Your PF Balance</h2>
        <div className="text-gray-700 mb-4">
          <ol className="list-decimal ml-5">
            <li>Visit the EPF portal and click on the ‘e-Passbook’ option available on the homepage.</li>
            <li>Enter your UAN number, password, captcha and click on the ‘Sign In’ button.</li>
            <li>Click on the ‘Passbook’ option.</li>
            <li>Select the ‘Member ID’ and your PF balance will be displayed on the screen.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PFCalculator;

