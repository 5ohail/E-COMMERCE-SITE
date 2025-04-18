import React, { useEffect, useRef, useState } from 'react';

const Contact = () => {


  return (
    <>
      <div
        id="contact"
        className="relative flex h-[80vh] justify-evenly items-center"
      >
        <div className="flex justify-center items-center text-8xl font-bold h-full w-[49.5%] mt-10 ">
          <h1><span className='text-red-500'>Get</span> in <br />Touch</h1>
        </div> 
        <div className="border-[1px] border-gray-200 h-full translate-y-7 "></div>
        <div className="w-[49.5%] flex justify-evenly items-center flex-col">
          <div className='font-bold text-4xl mb-10'><h1>Contact Us</h1></div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="ml-1 font-semibold">Full Name</label>
              <input name="fullname" type="text" className="border-[1px] rounded h-10 w-96 px-2 font-light" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="ml-1 font-semibold">Email</label>
              <input type="email" name="email" className="border-[1px] rounded h-10 w-96 px-2 font-light" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="text" className="ml-1 font-semibold">Message</label>
              <textarea name="text" className="border-[1px] rounded h-30 w-96 p-2 font-light" />
            </div>
            <button className="bg-black text-white rounded py-2">Submit</button>
          </form>
        </div>

       
      </div>
      <div className="w-[25.5%] h-[100vh] flex justify-center items-left flex-col ml-10">
          <div className='font-bold text-4xl mb-10'><h1>Contact Us</h1></div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="ml-1 font-semibold">Full Name</label>
              <input name="fullname" type="text" className="border-[1px] rounded h-10 w-96 px-2 font-light" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="ml-1 font-semibold">Email</label>
              <input type="email" name="email" className="border-[1px] rounded h-10 w-96 px-2 font-light" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="text" className="ml-1 font-semibold">Message</label>
              <textarea name="text" className="border-[1px] rounded h-30 w-96 p-2 font-light" />
            </div>
            <button className="bg-black text-white rounded py-2">Submit</button>
          </form>
        </div>
    </>
  );
};

export default Contact;
