import styled from 'styled-components';
import Clock from '../Clock';
import { ButtonIcon } from '../../icons/Button';

const HeaderStyled = styled.header`
    background: rgba(255, 255, 255, .175);
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

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
        li {
            display: flex;
            align-items: center;
            margin-right: 2rem;
            font-size: .825rem;
            svg { margin-left: 0.5rem; font-size: 1rem; }
        }
        .yellow {
            svg { color: yellow; }
        }
        .red {
            svg { color: red; }
        }
    }
`

function Header() {
  return (
    <HeaderStyled>
      <img src='/logo.png' alt='logo'/>
        <Clock />
      <ul>
        <li className='yellow'>
          <ButtonIcon />
          راهنما
        </li>
        <li className='red'>
          <ButtonIcon/>
          خروج
        </li>
      </ul>
    </HeaderStyled>
  );
}

export default Header;
