import React from 'react';

/*pages*/
import HelloPage from "./components/pages/helloPage/HelloPage";
import SigninPage from "./components/pages/loginPages/SigninPage";
import SignupPage from "./components/pages/loginPages/SignupPage";
import NewsPage from "./components/pages/news/NewsPage";
import EventsPage from "./components/pages/events/EventsPage";
import UserProfile from "./components/pages/user/UserPage";

/*router */
import { BrowserRouter as Router, Route} from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";


const App = ()=>{
  return(
    <Router>
      <div className="App">
            <Route path="/" exact component={HelloPage} />
            <Route path="/sign-in" component={SigninPage} />
            <Route path="/sign-up" component={SignupPage} />
            <Route path="/news" 
                   render={(props => (
                        <ProtectedRoute {...props} Component={NewsPage} />
                    ))} 
            />
            <Route path="/events" 
                   render={(props => (
                        <ProtectedRoute {...props} Component={EventsPage} />
                    ))} 
            />
            <Route path="/user" 
                   render={(props => (
                        <ProtectedRoute {...props} Component={UserProfile} />
                    ))} 
            />
      </div>
    </Router>
  )
}
export default App;