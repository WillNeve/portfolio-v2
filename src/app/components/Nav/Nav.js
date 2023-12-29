import { useState, useContext } from 'react';
import { PagesContext } from '../../page.js';
import styled from 'styled-components';
import styles from './nav.module.scss';
import { boxSeperation, textSeperation } from '../../config/utilities.js'

const NavWrapper = styled.div`
  box-sizing: border-box;
  height: fit-content;
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  color: ${props => props.theme.hackerGreen};
  background: ${props => props.theme.backgroundBlack};
  transition: height .2s ease;
  padding-bottom: 10px;
  & > div:nth-child(1) {
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: flex-end;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.theme.hackerGreen};
    animation: 250ms linear 0s infinite alternate running ${props => boxSeperation(props.theme.hackerGreen, 0.5)};
  }
`;

let gap = 10;
const NavMenuToggle = styled.button`
  display: flex;
  position: relative;
  width: 50px;
  height: auto;
  aspect-ratio: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  border: none;
  overflow: hidden;
  cursor: pointer;

  span {
    width: 90%;
    height: 2px;
    background: ${props => props.theme.hackerGreen};
    animation: 250ms linear 0s infinite alternate running ${props => boxSeperation(props.theme.hackerGreen, 0.5)};
    transform-origin: center;
    transition: all 0.1s linear;
    position: absolute;
    &:nth-child(1) {
      transform: ${props => props.$active ? `rotate(-45deg)` : `translateY(-${gap}px)`}
    }
    &:nth-child(2) {
      transform: translateX(${props => props.$active ? '200px' : '0px'});
    }
    &:nth-child(3) {
      transform: ${props => props.$active ? `rotate(45deg)` : `translateY(${gap}px)`}
    }
  }
`;

const NavMenu = styled.div`
  opacity: ${props => props.$active ? 1 : 0};
  height: ${props => props.$active ? 'fit-content' : '0px'};
  padding: ${props => props.$active ? '10px' : '0px'};
  transition: opacity 0.1s linear;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const NavMenuButtonList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const NavMenuButton = styled.button`
  position: relative;
  outline: none;
  background: none;
  border: none;
  color: ${props => props.theme.hackerGreen};
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.$current ? 'inherit' : 'cyan'};
  padding: 5px;
  animation: 250ms linear 0s infinite alternate running ${props => textSeperation(props.theme.hackerCyan, 0.5)};
  &:hover {
    color: blue;
    -webkit-text-stroke: 1px black;
    background-color: white;
    animation: 250ms linear 0s infinite alternate running ${props => textSeperation(props.theme.hackerBlue, 0.5)};
  }
  &::before {
    display: ${props => props.$current ? 'block' : 'none'};
    content: '>';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(calc(-100% - 10px), -50%);
  }
`;

const Nav = ({activePage, onPageChange}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {pages, page, setPage} = useContext(PagesContext);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }

  const handlePageChange = (page) => {
    setPage(page)
    onPageChange(page)
  }


  return (
    <NavWrapper className={styles.wrapper}>
      <div>
        <NavMenuToggle $active={menuOpen}
                        onClick={handleMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </NavMenuToggle>
      </div>
      <NavMenu $active={menuOpen}>
        <NavMenuButtonList>
          {Object.keys(pages).map((pageName, index) => (
            <li key={index}>
              <NavMenuButton $current={pageName === page}
                             type='text'
                             onClick={() => {handlePageChange(pageName)}}>
                {pageName === '~' ? 'home' : pageName}
              </NavMenuButton></li>
          ))}
        </NavMenuButtonList>
      </NavMenu>
    </NavWrapper>
  );
}

export default Nav;
