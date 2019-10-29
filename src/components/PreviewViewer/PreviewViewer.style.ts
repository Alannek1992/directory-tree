import styled from "styled-components";
import { Col } from "react-bootstrap";
import { device } from "../../shared/device";

const PreviewViewer = styled.div`
  border: 2px solid #ffa500;
  width: 100%;
  height: 80vh;
  background-color: white;
  color: black;
  border-radius: 5px;
  margin-bottom: 10%;

  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const PreviewViewerHeader = styled.div`
  height: 56px;
  width: 100%;
  background-color: #808080;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 2px solid #ffa500;
`;

const PreviewViewerText = styled.p`
  padding: 10px;
`;

export const Styled = {
  PreviewViewer,
  StyledCol,
  PreviewViewerHeader,
  PreviewViewerText
};
