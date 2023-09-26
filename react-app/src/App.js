import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Index from "./components/Index";
import Warehouse from "./components/Warehouse";
import StagedVaults from "./components/StagedVaults";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(authenticate())
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  return (
    <>
      {isLoaded && !sessionUser && (
        <LoginFormPage />
      )}
      {isLoaded && sessionUser && (
        <>
        <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/warehouse">
              <Warehouse/>
            </Route>
            <Route path="/stage">
              <StagedVaults />
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
