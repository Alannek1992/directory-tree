import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

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
import NavigationBar from "../NavigationBar/NavigationBar";
import { useAfterNavItemAdded } from "../../../shared/hooks";
import { getRefsForNav } from "../../../shared/utilityy";

interface IMapStateToProps {
  appInstances: IAppInstanceForToolbarDataStructure[];
}

interface IDispatchToProps {
  addNewInstance: () => void;
  deleteInstance: (id: string) => void;
  setInstanceActive: (id: string) => void;
}

type AppInstancesProps = IMapStateToProps & IDispatchToProps;

const AppInstances: React.FC<AppInstancesProps> = ({
  appInstances,
  addNewInstance,
  deleteInstance,
  setInstanceActive
}) => {
  const myNavRefs = getRefsForNav(appInstances);
  useAfterNavItemAdded(appInstances, myNavRefs);

  const createNewAppInstance = (): void => {
    addNewInstance();
  };

  const deleteAppInstance = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ): void => {
    deleteInstance(id);
    event.stopPropagation();
  };

  const setAppInstanceActive = (id: string): void => {
    const myRef = myNavRefs[id];
    myRef.current &&
      myRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "end"
      });

    setInstanceActive(id);
  };

  console.log("RENDERING NAVIGATION");

  return (
    <NavigationBar addNewItemHandler={createNewAppInstance} display={appInstances.length > 0}>
      {appInstances.map(appInstance => (
        <NavigationItem
          key={appInstance.id}
          isActive={appInstance.active}
          ref={myNavRefs[appInstance.id]}
          navigationItemType={NavigationItemType.APP_INSTANCE}
          close={event => deleteAppInstance(event, appInstance.id)}
          setActive={() => setAppInstanceActive(appInstance.id)}
        />
      ))}
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
