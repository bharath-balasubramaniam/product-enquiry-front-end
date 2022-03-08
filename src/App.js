import React from "react";
import "./App.css";
// import { useHistory } from "react-router-dom";
import { UserState } from "./context/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
function App() {
  const { user } = UserState();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/products" /> : <HomePage />}
          <HomePage />
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/products" /> : <LoginPage />}
        </Route>
        <Route exact path="/admin-register">
          {user ? <Redirect to="/products" /> : <RegisterPage />}
        </Route>
        <Route exact path="/products">
          {!user ? <Redirect to="/" /> : <ProductsPage />}
        </Route>
        <Route exact path="/product/:id">
          {!user ? <Redirect to="/" /> : <ProductPage />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
