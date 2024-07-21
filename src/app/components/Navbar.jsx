"use client";
import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "sonner";

const NavBarItem = ({ title, classprops }) => (
  <li
    className={`mx-4 cursor-pointer ${classprops}`}
    onClick={() => {
      if (title === "Contact Us") {
        window.location.href = "/contact";
      } else if (title === "Services") {
        window.location.href = "/services";
      } else if (title === "My Cart") {
        toast("Please Login", { type: "warning" }, { duration: 50 });
      }
    }}
  >
    {title == "My Cart" ? (
      <AiOutlineShoppingCart className="mr-1" size={30}/>
    ) : title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="fixed gradient-bg-welcome w-full flex md:justify-center justify-between items-center p-2">
      <div className="md:flex-[0.5] flex-initial justify-center items-center lg:ml-10">
        <img
          src={"/SwiftShip-logos_white.png"}
          alt="logo"
          className="w-20 h-20 cursor-pointer rounded-full"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial ml-auto">
        {["My Cart", "Services", "Contact Us"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li
          className="bg-[#A952e3] py-2 px-7 ml-4 mr-0 rounded-full cursor-pointer hover:bg-[#A546bd]"
          onClick={() => {
            window.location.href = "/signup";
          }}
        >
          Signup
        </li>
        <li
          className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Login
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-center rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["My Cart", "Services", "Contact Us"].map((item, index) => (
              <NavBarItem
                key={item + index}
                title={item}
                classprops="my-2 text-lg"
              />
            ))}
            <li
              className="bg-[#A952e3] py-2 px-7 my-2 rounded-full cursor-pointer hover:bg-[#A546bd]"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Signup
            </li>
            <li
              className="bg-[#2952e3] py-2 px-7 my-2 mr-1.5 rounded-full cursor-pointer hover:bg-[#2546bd]"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
