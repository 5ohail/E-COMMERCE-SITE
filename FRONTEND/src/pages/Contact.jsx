import React from "react";

export default function Contact() {
  return (
    <div className="flex items-center justify-center w-full"> 
    <div className="lg:max-w-4xl lg:translate-y-[1rem] mx-auto lg:py-10 lg:px-4 translate-y-[4rem] bg-white min-h-screen text-black">
      <h1 className="lg:text-4xl font-bold lg:mb-4 lg:mx-0 text-2xl mx-2">Contact Us</h1>

      <p className="text-gray-600 lg:mb-8 lg:mx-0 mx-2 ">
        Have any questions or issues? Feel free to reach out. Our team will get back to you shortly.
      </p>

      <form action="https://formsubmit.co/sohailansarisa319@gmail.com" className="bg-white lg:border border-gray-300 lg:rounded-2xl lg:p-8 lg:space-y-6" method="POST">
        <div className="lg:flex lg:gap-6 lg:justify-center">
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            required
            className="w-full border border-gray-300 bg-white text-black lg:rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
            className="w-full border border-gray-300 bg-white text-black lg:rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border border-gray-300 bg-white text-black lg:rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full border border-gray-300 bg-white text-black lg:rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <textarea
          rows="4"
          name="message"
          placeholder="Message"
          required
          className="w-full border border-gray-300 bg-white text-black lg:rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white lg:py-3 lg:px-6 lg:rounded-xl text-lg font-medium hover:bg-gray-800 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
    </div>
  );
}