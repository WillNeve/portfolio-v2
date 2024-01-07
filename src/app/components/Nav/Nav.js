import { useState, useContext } from 'react';
import { PagesContext } from '../../page.js';
import styled, { css } from 'styled-components';
import { responsive } from '../../config/utilities.js';
import { boxSeperationAnim, textSeperationAnim } from '../../config/utilities.js'

const NavWrapper = styled.div`
  ${responsive};
  box-sizing: border-box;
  min-height: 8svh;
  height: fit-content;
  max-height: ${props => props.$active ? '600px' : '8%'};
  position: fixed;
  z-index: 1;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.hackerGreen};
  background: ${props => props.theme.backgroundBlack};
  transition: height .2s ease, max-height .2s ease;
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
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    @media (min-width: 600px) {
      width: 105%;
    }
    margin: 0 auto;
    height: 2px;
    background: ${props => props.theme.hackerGreen};
    ${props => boxSeperationAnim(props.theme.hackerGreen, .5)};
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
    ${props => boxSeperationAnim(props.theme.hackerGreen, .5)};
  }
`;

const NavMenu = styled.div`
  opacity: ${props => props.$active ? 1 : 0};
  max-height: ${props => props.$active ? '200px' : '0px'}; /* Set a reasonable max-height */
  overflow: hidden;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: max-height .2s ease, opacity .2s ease;
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
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.$current ? props.theme.hackerGreen : 'cyan'};
  padding: 5px;
  &::before {
    display: ${props => props.$current ? 'block' : 'none'};
    content: '>';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(calc(-100% - 10px), -50%);
    transition: transform .1s linear;
  }

  &:hover {
    ${props =>
    !props.$current
    ? css`
        color: blue;
        -webkit-text-stroke: 1px black;
        background-color: white;
        ${textSeperationAnim(props.theme.hackerBlue, .5)};
        `
    : css`
        &::before {
          transform: translate(calc(-100% - 2px), -50%);
        }
        `
    }
  }
  ${props =>
    props.$current
    ? textSeperationAnim(props.theme.hackerGreen, .5)
    : textSeperationAnim(props.theme.hackerCyan, .5)
  }
`;

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {pages, page, setPage} = useContext(PagesContext);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }

  const handlePageChange = (page) => {
    setPage(page);
    setMenuOpen(false);
  }


  return (
    <NavWrapper $active={menuOpen}>
      <div>
        <NavMenuToggle $active={menuOpen}
                        onClick={handleMenuClick}
                        aria-label='Toggle Top Navigation Menu'>
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
