import React from 'react';
import logo from '../images/logo.png'
 
function Header(){
    return (
      <header>
        <img id='logo' src={logo} alt='Logo of the Website'/>
        <h1>LeetCode DuoStats</h1>
      </header>
    );
  }

export default Header;