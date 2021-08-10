import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthService } from "./services";
import Login from "./components/login";
import Stocks from "./components/stocks";
import history from "./history";

function App() {
  if (!AuthService()) {
    history.push("/login");
  } else {
    history.push("/stocks");
  }
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/stocks">
          <Stocks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
