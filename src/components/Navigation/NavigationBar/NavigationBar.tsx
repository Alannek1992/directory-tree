import React, { Fragment, useRef } from "react";
import {
  faLessThan,
  faGreaterThan,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Styled } from "./NavigationBar.style";
import { StyledNavigationMenu } from "../../../shared/styled";
import { scrollLeft } from "../../../shared/utilityy";
import { SlideDirection } from "../../../shared/globalTypes";
import { useIsOverflow} from "../../../shared/hooks";

interface INavigationBarProps {
  addNewItemHandler?: () => void;
  display: boolean;
}

const NavigationBar: React.FC<INavigationBarProps> = ({
  children,
  addNewItemHandler,
  display
}) => {
  const scrollContainer = useRef<HTMLUListElement>(null);
  const [overflow, scrollLeftMax, scrollRightMax] = useIsOverflow<HTMLElement>(scrollContainer.current);

  const slideHandler = (direction: string) => {
    if (scrollContainer.current) {
      if (direction === SlideDirection.RIGHT) {
        scrollLeft(scrollContainer.current, 300, 1000);
      } else {
        scrollLeft(scrollContainer.current, -300, 1000);
      }
    }
  };

  console.log("RENDERING FROM NAVIGATION BAR");

  return display ? (
    <Fragment>
      {display}
      {overflow ? (
        <Styled.NavigationIcon
          onClick={() => slideHandler(SlideDirection.LEFT)}
          active={!scrollLeftMax}
        >
          <FontAwesomeIcon icon={faLessThan}  />
        </Styled.NavigationIcon>
      ) : null}
      <StyledNavigationMenu ref={scrollContainer}>
        {children}
      </StyledNavigationMenu>
      {addNewItemHandler ? (
        <Styled.CreateNewItem onClick={addNewItemHandler}>
          <FontAwesomeIcon icon={faPlus} />
        </Styled.CreateNewItem>
      ) : null}
      {overflow ? (
        <Styled.NavigationIcon
          onClick={() => slideHandler(SlideDirection.RIGHT)}
          active={!scrollRightMax}
        >
          <FontAwesomeIcon icon={faGreaterThan} />
        </Styled.NavigationIcon>
      ) : null}
    </Fragment>
  ) : null;
};

export default NavigationBar;
