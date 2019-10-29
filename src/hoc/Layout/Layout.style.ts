import styled from "styled-components";
import { Row } from "react-bootstrap";

const LayoutMain = styled.main`
  margin-top: 56px;
  height: calc(100vh - 56px);
`;

const StyledRow = styled(Row)`
  height: 100%;
`;

export const Styled = {
  LayoutMain,
  StyledRow
};
