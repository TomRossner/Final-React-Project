import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import {AiOutlineMenu} from "react-icons/ai";
import {RxCross1} from "react-icons/rx";

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);
  const { user } = useAuth();
  return (
    <header>
        <nav>
            <ul>
              <Link className='link' to="/"><span className='logo'>WBSTE</span></Link>
              {user?.biz && <Link className='link' to="my-cards">My Cards</Link>}
            </ul>
            <ul className={mobileMenu ? "nav-links open" : "nav-links"}>
              {!user ?
                <>
                  {mobileMenu && <RxCross1 className='icon' onClick={toggleMobileMenu}/>}
                  <Link className='link' to="sign-in">Sign in</Link>
                  <Link className='link' to="sign-up">Sign up</Link>
                  <Link className='link' to="sign-up-biz">Sign up Business</Link>
                </>
               : <Link className='link' to="logout">Logout</Link>}
            </ul>
               {!mobileMenu && <AiOutlineMenu className='icon' onClick={toggleMobileMenu}/>}
        </nav>
    </header>
  )
}

export default NavBar;