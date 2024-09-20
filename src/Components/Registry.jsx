import React from 'react';
import FeedbackComponent from './Feedback';

const RegistryPage = () => {
  return (
    <div className="container mx-auto p-6">
     <img src="images/r.png" alt="Saving" className="w-full h-auto mb-8" />
      {/* Registry Type Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <img src="images/wed.png" alt="Wedding registry" className="mx-auto"/>
          <p className="mt-2">Wedding Registry</p>
        </div>
        <div className="text-center">
          <img src="images/baby.png" alt="Baby registry" className="mx-auto"/>
          <p className="mt-2">Baby Registry</p>
        </div>
        <div className="text-center">
          <img src="images/occ.png" alt="Any occasion registry" className="mx-auto"/>
          <p className="mt-2">Any Occasion Registry</p>
        </div>
        <div className="text-center">
          <img src="images/classr.png" alt="Classroom registry" className="mx-auto"/>
          <p className="mt-2">Classroom Registry</p>
        </div>
      </div>

      {/* Manage Your Registry Section */}
      <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Manage Your Registry</h2>
          <p className="text-gray-600">Add or replace items at any time, from anywhere.</p>
          <button className="mt-2 px-4 py-2 border border-black rounded-full">Manage Now</button>
        </div>
        <img src="images/hand.png" alt="Manage registry illustration" className="w-24"/>
      </div>

      {/* Find a Registry Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Find a Registry</h2>
        <p className="text-gray-600 mb-4">* Required fields</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2">Type of Registry</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Baby</option>
              <option>Wedding</option>
              <option>Any occasion</option>
              <option>Classroom</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">First Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block mb-2">Last Name*</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div>
            <label className="block mb-2">State*</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Select a state</option>
              <option>Alabama</option>
              <option>California</option>
              <option>New York</option>
              {/* Add more states */}
            </select>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Find Registry</button>
      </div>

      {/* FAQ Section Below */}
      <div className="p-8 mt-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Registry FAQ</h1>
        <div className="flex">
          <div className="w-1/3 pr-8">
            <ul>
              <li className="font-bold mb-4">How do I know a gift has been purchased?</li>
              <li className="text-gray-500 mb-4">How do I change the item to purchased on the registry?</li>
              <li className="text-gray-500 mb-4">How do I checkout in-store?</li>
              <li className="text-gray-500">Registry FAQs</li>
            </ul>
          </div>
          <div className="w-2/3 pl-8 border-l">
            <h2 className="text-xl font-bold mb-4">How do I know a gift has been purchased?</h2>
            <p className="mb-4">
              As the registrant, you can check which gifts have been purchased for you on your registry page.
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li className="mb-2">
                Once the gift has been shipped, we’ll send you the tracking details. We won’t reveal the gift or how much it cost.
              </li>
              <li>
                After the item has been delivered, we’ll share the gift message & who purchased it for you. We’ll also include a gift receipt for returns*.
              </li>
            </ol>
            <p className="mb-4 text-sm">
              *Certain items, including marketplace items, are not available to return in-store. Please see our returns policy for details:{" "}
              <a href="https://www.walmart.com/cp/returns/1231920" className="text-blue-600">Returns Policy</a>
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">Gift Return Policy</button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-bold">Terms & conditions</h3>
          <p className="text-sm text-gray-500">
            *Subject to eligibility. Payment options through Affirm are provided by these lending partners:{" "}
            <a href="https://affirm.com/lenders" className="text-blue-600">affirm.com/lenders</a>
          </p>
        </div>
      </div>
      <FeedbackComponent/>
    </div>
  );
};

export default RegistryPage;
