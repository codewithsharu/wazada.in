import React from 'react';
import { Link } from 'react-router-dom';

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Cancellation and Refund Policy</h1>
            <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
              Back to Home
            </Link>
          </div>

          <div className="prose prose-indigo max-w-none">
            <div className="text-sm text-gray-500 mb-8 border-b pb-4">
              Last updated on Apr 20 2025
            </div>
            
            <div className="space-y-6 text-gray-700">
              <p className="leading-relaxed">
                We understand that sometimes you may need to cancel an order. If you wish to cancel your order, please contact us within 3 days of placing your order.
              </p>

              <p className="leading-relaxed">
                If your order has already been shipped, we will not be able to cancel it. However, you should contact us within 3 days of receiving the product to initiate a return.
              </p>

              <p className="leading-relaxed">
                Refunds will be processed within 7-10 business days after we receive the returned product. The refund will be issued to the original payment method used during the purchase.
              </p>

              <p className="leading-relaxed">
                For any questions regarding cancellations or refunds, please contact us at <a href="mailto:meritees.in@gmail.com" className="text-indigo-600 hover:text-indigo-800">meritees.in@gmail.com</a> or call us at <a href="tel:+919235401677" className="text-indigo-600 hover:text-indigo-800">+91 92354 01677</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationAndRefund;
