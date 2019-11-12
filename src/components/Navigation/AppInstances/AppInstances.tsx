import React, { useEffect } from "react";
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
  setActiveAppInstance,
  changeNameAppInstance
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
  changeNameOfAppInstance: (id: string, name: string) => void;
}

type AppInstancesProps = IMapStateToProps & IDispatchToProps;

const AppInstances: React.FC<AppInstancesProps> = ({
  appInstances,
  addNewInstance,
  deleteInstance,
  setInstanceActive,
  changeNameOfAppInstance
}) => {
  const myNavRefs = getRefsForNav(appInstances);
  useAfterNavItemAdded(appInstances, myNavRefs);

  useEffect(() => {
    console.log("COMPONENT DID MOUNT with key: ");
  }, []);

  const createNewAppInstanceHandler = (
    event: React.MouseEvent<HTMLLIElement>
  ): void => {
    addNewInstance();
    event.stopPropagation();
  };

  const deleteAppInstanceHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ): void => {
    deleteInstance(id);
    event.stopPropagation();
  };

  const changeNameOfAppInstanceHandler = (id: string) => {
    console.log("Hello");
    return (name: string) => {
      console.log("INNER");
      changeNameOfAppInstance(id, name);
    };
  };

  const setAppInstanceActiveHandler = (
    event: React.MouseEvent<HTMLLIElement>,
    id: string
  ): void => {
    const myRef = myNavRefs[id];
    myRef.current &&
      myRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "end"
      });

    setInstanceActive(id);
    event.stopPropagation();
  };

  console.log("RENDERING NAVIGATION");

  return (
    <NavigationBar
      addNewItemHandler={createNewAppInstanceHandler}
      display={appInstances.length > 0}
    >
      {appInstances.map(appInstance => (
        <NavigationItem
          key={appInstance.id}
          name={appInstance.name}
          isActive={appInstance.active}
          ref={myNavRefs[appInstance.id]}
          navigationItemType={NavigationItemType.APP_INSTANCE}
          close={event => deleteAppInstanceHandler(event, appInstance.id)}
          setActive={event =>
            setAppInstanceActiveHandler(event, appInstance.id)
          }
          changeName={() => changeNameOfAppInstanceHandler(appInstance.id)}
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
    setInstanceActive: (id: string) => dispatch(setActiveAppInstance(id)),
    changeNameOfAppInstance: (id: string, name: string) =>
      dispatch(changeNameAppInstance(id, name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInstances);
