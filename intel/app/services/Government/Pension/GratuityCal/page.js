'use client'
import { useState } from "react";

const GratuityCalculator = () => {
  const [basicPay, setBasicPay] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");
  const [gratuity, setGratuity] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    // Gratuity calculation formula: (Basic Pay * Years of Service * 15) / 26
    const calculatedGratuity = (parseFloat(basicPay) * parseInt(yearsOfService) * 15) / 26;
    setGratuity(calculatedGratuity.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start justify-center pt-10">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-full flex">
        <div className="w-1/2 pr-4">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Gratuity Calculator
          </h1>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-gray-700 mb-2" htmlFor="basicPay">
                Basic Pay (INR)
              </label>
              <input
                type="number"
                id="basicPay"
                value={basicPay}
                onChange={(e) => setBasicPay(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter basic pay"
                required
              />
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-gray-700 mb-2" htmlFor="yearsOfService">
                Years of Service: {yearsOfService}
              </label>
              <input
                type="range"
                id="yearsOfService"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(e.target.value)}
                min="1"
                max="40"
                step="1"
                className="w-full px-3 py-2 rounded-lg appearance-none bg-blue-100 bg-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Calculate Gratuity
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-4">
           
            <div className=" rounded-lg p-4  h-full flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold text-center text-black">Calculated Gratuity</h2>
              <p className="text-center text-2xl mt-2 text-black">₹{gratuity}</p>
            </div>
          
            </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">What is Gratuity?</h2>
        <p className="text-gray-700 mb-4">
          Gratuity refers to the amount that an employer pays his employee, in return for services offered by him to the company. However, only those employees who have been employed by the company for five years or more are given the gratuity amount. It is governed by the Payment of Gratuity Act, 1972.
        </p>
        <p className="text-gray-700 mb-4">
          The employee can get the gratuity before five years if he/she gets disabled in an accident or due to a disease. Gratuity mainly depends on your last drawn salary and the years of service which are rendered to the Company.
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Don't fall behind your taxes!</h2>
        <p className="text-gray-700 mb-4">
          With ClearTax's 3-step filing, get your taxes done early and enjoy peace of mind.
          <a href="#" className="text-blue-600 underline ml-2">File Now</a>
          <span className="block mt-2">Use ITR55 for flat 55% Off</span>
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">What are the Eligibility Criteria for Payment of Gratuity?</h2>
        <div className="text-gray-700 mb-4">
          To receive the gratuity, you must meet the following eligibility criteria:
          <ul className="list-disc ml-5">
            <li>You should be eligible for superannuation.</li>
            <li>You should have retired from service.</li>
            <li>You should have resigned after continuous employment of five years with the company.</li>
            <li>In case of your death the gratuity is paid to the nominee, or to you on disablement on account of a sickness or an accident.</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">What is a Gratuity Calculator?</h2>
        <p className="text-gray-700 mb-4">
          The Gratuity Calculator would calculate the gratuity amount based on the formula for calculating the gratuity.
        </p>
        <p className="text-gray-700 mb-4">
          Gratuity Formula:
        </p>
        <p className="text-gray-700 mb-4">
          (15 * your last drawn salary * tenure of working) / 26.
        </p>
        <p className="text-gray-700 mb-4">
          A gratuity calculator is a tool which gives you an estimate of the amount that you would receive, on quitting the job, after rendering a continuous five years of service. It is a handy tool to calculate the gratuity on retirement from the company.
        </p>
        <p className="text-gray-700 mb-4">
          You must enter the inputs of the last drawn salary and the tenure of continuous service with the company. The last drawn salary includes your basic salary, the dearness allowance, and the commission that you have received from sales.
        </p>
        <p className="text-gray-700 mb-4">
          The gratuity calculator would show you the gratuity figure in seconds. It is simple to use and can be used any number of times.
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Gratuity Calculation – What is the Formula for Calculating the Gratuity?</h2>
        <p className="text-gray-700 mb-4">
          The amount of gratuity for employees whose employer is covered under the Gratuity Act can be calculated using the formula:
        </p>
        <p className="text-gray-700 mb-4">
          Gratuity = n*b*15 / 26
        </p>
        <p className="text-gray-700 mb-4">
          Where n = Tenure of service completed in the company
          b = Last drawn basic salary + dearness allowance
        </p>
        <p className="text-gray-700 mb-4">
          For example, you have worked with the XYZ company for a period of 15 years. Your last drawn basic salary along with dearness allowance was Rs 30,000. Hence:
        </p>
        <p className="text-gray-700 mb-4">
          The amount of gratuity = 15 * 30,000 * 15 / 26 = Rs 2,59,615
        </p>
        <p className="text-gray-700 mb-4">
          Two points must be noted here:
        </p>
        <p className="text-gray-700 mb-4">
          As per the Gratuity Act, the amount of gratuity cannot be more than Rs 20 lakh. Any excesses would be treated as ex-gratia.
        </p>
        <p className="text-gray-700 mb-4">
          If the number of years you have worked in the last year of employment is more than six months, then it will be rounded to the nearest figure. Suppose your tenure of service is 16 years 7 months, then you receive the gratuity for 17 years. Otherwise, its for 16 years if it happens to be 16 years 4 months.
        </p>
        <p className="text-gray-700 mb-4">
          For employees whose employer is not covered under the Gratuity Act, the gratuity amount would be calculated as per the half-month salary on each completed year of service.
        </p>
        <p className="text-gray-700 mb-4">
          The formula is: (15 * Your last drawn salary * the working tenure) / 30.
        </p>
        <p className="text-gray-700 mb-4">
          For example, you have a basic salary of Rs 30,000. You have rendered continuous service of 7 years and the employer is not covered under the Gratuity Act.
        </p>
        <p className="text-gray-700 mb-4">
          Gratuity Amount = (15 * 30,000 * 7) / 30 = Rs 1,05,000.
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">How to Use the ClearTax Gratuity Calculator?</h2>
        <p className="text-gray-700 mb-4">
          Follow these steps and calculate your gratuity using the ClearTax Gratuity Calculator:
        </p>
        <p className="text-gray-700 mb-4">
          You must enter the basic salary and the dearness allowance if applicable, using the slider.
        </p>
        <p className="text-gray-700 mb-4">
          You then enter the number of years of service with the company.
        </p>
        <p className="text-gray-700 mb-4">
          The gratuity calculator would calculate the total gratuity amount payable to you in seconds.
        </p>
        <p className="text-gray-700 mb-4">
          You can recalculate the gratuity anytime, by changing the input sliders.
        </p>
        <p className="text-gray-700 mb-4">
          The gratuity will be calculated instantly when you move the sliders.
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Benefits of Using the ClearTax Gratuity Calculator</h2>
        <p className="text-gray-700 mb-4">
          The ClearTax Gratuity Calculator is an easy-to-use generic tool, where you enter the basic salary and the years of service. It gives you an estimate of the gratuity you would receive, after five or more years of continuous service.
        </p>
        <p className="text-gray-700 mb-4">
          The gratuity calculator shows you the gratuity figures in seconds. It helps you plan your finances by investing the gratuity in a smart manner, for a maximum return.
        </p>
        <p className="text-gray-700 mb-4">
          You can use the gratuity calculator from the comfort of your home or practically anywhere to get the gratuity amount.
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">What are the Taxation Rules for Gratuity?</h2>
        <p className="text-gray-700 mb-4">
          The tax treatment of the gratuity amount depends on the type of employee who has to receive the gratuity.
        </p>
        <p className="text-gray-700 mb-4">
          The amount of gratuity received by any government employee (whether central/state/local authority) is exempt from the income tax.
        </p>
        <p className="text-gray-700 mb-4">
          Any other eligible private employee whose employer is covered under the Payment of Gratuity Act. Here, the least of the following three amounts will be exempt from income tax:
        </p>
        <p className="text-gray-700 mb-4">
          Rs 20 lakh.
        </p>
        <p className="text-gray-700 mb-4">
          The actual amount of gratuity received.
        </p>
        <p className="text-gray-700 mb-4">
          The eligible gratuity.
        </p>
        <p className="text-gray-700 mb-4">
          For example, your employer had paid you a gratuity of Rs 12 lakh. As per the gratuity calculation in the earlier example, you are eligible for a gratuity amount of Rs 2,59,615. The government has set Rs 20 lakh as the upper tax-free limit. The lowest of the three figures is Rs 2,59,615, which is exempt from tax. You must pay tax on the remaining amount of Rs 9,40,385 as per your income tax slab.
        </p>
        <p className="text-gray-700 mb-4">
          Do note that in your entire working life, the maximum tax-exempt gratuity amount you may claim, cannot go beyond Rs 20 lakh.
        </p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Gratuity Amount Investment Options</h2>
        <p className="text-gray-700 mb-4">
          Investing the gratuity amount involves taking into account various options that help in addressing the financial goals based on risk appetite, and investment horizon. Here’s the lowdown on a few of the tools to consider when it comes to investing the gratuity amount:
        </p>
        <p className="text-gray-700 mb-4">
          Fixed Deposits (FDs): FDs with banks or post offices are low-risk investment vehicles that provide guaranteed returns. They provide capital preservation and are ideal for those who look forward to safety over higher returns.
        </p>
        <p className="text-gray-700 mb-4">
          Public Provident Fund (PPF): This is a tax-efficient, long-term investment tool with a lock-in period of 15 years. It offers tax benefits under Section 80C of the Income-Tax Act (ITA), 1961, and is a preferred choice when it comes to retirement savings.
        </p>
        <p className="text-gray-700 mb-4">
          Employee Provident Fund (EPF): For those looking forward to a new job, such individuals can opt to transfer their gratuity funds to the EPF account. Along with safety, EPF provides tax benefits and is designed for retirement savings.
        </p>
        <p className="text-gray-700 mb-4">
          National Pension System (NPS): This is a voluntary, long-term retirement savings system that offers tax benefits. It allows an individual to invest in a mix of equity and debt instruments, thus providing the potential for higher returns.
        </p>
        <p className="text-gray-700 mb-4">
          Equity Mutual Funds: These invest in stocks and can provide potentially higher returns in the long run. An individual has the choice from various categories of mutual funds depending on their financial goal, risk appetite, and investment horizon.
        </p>
        <p className="text-gray-700 mb-4">
          Debt Mutual Funds: These primarily invest in fixed-income securities such as bonds and provide stable returns with lower risk as against equity funds.
        </p>
        <p className="text-gray-700 mb-4">
          Sovereign Gold Bonds (SGBs): These provide an individual with the option to invest in gold in a paperless form and offer tax benefits. SGBs come with a fixed tenure and interest rate.
        </p>
        <p className="text-gray-700 mb-4">
          Real Estate: This can be a viable option, either via direct property purchase or indirectly through Real Estate Investment Trusts (REITs).
        </p>
        <p className="text-gray-700 mb-4">
          Stock Market: Those with a good understanding of the stock market and have a higher risk appetite, can mull over investing directly in stocks or equity shares.
        </p>
        <p className="text-gray-700 mb-4">
          Bank Recurring Deposits (RDs): These offer regular savings and are ideal for those who look forward to investing a fixed sum of money every month.
        </p>
        <p className="text-gray-700 mb-4">
          It is important to note that diversifying investments across various asset classes can aid in managing risk. In addition, take into account factors such as liquidity needs, taxation, and inflation when making investment decisions. Also, regularly review and adjust the investment portfolio as per the financial situation and changes in goals.
        </p>
      </div>
    </div>
  );
};

export default GratuityCalculator;
