import React from "react";
import {Item} from "react-simple-tree-menu";


export default interface ITreeItem extends Item {
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  toggleNode?: () => void;
  type: string;
  initialToggleNode?: (id: string) => void;
  loadFile?: (id: string) => void;
  openFile?: (id: string) => void;
}