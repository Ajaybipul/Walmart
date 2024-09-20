import React, { useState } from 'react';

const FeedbackComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    console.log("Rating:", selectedRating);
    console.log("Feedback Type:", feedbackType);
    console.log("Feedback Text:", feedbackText);
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      // Clear form after submission
      setSelectedRating(0);
      setFeedbackType('');
      setFeedbackText('');
    }, 2000); // Close the modal after 2 seconds
  };

  return (
    <div className="bg-blue-100 p-8 text-center">
      <h2 className="text-lg mb-4">We’d love to hear what you think!</h2>
      <button 
        className="border-2 border-black px-4 py-2 rounded-full"
        onClick={() => setIsModalOpen(true)}
      >
        Give feedback
      </button>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {isSubmitted ? (
              <div className="text-center">
                <h3 className="text-xl font-bold">Thanks for your feedback!</h3>
              </div>
            ) : (
              <>
                <h3 className="text-xl mb-4">Your feedback matters! Help us improve the website</h3>

                {/* Rating stars */}
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`text-2xl ${star <= selectedRating ? 'text-black' : 'text-gray-400'}`}
                      onClick={() => handleRatingClick(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p>{selectedRating <= 2 ? 'Fair' : 'Good'}</p>

                {/* Feedback options */}
                <div className="my-4">
                  <p className="mb-2">Sorry to hear it. What was the problem?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Website Experience', 'Recent Order', 'In-Store Experience', 'Customer Service', 'Delivery/Pickup Options', 'Other'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFeedbackType(type)}
                        className={`border px-4 py-2 rounded ${feedbackType === type ? 'border-black' : 'border-gray-300'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text area */}
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Please tell us more (Max 300 characters)"
                  maxLength={300}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                  Share with Us
                </button>
              </>
            )}

            {/* Close Modal Button */}
            <button 
              className="absolute top-2 right-2 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;
