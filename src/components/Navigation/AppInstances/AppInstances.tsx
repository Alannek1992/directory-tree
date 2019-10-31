import React, { createRef, useRef, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  IAppInstanceForToolbarDataStructure,
  NavigationItemType,
  IApplicationState,
  IObjectWithProperties
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
import { usePrevious } from "../../../shared/hooks";

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
  const myNavRefs = appInstances.reduce<
    IObjectWithProperties<React.RefObject<HTMLLIElement>>
  >((acc, value) => {
    acc[value.id] = createRef<HTMLLIElement>();
    return acc;
  }, {});
  const myCreateNavRef = useRef<HTMLLIElement>(null);
  const previousAppInstancesCount = usePrevious(appInstances.length);

  useEffect(() => {
    if (
      previousAppInstancesCount &&
      previousAppInstancesCount < appInstances.length
    ) {
      myCreateNavRef.current &&
        myCreateNavRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "start"
        });
    }
  }, [appInstances, previousAppInstancesCount]);

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
        inline: "start"
      });

    setInstanceActive(id);
  };

  console.log("RENDERING NAVIGATION");

  return (
    <NavigationBar>
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
      {appInstances.length !== 0 ? (
        <Styled.AppInstanceNew
          onClick={createNewAppInstance}
          ref={myCreateNavRef}
        >
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
