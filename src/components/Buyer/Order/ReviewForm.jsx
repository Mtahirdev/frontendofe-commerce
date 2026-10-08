import React, { useState } from "react";

const ReviewForm = ({ setreview }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("whaiti");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let arr = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    try {
      setLoading(true);

      // Connect this callback to your API submission function.
      await onSubmitReview?.({
        rating,
        comment: comment.trim(),
      });
    } catch (err) {
      setError(err.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] h-[85%] rounded-2xl border border-[#E2E8F0] bg-white mt-20 pt-5 pb-5 gap-2 flex flex-col justify-center items-center"
    >
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-black ">Rate this product</h3>

        <p className="mt-1 text-sm leading-6 text-[#64748B]">
          How was your experience with this product?
        </p>
      </div>

      {/* Star Rating */}
      <div className="mb-6">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Choose product rating"
        >
          {arr.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl transition duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5A36] sm:text-4xl ${
                star <= rating
                  ? "text-amber-400"
                  : "text-slate-300 hover:text-amber-300"
              }`}
            >
              ★
            </button>
          ))}

          <span className="ml-1 text-sm font-medium text-[#64748B]">
            {rating} out of 5
          </span>
        </div>
      </div>

      {/* Review Input */}
      <div className="mb-5">
        <label
          htmlFor="product-review"
          className="mb-2 block text-sm font-semibold text-[#0B1730]"
        >
          Your review
        </label>

        <textarea
          id="product-review"
          value={comment}
          placeholder="Write your experience with this product..."
          rows={4}
          cols={36}
          maxLength={1000}
          required
          className="min-h-28 w-full resize-y rounded-xl border border-[#CBD5E1] bg-white p-3 text-sm leading-6 text-[#0B1730] outline-none transition placeholder:text-[#94A3B8] focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/15 sm:p-4"
        />

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-[#64748B]">{comment.length}/1000</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="w-40 rounded-xl bg-[#0B1730] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162442] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1730] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
        >
          Submit Review
        </button>
        <button
          onClick={() => setreview(false)}
          className="w-40 rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#162442] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1730] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
