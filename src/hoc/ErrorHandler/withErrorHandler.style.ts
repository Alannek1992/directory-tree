import styled from "styled-components";
import { device, DeviceRequirements } from "../../shared/device";

const ModalDialogContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  box-sizing: border-box;
  margin: 0.5rem;

  @media ${device(DeviceRequirements.MIN_WIDTH).laptop} {
    max-width: 500px;
    margin: 1.75rem auto;
  }
`;

export const Styled = {
  ModalDialogContainer
};
