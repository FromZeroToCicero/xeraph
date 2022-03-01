import React from "react";

import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col py-4 md:px-24 sm:px-12 px-8 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center mt-4 mb-12">
        <div className="flex flex-[0.5] justify-center items-end">
          <img src={logo} alt="Xeraph logo" className="w-12" />
          <span className="text-logo">eraph</span>
        </div>

        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
            <p
              key={index}
              className="text-white text-base text-center sm:mx-2 sm:my-0 m-2 cursor-pointer"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">Come join us</p>
        <p className="text-white text-sm text-center">info@xeraphapp.com</p>
      </div>

      <div className="w-full h-[0.25px] bg-gray-400 mt-5" />

      <div className="w-full flex justify-between items-center mt-3">
        <p className="text-white text-sm text-center">&copy; Xeraph 2022</p>
        <p className="text-white text-sm text-center">All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
