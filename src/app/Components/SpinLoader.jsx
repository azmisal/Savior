import React from 'react';
import Style from "../Styles/SpinLoader.module.css";

const SpinLoader = () => {
  return (
  <div className={Style.page}>
    <div className={Style.spinLoader} aria-hidden="true"></div>
    <h1 class={Style.loadingText}>Loading...</h1>
  


    </div>);
};

export default SpinLoader;
