import React from "react";

import { Styled } from "./NavigationItem.style";
import { NavigationItemType } from "../../../shared/globalTypes";
import NavigationItemControls from "./NavigationItemControls/NavigationItemControls";

interface INavigationItemProps {
  isActive: boolean;
  name: string;
  navigationItemType: NavigationItemType;
  close: (event: React.MouseEvent<HTMLDivElement>) => void;
  setActive: (event: React.MouseEvent<HTMLLIElement>) => void;
  changeName?: () => (name: string) => void;
}

type Ref = HTMLLIElement;

const NavigationItem = React.forwardRef<Ref, INavigationItemProps>(
  ({ isActive, name, close, setActive, changeName }, ref) => {
    const navigationItem = (
      <Styled.NavigationItem onClick={setActive} active={isActive} ref={ref}>
        <NavigationItemControls
          isActive={isActive}
          name={name}
          changeName={changeName}
          close={close}
        />
      </Styled.NavigationItem>
    );

    return navigationItem;
  }
);

export default NavigationItem;
