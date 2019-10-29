import React, { Fragment, useState, useEffect, useRef } from "react";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Styled } from "./NavigationBar.style";
import { StyledNavigationMenu } from "../../../shared/styled";
import { isOverflown, scrollLeft } from "../../../shared/utilityy";
import { SlideDirection } from "../../../shared/globalTypes";
import { usePrevious } from "../../../shared/hooks";

const NavigationBar: React.FC = props => {
  const [overflow, setOverflow] = useState(false);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const cachedLenghtOfElements: number | undefined = usePrevious(
    scrollContainer.current
      ? scrollContainer.current.children.length
      : undefined
  );

  useEffect(() => {
    if (scrollContainer.current) {
      const overflown = isOverflown(scrollContainer.current);
      if (overflown !== overflow) {
        setOverflow(overflown);
      }
      if (
        overflown &&
        cachedLenghtOfElements &&
        scrollContainer.current.children.length > cachedLenghtOfElements
      ) {
        slideHandler(SlideDirection.RIGHT);
      }
    }
  });

  const slideHandler = (direction: string) => {
    if (scrollContainer.current) {
      if (direction === SlideDirection.RIGHT) {
        scrollLeft(scrollContainer.current, 300, 1000);
      } else {
        scrollLeft(scrollContainer.current, -300, 1000);
      }
    }
  };

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
