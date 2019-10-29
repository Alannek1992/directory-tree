import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";

import { faFolder as emptyFolder } from "@fortawesome/free-regular-svg-icons";

import {TreeItemType} from "../../../../shared/globalTypes";


import ITreeItemIcon from "./ITreeItemIcon";

const TreeItemIcon: React.FC<ITreeItemIcon> = ({ type = TreeItemType.FOLDER }) =>
{
  switch(type) {
    case TreeItemType.FOLDER:
      return (
          <FontAwesomeIcon icon={faFolder} />
      );
    case TreeItemType.FILE:
      return <FontAwesomeIcon icon={faFile} />
    case TreeItemType.EMPTY_FOLDER:
      return <FontAwesomeIcon icon={emptyFolder} />
  }
}


export default TreeItemIcon;
