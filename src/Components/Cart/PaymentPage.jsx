import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const productDetails = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const deliveryFee = 50;
    const platformFee = 49;
    const orderTotal = totalPrice - 87 + deliveryFee + platformFee;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        cardMonth: '',
        cardYear: '',
        cvv: ''
    });

    const [selectedPayment, setSelectedPayment] = useState('creditDebit'); // Default to credit/debit
    const [isFormComplete, setIsFormComplete] = useState(false);

    // Update form completion status
    useEffect(() => {
        const { cardNumber, cardName, cardMonth, cardYear, cvv } = formData;
        if (cardNumber && cardName && cardMonth && cardYear && cvv) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [formData]);

    const handlePaymentSuccess = () => {
        if (selectedPayment === 'cashOnDelivery') {
            alert('Order Placed Successfully!');
        } else {
            alert('Payment Successful!');
        }
        alert("Thank you! You will receive your product soon.");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i); // Current year and 10 future years

    return (
        <div className="p-4 min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="bg-blue-800 text-white p-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-2xl font-bold">Walmart</div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto flex mt-8 px-4">
                {/* Left Section */}
                <div className="flex-grow pr-4">
                    {/* Redeem Section */}
                    <section className="bg-white border border-gray-200 rounded-lg shadow-md mb-8 p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Select Redeem Option</h2>
                            <button className="bg-yellow-600 text-white py-2 px-4 rounded">Verify with OTP</button>
                        </div>
                        <div className="mt-4">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                CapitalOne Points
                                <span className="ml-2 text-red-500">NEW</span>
                            </label>
                            <p className="text-gray-600">Your current balance is ₹0.3</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold">Have a Gift Card?</h3>
                            <p className="text-gray-600">Add it to Walmart Wallet to pay for your orders</p>
                            <button className="text-blue-600 mt-2">Add Gift Card</button>
                        </div>
                    </section>

                    {/* Payment Mode Section */}
                    <section className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-4">Select Payment Mode</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Credit/Debit Card Section */}
                            <div
                                className={`border rounded-lg p-4 shadow bg-gray-50 cursor-pointer ${selectedPayment === 'creditDebit' ? 'border-blue-600' : ''}`}
                                onClick={() => setSelectedPayment('creditDebit')}
                            >
                                <h3 className="font-semibold mb-2">Credit/Debit Card</h3>
                                {selectedPayment === 'creditDebit' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Name on Card"
                                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                        />
                                        <div className="flex mb-2">
                                            <select
                                                className="w-1/2 p-2 mr-2 border border-gray-300 rounded"
                                                name="cardMonth"
                                                value={formData.cardMonth}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Month</option>
                                                {months.map((month) => (
                                                    <option key={month} value={month}>
                                                        {month}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className="w-1/2 p-2 border border-gray-300 rounded"
                                                name="cardYear"
                                                value={formData.cardYear}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Year</option>
                                                {years.map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                        />
                                    </>
                                )}
                            </div>

                            {/* NetBanking */}
                            <div
                                className={`border rounded-lg p-4 shadow bg-gray-50 cursor-pointer ${selectedPayment === 'netBanking' ? 'border-blue-600' : ''}`}
                                onClick={() => setSelectedPayment('netBanking')}
                            >
                                <h3 className="font-semibold mb-2">Net Banking</h3>
                                {selectedPayment === 'netBanking' && (
                                    <div className="mt-4">
                                        <p>Select your bank from the list below:</p>
                                        <select className="w-full p-2 border border-gray-300 rounded mt-2">
                                            <option value="">Select Bank</option>
                                            <option value="bank1">SBI</option>
                                            <option value="bank2">Axis Bank</option>
                                            <option value="bank3">HDFC</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Wallet */}
                            <a
                                href="https://walmart.capitalone.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`border rounded-lg p-4 shadow bg-gray-50 cursor-pointer block hover:border-blue-600 transition-all duration-200 ease-in-out ${selectedPayment === 'wallet' ? 'border-blue-600' : ''}`}
                            >
                                <h3 className="font-semibold mb-2">Wallet</h3>
                            </a>
                            {/* UPI */}
                            <div
                                className={`border rounded-lg p-4 shadow bg-gray-50 cursor-pointer ${selectedPayment === 'upi' ? 'border-blue-600' : ''}`}
                                onClick={() => setSelectedPayment('upi')}
                            >
                                <h3 className="font-semibold mb-2">UPI</h3>
                                {selectedPayment === 'upi' && (
                                    <div className="mt-4">
                                        <p>Enter your UPI ID:</p>
                                        <input
                                            type="text"
                                            placeholder="UPI ID"
                                            className="w-full p-2 border border-gray-300 rounded mt-2"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Cash on Delivery */}
                            <div
                                className={`border rounded-lg p-4 shadow bg-gray-50 cursor-pointer ${selectedPayment === 'cashOnDelivery' ? 'border-blue-600' : ''}`}
                                onClick={() => setSelectedPayment('cashOnDelivery')}
                            >
                                <h3 className="font-semibold mb-2">Cash on Delivery</h3>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <button
                            className={`bg-yellow-800 text-white py-2 px-4 rounded mt-4 w-full ${selectedPayment === 'creditDebit' && !isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={selectedPayment === 'creditDebit' && !isFormComplete}
                            onClick={handlePaymentSuccess}
                        >
                            {selectedPayment === 'cashOnDelivery' ? 'Place Order' : 'Pay Securely'}
                        </button>
                    </section>
                </div>

                {/* Order Summary */}
                <div className="w-1/4 bg-white border border-gray-200 rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="mb-4">
                        <p>Bag total: ${totalPrice}</p>
                        <p>Bag discount: $-87.00</p>
                        <p>Delivery Fee: ${deliveryFee}</p>
                        <p>Platform Fee: ${platformFee}</p>
                        <hr className="my-5" />
                        <p className="font-bold">Order Total: ${orderTotal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
