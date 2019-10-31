import React, { Fragment, useState, useEffect, useRef } from "react";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Styled } from "./NavigationBar.style";
import { StyledNavigationMenu } from "../../../shared/styled";
import { scrollLeft } from "../../../shared/utilityy";
import { SlideDirection } from "../../../shared/globalTypes";
import { useIsOverflow } from "../../../shared/hooks";

const NavigationBar: React.FC = props => {
  const scrollContainer = useRef<HTMLUListElement>(null);
  const overflow = useIsOverflow<HTMLElement>(scrollContainer.current);

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

  return (
    <Fragment>
      {overflow ? (
        <Styled.AppInstanceNavigationIcon
          onClick={() => slideHandler(SlideDirection.LEFT)}
        >
          <FontAwesomeIcon icon={faLessThan} />
        </Styled.AppInstanceNavigationIcon>
      ) : null}

      <StyledNavigationMenu ref={scrollContainer}>
        {props.children}
      </StyledNavigationMenu>

      {overflow ? (
        <Styled.AppInstanceNavigationIcon
          onClick={() => slideHandler(SlideDirection.RIGHT)}
        >
          <FontAwesomeIcon icon={faGreaterThan} />
        </Styled.AppInstanceNavigationIcon>
      ) : null}
    </Fragment>
  );
};

export default NavigationBar;
