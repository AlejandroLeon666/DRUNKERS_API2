import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-screen max-w-full overflow-x-hidden z-50 bg-navBar">
      <nav className="flex items-center justify-between max-h-[10vh] p-4">
        <div className="flex items-center space-x-4">
          <a href="/#inicio" className="text-black hover:text-white">
            <img
              src="https://drunkers.com.mx/wp-content/uploads/2023/06/Diseno-sin-titulo-8.png"
              className="max-h-[7vh]"
              alt=""
            />
          </a>
        </div>

        <div className="md:flex sm:hidden">
        <a
              href="/#game-pass"
              className=" font-bold hover:animate-bounce mx-5 text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Game Pass
            </a>

            <a
              href="/#subcripcion"
              className=" font-bold hover:animate-bounce mx-5 text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Suscripción
            </a>

            <a
              href="/#xbox-live"
              className=" font-bold hover:animate-bounce mx-5 text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Xbox Live
            </a>

            <a
              href="/#tarjeta-regalo"
              className=" font-bold hover:animate-bounce mx-5 text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Tarjeta de Regalo
            </a>
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="https://drunkers.com.mx"
            className="text-white font-bold text-lg bg-orange-600 p-3 rounded-xl"
          >
            Volver a la tienda
          </a>
        </div>

        <div className="sm:block md:hidden">
          <button
            onClick={toggleNavbar}
            className=" focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              >mas</path>
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-navBar">
          <div className="flex flex-col items-center space-y-2 p-4">
            <a
              href="/#game-pass"
              className=" font-bold text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Game Pass
            </a>

            <a
              href="/#subcripcion"
              className=" font-bold text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Suscripción
            </a>

            <a
              href="/#xbox-live"
              className=" font-bold text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Xbox Live
            </a>

            <a
              href="/#tarjeta-regalo"
              className=" font-bold text-lg hover-nav-items border-b-2 border-orange-600 py-2"
            >
              Tarjeta de Regalo
            </a>

            <a
              href="https://drunkers.com.mx"
              className=" font-bold text-lg bg-orange-600 p-2 rounded-xl"
            >
              Volver a la tienda
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavMenu;
