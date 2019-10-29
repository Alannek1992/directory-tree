import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { IApplicationState } from "../../shared/globalTypes";
import { Styled } from "./withErrorHandler.style";
import PopUpDrawer from "../../components/UI/PopUpDrawer/PopUpDrawer";
import { GlobalActionTypes } from "../../store/actions/globalActionTypes";
import { resetErrorMessage } from "../../store/actions/error";

interface IMapStateToProps {
  errorMessage: string;
}

interface IMapDispatchToProps {
  resetError: () => void;
}

type WithErrorHandlerProps = IMapStateToProps & IMapDispatchToProps;

const withErrorHandler = <T extends WithErrorHandlerProps>(
  WrappedComponent: React.FunctionComponent<T>
) => (props: T) => {
  return (
    <Fragment>
      <PopUpDrawer
        show={props.errorMessage ? true : false}
        click={props.resetError}
      >
        <Styled.ModalDialogContainer>
          {props.errorMessage}
        </Styled.ModalDialogContainer>
      </PopUpDrawer>
      <WrappedComponent {...props} />
    </Fragment>
  );
};

const mapStateToProps = ({ error }: IApplicationState) => {
  return {
    errorMessage: error.errorMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch<GlobalActionTypes>) => {
  return {
    resetError: () => dispatch(resetErrorMessage())
  };
};

export default compose<React.FunctionComponent>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withErrorHandler
);
