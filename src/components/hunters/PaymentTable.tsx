const earnings = [
  {
    id: 1,
    timePeriod: "Nov 2022",
    expectedPeriod: "Dec 1st 2022",
    amount: "$499.99",
  },
  {
    id: 2,
    timePeriod: "Oct 2022",
    expectedPeriod: "Nov 1st 2022",
    amount: "$4999.99",
  },
  {
    id: 3,
    timePeriod: "Sept 2022",
    expectedPeriod: "Oct 1st 2022",
    amount: "$1299.99",
  },
  {
    id: 4,
    timePeriod: "Aug 2022",
    expectedPeriod: "Sept 1st 2022",
    amount: "$1900.99",
  },
];

export default function PaymentTable() {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Earnings</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the bounties that you are hunting
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Time Period
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Expected Payment Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {earnings.map((earning) => (
                      <tr key={earning.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {earning.timePeriod}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {earning.amount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {earning.expectedPeriod}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
