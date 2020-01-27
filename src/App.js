import React from "react";

/*pages*/
import HelloPage from "./components/pages/helloPage/HelloPage";
import SigninPage from "./components/pages/loginPages/SigninPage";
import SignupPage from "./components/pages/loginPages/SignupPage";
import NewsPage from "./components/pages/news/NewsPage";
import EventsPage from "./components/pages/events/EventsPage";
import UserPage from "./components/pages/user/UserPage";

/*router */
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={HelloPage} />
        <Route path="/sign-in" component={SigninPage} />
        <Route path="/sign-up" component={SignupPage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/user" component={UserPage} />
      </div>
    </Router>
  );
};
export default App;
