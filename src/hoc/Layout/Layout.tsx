import React, { Fragment, useState} from "react";
import { Container } from "react-bootstrap";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { Styled } from "./Layout.style";
import PopUpDrawer from "../../components/UI/PopUpDrawer/PopUpDrawer";
import AppInstances from "../../components/Navigation/AppInstances/AppInstances";

const Layout: React.FC = props => {
    const [displayPopUp, setDisplayPopUp] = useState(false);

    const displayPopUpToggleHandler = () => {
      setDisplayPopUp(!displayPopUp);
    };

    const displayPopUpCloseHandler = () => {
      setDisplayPopUp(false);
    };

  return (
    <Fragment>
      <Toolbar toggle={displayPopUpToggleHandler} />
      <PopUpDrawer click={displayPopUpCloseHandler} show={displayPopUp}>
        <AppInstances />
      </PopUpDrawer>
      <Container className="app-container">
        <Styled.LayoutMain>
          <Styled.StyledRow>{props.children}</Styled.StyledRow>
        </Styled.LayoutMain>
      </Container>
    </Fragment>
  );
};

export default Layout;
