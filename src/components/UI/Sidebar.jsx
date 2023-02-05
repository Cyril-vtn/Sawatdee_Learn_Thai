import React from "react";
import { Link } from "react-router-dom";
import classes from './Sidebar.module.css'
import logo from '../../assets/logoGreen.svg'

const Sidebar = ({children}) => {
  return <div className={classes.sidebar}>
    <div className={classes.logo}>
      <Link to='/learn'>
        <img src={logo} alt="" />
      </Link>
      </div>
      {children}</div>
};

export default Sidebar;
