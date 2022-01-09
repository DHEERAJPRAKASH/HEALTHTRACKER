import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserState from "./context/Doctors/DoctorState";

function App() {
  return (
    <div className="App">
      <UserState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/doctors" component={Doctor} />
            <Route path="/user" component={User} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
      </UserState>
    </div>
  );
}

export default App;
