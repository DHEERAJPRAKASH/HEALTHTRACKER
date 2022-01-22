import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserRegister from "./pages/UserRegister";
import DoctorRegister from "./pages/DoctorRegister";
import UserComplaints from "./pages/UserComplaints";
import DoctorConsult from "./pages/DoctorConsult";

import DocUserState from "./context/DocUserState";

function App() {
  return (
    <div className="App">
      <DocUserState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/doctors" component={Doctor} />
            <Route path="/user" component={User} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/doctorRegister" component={DoctorRegister} />
            <Route path="/userRegister" component={UserRegister} />
            <Route path="/userComplaints" component={UserComplaints} />
            <Route path="/doctorConsult" component={DoctorConsult} />
          </Switch>
        </Router>
      </DocUserState>
    </div>
  );
}

export default App;
