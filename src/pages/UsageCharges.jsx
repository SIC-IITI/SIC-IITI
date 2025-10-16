import React from 'react';

function UsageCharges() {
  const charges = [
    { item: "SEM (per hour)", internal: "₹ 1,500", external: "₹ 3,000" },
    { item: "XRD (per sample)", internal: "₹ 500", external: "₹ 1,200" },
    { item: "AFM (per hour)", internal: "₹ 1,200", external: "₹ 2,500" },
    { item: "Raman (per hour)", internal: "₹ 800", external: "₹ 1,800" },
    { item: "NMR (per hour)", internal: "₹ 1,000", external: "₹ 2,200" },
    { item: "LCMS (per sample)", internal: "₹ 600", external: "₹ 1,500" },
  ];

  return (
    <section className="flex space-y-8 px-4 py-12 max-w-7xl justify-center mx-auto flex-col ">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Usage Charges</h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          Standardized charges for sustainable operation. Rates may vary based on sample type, complexity, and specialized requirements. Contact us for detailed quotes.
        </p>
      </div>

      <div className="rounded-lg border border-blue-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Instrument / Service</th>
                <th className="px-6 py-4 text-left font-semibold">Internal Users</th>
                <th className="px-6 py-4 text-left font-semibold">External Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-200">
              {charges.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                  <td className="px-6 py-4 font-medium text-blue-900">{row.item}</td>
                  <td className="px-6 py-4 text-gray-600">{row.internal}</td>
                  <td className="px-6 py-4 text-gray-600">{row.external}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Important Notes:</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Internal users include students, faculty, and staff of IIT Indore</li>
          <li>• External users include academia, industries, and research institutions</li>
          <li>• Discounts available for bulk bookings and long-term collaborations</li>
          <li>• Sample preparation charges may apply separately</li>
          <li>• For custom analysis requirements, please contact us for a detailed quote</li>
        </ul>
      </div>
    </section>
  );
}

export default UsageCharges;
