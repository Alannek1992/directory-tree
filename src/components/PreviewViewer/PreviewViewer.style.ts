import styled from "styled-components";
import { Col } from "react-bootstrap";
import { device, DeviceRequirements } from "../../shared/device";

const PreviewViewer = styled.div`
  border: 2px solid #ffa500;
  width: 100%;
  height: 80vh;
  background-color: white;
  color: black;
  border-radius: 5px;
  margin-bottom: 10%;

  @media ${device(DeviceRequirements.MIN_WIDTH).laptop} {
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
  padding: 0 20px;
`;

const PreviewViewerText = styled.p`
  padding: 10px;
`;

const NavigationContainer = styled.nav`
  width: 100%;
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0;
  align-items: center;
  @media ${device(DeviceRequirements.MAX_WIDTH).tablet} {
    display: none;
  }
`;

export const Styled = {
         PreviewViewer,
         StyledCol,
         PreviewViewerHeader,
         PreviewViewerText,
         NavigationContainer
       };
