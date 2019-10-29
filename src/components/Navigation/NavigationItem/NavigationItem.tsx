import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import { Styled } from "./NavigationItem.style";
import { NavigationItemType } from "../../../shared/globalTypes";
import NavigationItemNameManager from "./NavigationItemNameManager/NavigationItemNameManager";

interface INavigationItemProps {
  isActive: boolean;
  name?: string;
  navigationItemType: NavigationItemType;
  close: (event: React.MouseEvent<HTMLDivElement>) => void;
  setActive: () => void;
}

const NavigationItem: React.FC<INavigationItemProps> = ({
  isActive,
  name,
  navigationItemType,
  close,
  setActive
}) => {
  const navigationItem = (
    <Styled.NavigationItem onClick={setActive} active={isActive}>
      {navigationItemType === NavigationItemType.APP_INSTANCE ? (
        <NavigationItemNameManager isActive={isActive} />
      ) : (
        <Styled.NavigationItemText>{name}</Styled.NavigationItemText>
      )}

      <Styled.NavigationItemIconClose onClick={close}>
        <FontAwesomeIcon icon={faWindowClose} />
      </Styled.NavigationItemIconClose>
    </Styled.NavigationItem>
  );

  return navigationItem;
};

export default NavigationItem;
