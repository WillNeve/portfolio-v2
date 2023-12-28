import { useState } from 'react';
import styles from './nav.module.scss';
import styled from 'styled-components';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    console.log('menu clicked');
  }

  const MenuToggle = styled.button`
  display: flex;
  width: ${(props) => (props.width ? props.width : '50px')};
  height: auto;
  aspect-ratio: 1;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  justify-content: center;
  border: 2px solid yellow;
  background: none;
  overflow: hidden;

  & > span {
    width: 90%;
    height: 2px;
    background: green;
    transform-origin: center;
    transition: all 0.1s linear;
  }
`;

  return (
    <div className={menuOpen ? `${styles.nav} ${styles.open}` : `${styles.nav}`}>
      <div className={styles.top}>
        <MenuToggle width={'50px'} onClick={handleMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </MenuToggle>
      </div>
    </div>
  );
}

export default Nav;
