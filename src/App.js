import React from 'react';

/*fakeApi*/
import FakeApi from "./api/fakeApi";

/*pages*/
import HelloPage from "./components/pages/helloPage/HelloPage";
import SigninPage from "./components/pages/loginPages/SigninPage";
import SignupPage from "./components/pages/loginPages/SignupPage";
import NewsPage from "./components/pages/news/NewsPage";
import EventsPage from "./components/pages/events/EventsPage";
import UserProfile from "./components/pages/user/UserPage";

/*router */
import { BrowserRouter as Router, Route} from "react-router-dom";


const App = ()=>{
    console.log('create', FakeApi.Token.createToken({email: 'test@gmail.com', role: 'user'})
    .then((result) => {
        console.log('createToken result is ', result);
        // console.log('mee', FakeApi.Auth.test());
        FakeApi.Token.decode().then((result) => console.log('decode result is ', result));
    })
    );
    
  return(
    <Router>
      <div className="App">
          <Route path="/" exact component={HelloPage} />
          <Route path="/sign-in" component={SigninPage} />
          <Route path="/sign-up" component={SignupPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/user" component={UserProfile}/>
      </div>
    </Router>
  )
}
export default App;