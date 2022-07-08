import React from "react";
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {


  return (
    <nav className="  bg-slate-500 border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com" className="flex items-center">
          
          <span className="self-center text-3xl font-mono whitespace-nowrap text-white  underline decoration-yellow-200">
            Challenge Alkemy
          </span>
        </a>
        
        <div className=" w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link to="/">
              <a
                href="/"
                className="text-lg block py-2 pr-4 pl-3 text-white hover:bg-gray-600 md:hover:bg-transparent  rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:hover:text-yellow-200"
                aria-current="page"
              >
                Balance
              </a>
              </Link>
            </li>
            <li>
              <Link to="/Ingresar/new">
              
              <a
                href="/Ingresar/new"
                className="text-lg block py-2 pr-4 pl-3 text-white  border-b hover:bg-gray-600 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow-200 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Income/Expense
              </a>
              </Link>
            </li>
            
            
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
