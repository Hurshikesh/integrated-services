import Link from "next/link";
const Pension = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <main className="mx-auto p-6 w-full">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
              India’s Leading Gratuity & Actuarial Valuation Consultant
            </h1>
            <p className="text-lg text-center text-gray-700 mb-4">
              Trusted by 2500+ Happy Clients and Auditors Across India.
            </p>
            <p className="text-lg text-center text-gray-700 mb-4">
              Actuarial Consultancy in Life Insurance, General Insurance, and Pensions.
            </p>
          </div>
  
          <p className="text-black mb-6">
            Companies provide various Employee Benefits to their Employees. Some of them are statutory – like Gratuity, Pension, Provident Fund, Leave, etc. Since most of these benefits are paid in the future, it needs to be valued and provisioned for in the books of account. An Actuary performs Actuarial Valuations of these benefits and provides the liabilities that need to be disclosed in the books of account.
            
          </p>
          <Link href="/services/Government/Pension/Consultants"><button className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 w-72 mx-auto">Check out top finance consultancies</button></Link>
  
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Gratuity</h2>
            <div className="flex gap-3">
                <img src="https://img.indiafilings.com/learn/wp-content/uploads/2017/11/12010236/Gratuity.jpg" className="w-74 h-52"></img>
                <p className="text-gray-700">
            Gratuity is a statutory benefit payable to the employees by the companies. It is calculated as per the Payment of Gratuity Act, 1972. For companies, it is an open-ended liability and is calculated from the date of joining. The annual increase in the liability on gratuity increases for the company as the additional past service gratuity will increase with increased salary.
For employers, it is important & imperative to consider the impact of this on their annual liability and make provisions in the book of accounts in the P&L Account, failing which, the liability and the profits might be understated or overstated and also, the provisions of Accounting Standards may not be compiled.
            </p>
            </div>
            <Link href="/services/Government/Pension/GratuityCal"><button className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 w-72">Calculate Gratuity</button></Link>
            
          </div>

          <h2 className="text-2xl font-bold text-black mb-4">Actuarial Valuation of Leave Liability</h2>
  
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex">
            
            <div className="mb-6">
                <img src="https://kapadiaglobal.com/wp-content/uploads/2019/09/Accumulating-Type.jpg" alt="image"></img>

              <h3 className="text-xl font-bold text-blue-600 mb-2">Accumulating-Type</h3>
              <p className="text-gray-700">
                When the leaves are accrued by the employees while working with the company, wherein the unused leaves are carried forward to future years. They are mostly privilege leaves.
              </p>
            </div>
  
            <div>
            <img src="https://kapadiaglobal.com/wp-content/uploads/2019/09/Vested-Type.jpg" alt="image"></img>

              <h3 className="text-xl font-bold text-blue-600 mb-2">Vested-Type</h3>
              <p className="text-gray-700">
                When the leaves are accrued by the employees while working with the company, wherein the unused leaves are carried forward to future years. They are mostly privilege leaves.
              </p>
            </div>
          </div>
        </main>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUy5YDiNgCKAEI-Xjmbme9ytaIkdV-ynYYA&s" className="w-full h-64"></img>
        <div className="bg-white rounded-lg shadow-md p-6 mt-14">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Pension</h2>
            <div className="flex gap-3">
                <img src="	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTed-91r2UZ0bBC46C48Q1KdKJthKJEvATLQ&s" className="w-74 h-52"></img>
            <p className="text-gray-700">
            Our Actuarial Consulting on Pension is an integrated service we offer to SMEs & Corporate companies in India. We factor in the market and the economic regulatory parameters that affect the pensions schemes and provide a detailed assessment and consultation to enable them to manage their pension schemes efficiently & effectively.
With our comprehensive approach, we provide accurate valuation and also advise on Scheme Funding and Designing Investment Strategies, Risk Management & Corporate Transactions.
            </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-14">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Provident Fund</h2>
            <div className="flex gap-3">
                <img src="	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLjCbhwzZRQPHvwgpI1LXCrP22F46lugVNYg&s" className="w-74 h-52"></img>
            <p className="text-gray-700">
            Employee Provident Fund is a defined contribution scheme, wherein, there’s an equal contribution of a fixed sum to the Employee Provident Fund Organization from both, the employer and the employee. In case the provident funds have exempt status, the employer is responsible for the provision of benefits and must ensure that the fund earns at least equivalent to EPFO rate or more.
As actuarial consultants, we help our client make provision in the book of accounts for any probable and possible shortfalls in the funds and certify the sufficiency of funds.
            </p>
            </div>
            <Link href="/services/Government/Pension/PFCal"><button className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 w-72">Calculate PF</button></Link>
          </div>
          
      </div>
    );
  };
  
  export default Pension;
  