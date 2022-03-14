import React from "react";
import { Header } from "./Components/Header";
import { Menu } from "./Components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./Components/Main";
import { Layout } from "./Components/Layout";
import { Dictionary } from "./Components/Dictionary";
import { CategoryPage } from "./Components/CategoryPage";
import { WordPage } from "./Components/WordPage";
import { Provider } from "react-redux";
import { store } from "./Components/redux/store";

export const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <Header />
          <Menu />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:name" element={<CategoryPage />} />
            <Route path="/dictionary/:name/:word" element={<WordPage />} />
          </Routes>
        </Layout>
      </Provider>
    </Router>
  );
};

export default App;
