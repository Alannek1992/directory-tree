import React, { Fragment } from "react";
import { Container } from "react-bootstrap";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { Styled } from "./Layout.style";

const Layout: React.FC = props => {
  return (
    <Fragment>
      <Toolbar />
      <Container className="app-container">
        <Styled.LayoutMain>
          <Styled.StyledRow>{props.children}</Styled.StyledRow>
        </Styled.LayoutMain>
      </Container>
    </Fragment>
  );
};

export default Layout;
