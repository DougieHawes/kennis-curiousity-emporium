import { Switch, Route } from "react-router-dom";

import "./style.min.css";

import Header from "./Header";
import Footer from "./Footer.jsx";

import Cart from "./Cart";
import Detail from "./Detail";
import Landing from "./Landing";
import Products from "./Products";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/:category" component={Products} />
        <Route exact path="/:category/:id" component={Detail} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
      <Footer />
    </div>
  );
}
