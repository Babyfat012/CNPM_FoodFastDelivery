import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { SiGreasyfork } from "react-icons/si";

const Nav = () => {
  const [loggedIn,setLoggedIn] = useState(true);

  return (
    <div className="h-20 w-full fixed z-[50] bg-white top-0">
      <div className="p-5 flex justify-center shadow-md ">
        <nav className="flex justify-between w-full">
          <div className="flex justify-center items-center ml-12">
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-yellow-400 flex justify-center items-center">
                <span>fo</span>
                <SiGreasyfork className='rotate-90 mt-1 mr-[1px]' size={20} />
                <span>die</span>
              </span>
              <span>Buddy</span>
            </h1>
          </div>
          <ul className="hidden md:flex gap-x-7 justify-center items-center font-poppins text-[17px] font-medium tracking-[0.01em]">
           
        
            <Link to="/DeliveryPartnerLoginRegister">
              <li className="hover:cursor-pointer hover:scale-[0.975]">
                Delivery partner
              </li>
            </Link>
             <Link to= "/RestaurantLoginRegister"> 
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Restaurant login
            </li>
            </Link>

            <Link to="/UserLoginRegister">
              <li className="flex justify-center items-center gap-x-1 hover:cursor-pointer hover:scale-[0.975]">
                Login/Register <VscAccount size={20} />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
