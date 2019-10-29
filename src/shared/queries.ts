import gql from "graphql-tag";

export const INIT_DIRECTORY_TREE_QUERY = gql`
  query initialTree {
    getList {
      id
      name
      type
    }
  }
`;

export const LOAD_NEW_NODE = gql`
  query loadNewNode($parentId: String) {
    getList(id: $parentId) {
      id
      name
      type
    }
  }
`;

export const LOAD_FILE = gql`
  query loadFile($fileId: String!) {
    getFile(id: $fileId) {
      id
      name
      text
    }
  }
`;
