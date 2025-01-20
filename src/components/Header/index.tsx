import React from "react";
import styled from "styled-components";
import { ButtonIcon } from "../../icons/Button";
import Clock from "../Clock";

const HeaderStyled = styled.header`
  background: rgba(255, 255, 255, 0.175);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  & > * {
    flex: 1 0 33.33333%;
  }

  h1 {
    margin: 0;
  }
  img {
    display: block;
    width: 80px;
    height: 80px;
  }
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    color: #fff;
    justify-content: flex-end;
    li {
      display: flex;
      align-items: center;
      margin-right: 2rem;
      font-size: 0.825rem;
      svg {
        margin-left: 0.5rem;
        font-size: 1rem;
      }
    }
    .yellow {
      svg {
        color: yellow;
      }
    }
    .red {
      svg {
        color: red;
      }
    }
  }
`;

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
