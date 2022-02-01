import React from "react";
import { Header } from "./Components/Header";
import { Menu } from "./Components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./Components/Main";
import { Layout } from "./Components/Layout";
import { Dictionary } from "./Components/Dictionary";

export const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Header />
        <Menu />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dictionary" element={<Dictionary />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
