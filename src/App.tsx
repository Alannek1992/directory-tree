import React from "react";
import Layout from "./hoc/Layout/Layout";
import DirectoryTree from "./components/DirectoryTree/DirectoryTree";
import PreviewViewer from "./components/PreviewViewer/PreviewViewer";

import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Layout>
        <DirectoryTree />
        <PreviewViewer />
      </Layout>
    </div>
  );
};

export default App;
