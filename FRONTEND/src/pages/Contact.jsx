import React from "react";

export default function Contact() {
  return (
    <div className="max-w-4xl translate-y-[1rem] mx-auto py-10 px-4 bg-white min-h-screen text-black">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>

      <p className="text-gray-600 mb-8">
        Have any questions or issues? Feel free to reach out. Our team will get back to you shortly.
      </p>

      <form className="bg-white border border-gray-300 rounded-2xl p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="First Name"
            required
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <textarea
          rows="4"
          placeholder="Message"
          required
          className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white py-3 px-6 rounded-xl text-lg font-medium hover:bg-gray-800 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}