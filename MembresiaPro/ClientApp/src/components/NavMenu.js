import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='fixed w-full max-w-full z-50'>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow bg-navBar" light>
        <a className='text-black hover:text-white' href="/#inicio"><img src="https://drunkers.com.mx/wp-content/uploads/2023/06/Diseno-sin-titulo-8.png" className='max-h-[7vh]' alt="" /></a>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="navbar-nav flex justify-center" navbar>
            <NavItem>
              {/* <NavLink tag={Link} className="text-black font-bold text-lg hover:text-white mx-5" to="/#tarjeta-regalo">Game Pass</NavLink> */}
              <a className='text-black font-bold text-lg hover:text-white mx-5' href="/#game-pass">Game Pass</a>
            </NavItem>
            <NavItem>
              <a className='text-black font-bold text-lg hover:text-white mx-5' href="/#subcripcion">Suscripción</a>
            </NavItem>
            <NavItem>
              <a className='text-black font-bold text-lg hover:text-white mx-5' href="/#xbox-live">XBOX Live</a>
            </NavItem>
            <NavItem>
              <a className='text-black font-bold text-lg hover:text-white mx-5' href="/#tarjeta-regalo">Tarjeta de Regalo</a>
            </NavItem>
            <NavItem className='md:hidden mt-4'>
            <a className="text-white font-bold text-lg bg-orange-600 p-2 rounded-xl" href="https://drunkers.com.mx">Volver a la tienda</a>
            </NavItem>
          </Nav>
        </Collapse>
          <Nav className="navbar-nav ml-auto justify-end sm:hidden md:flex" navbar>
            <NavItem>
              <a className="text-white font-bold text-lg bg-orange-600 p-3 rounded-xl" href="https://drunkers.com.mx">Volver a la tienda</a>
            </NavItem>
          </Nav>
      </Navbar>
    </header>
  );
};

export default NavMenu;