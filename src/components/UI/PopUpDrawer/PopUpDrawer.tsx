import React from "react";
import "./PopUpDrawer.css";
import { CSSTransition } from "react-transition-group";
import { Styled } from "./PopUpDrawer.style";

interface IPopUpDrawerProps {
  click: () => void;
  show: boolean;
}

const PopUpDrawer: React.FC<IPopUpDrawerProps> = ({
  show,
  click,
  children
}) => {
  return (
    <CSSTransition in={show} timeout={500} classNames="display" unmountOnExit >
      <Styled.PopUpDrawer onClick={click}>
        <Styled.PopUpDrawerInnerContainer>
          {children}
        </Styled.PopUpDrawerInnerContainer>
      </Styled.PopUpDrawer>
    </CSSTransition>
  );
};

export default PopUpDrawer;
