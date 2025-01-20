import React from "react";
import { ButtonIcon } from "../../icons/Button";
import Clock from "../Clock";
import { HeaderStyled } from "./style";


function Header() {
  return (
    <HeaderStyled>
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
      </div>
      <Clock />
      <ul>
        <li className="yellow">
          <ButtonIcon />
          راهنما
        </li>
        <li className="red">
          <ButtonIcon />
          خروج
        </li>
      </ul>
    </HeaderStyled>
  );
}

export default Header;
