import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  IAppInstanceForToolbarDataStructure,
  NavigationItemType,
  IApplicationState
} from "../../../shared/globalTypes";
import NavigationItem from "../NavigationItem/NavigationItem";

import { getAllAppInstances } from "../../../store/selectors";
import {
  createNewAppInstance,
  deleteAppInstance,
  setActiveAppInstance
} from "../../../store/actions/appInstance";
import { AppInstanceActionTypes } from "../../../store/actions/appInstanceActions";
import { Styled } from "./AppInstances.style";
import NavigationBar from "../NavigationBar/NavigationBar";

interface IMapStateToProps {
  appInstances: IAppInstanceForToolbarDataStructure[];
}

interface IDispatchToProps {
  addNewInstance: () => void;
  deleteInstance: (id: string) => void;
  setInstanceActive: (id: string) => void;
}

type AppInstancesProps = IMapStateToProps & IDispatchToProps;

const AppInstances: React.FC<AppInstancesProps> = props => {
  const createNewAppInstance = (): void => {
    props.addNewInstance();
  };

  const deleteAppInstance = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ): void => {
    props.deleteInstance(id);
    event.stopPropagation();
  };

  const setAppInstanceActive = (id: string): void => {
    props.setInstanceActive(id);
  };

  console.log("RENDERING NAVIGATION");

  return (
    <NavigationBar>
      {props.appInstances.map(appInstance => (
        <NavigationItem
          key={appInstance.id}
          isActive={appInstance.active}
          navigationItemType={NavigationItemType.APP_INSTANCE}
          close={event => deleteAppInstance(event, appInstance.id)}
          setActive={() => setAppInstanceActive(appInstance.id)}
        />
      ))}
      {props.appInstances.length !== 0 ? (
        <Styled.AppInstanceNew onClick={createNewAppInstance}>
          <FontAwesomeIcon icon={faPlus} />
        </Styled.AppInstanceNew>
      ) : null}
    </NavigationBar>
  );
};

const mapStateToProps = ({ appInstance }: IApplicationState) => {
  return {
    appInstances: getAllAppInstances(appInstance)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppInstanceActionTypes>) => {
  return {
    addNewInstance: () => dispatch(createNewAppInstance()),
    deleteInstance: (id: string) => dispatch(deleteAppInstance(id)),
    setInstanceActive: (id: string) => dispatch(setActiveAppInstance(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInstances);
