import styled from "styled-components";
import { IoMdMenu } from "react-icons/io";
import { forwardRef, useEffect, useState } from "react";
import { hexToRgba } from "@/app/config/utilities";
import { EmphasisedText } from "../Styles/Text";

const ToolTipWrapper = styled.div`
  border: 2px solid ${props => props.theme.hackerGreen};
  position: absolute;
  top: 20px;
  right: 21px;
  &:hover {
    background: ${props => props.theme.foregroundWhite};
  }
  button {
    width: 25px;
    height: auto;
    aspect-ratio: 1;
    font-size: 16px;
    padding: 4px 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.hackerGreen};
    font-weight: 500;
  }
  & > div {
    width: 300px;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    color: ${props => hexToRgba(props.theme.foregroundWhite, 0.9)};
    background: ${props => props.theme.backgroundBlack};
    opacity: ${props => props.$active ? '1' : '0'};
    transform: ${props => props.$active ? 'translate(0, -100%)' : 'translate(0, -50%)'};
    /* box-shadow: 0px 0px 3px 2px ${props => hexToRgba(props.theme.hackerGreen, 0.3)}; */
    border: 2px solid ${props => props.theme.hackerGreen};
    transition: all .1s linear;
    font-family: 'Montserrat', sans-serif;
    font-weight: 200;
    font-size: 18px;
    pointer-events: ${props => props.$active ? 'all' : 'none'};
  }
`;

const ToolTip = forwardRef(({}, tooltipRef) => {
  const [active, setActive] = useState(false);

  const handleButtonClick = () => {
    setActive(!active);
  }

  useEffect(() => {
    const clickListener = (e) => {
      if (!e.target.closest(`.${ToolTipWrapper.styledComponentId}`)) {
        setActive(false);
      }
    }

    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('click', clickListener)
    }
  }, [])

  return (
    <ToolTipWrapper $active={active} ref={tooltipRef}>
      <button type="text"
              aria-label="Toggle Terminal Tooltip"
              onClick={handleButtonClick}>
        ?
      </button>
      <div>
        <p>This portfolio page was designed to be navigated by terminal below (Unix-like syntax), please type <EmphasisedText>help</EmphasisedText> for more info.<br/><br/> If you prefer a more traditional navigation style you can use the menu <IoMdMenu style={{marginBottom: '-2px', color: '#51e251'}}/> above.</p>
      </div>
    </ToolTipWrapper>
  )
})

ToolTip.displayName = 'Tooltip';

export default ToolTip;
