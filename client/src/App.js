import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Help from './auth/Help';
import Dashboard from "./user/Dashboard";
import TopNav from './components/TopNav';
import DashboardSeller from "./user/DashboardSeller";
import "react-toastify/dist/ReactToastify.css";
import StripeCallback from "./stripe/StripeCallback"
import NewHotel from './hotels/NewHotel';

/**
 * lets create Topnavigation/manu bar so that we can easily TopNavigate between pages
 * lets write it in App.js before we move it to its own component
 */

// http://engine.hotellook.com/api/v2/static/hotels.json?locationId=2880&token=957018d5a69e4436c45764bad40fd29c
function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/seller" component={DashboardSeller} />
        <Route exact path="/hotels/new" component={NewHotel} />
        <Route exact path="/stripe/callback" component={StripeCallback} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
