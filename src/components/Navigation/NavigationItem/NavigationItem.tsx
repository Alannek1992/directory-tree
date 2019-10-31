import React from "react";

import { Styled } from "./NavigationItem.style";
import { NavigationItemType } from "../../../shared/globalTypes";
import NavigationItemControls from "./NavigationItemControls/NavigationItemControls";

interface INavigationItemProps {
  isActive: boolean;
  name?: string;
  navigationItemType: NavigationItemType;
  close: (event: React.MouseEvent<HTMLDivElement>) => void;
  setActive: () => void;
}

type Ref = HTMLLIElement;

const NavigationItem = React.forwardRef<Ref, INavigationItemProps>(
  ({ isActive, name, navigationItemType, close, setActive }, ref) => {
    const navigationItem = (
      <Styled.NavigationItem onClick={setActive} active={isActive} ref={ref}>
          <NavigationItemControls
            isActive={isActive}
            name={name}
            navigationItemType={navigationItemType}
            close={close}
          />
      </Styled.NavigationItem>
    );

    return navigationItem;
  }
);

export default NavigationItem;
