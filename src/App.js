import { AnimatePresence } from "framer-motion";
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Switch, useLocation } from "react-router";
import styled from "styled-components";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SearchData from "./components/SearchData/SearchData";

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
 
  

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  }
`;

function App() {
  const location = useLocation();

  const [logButtonName, setlogButtonName] = React.useState("LOGIN");
  return (
    <>
      
     
     
      <Navbar logButtonName={logButtonName} setlogButtonName={setlogButtonName}/>
        <div class="overflow-y-auto">
        <Pages >
            <AnimatePresence exitBeforeEnter >
                <Switch location={location} key={location.pathname}>
                
                  <Route exact path="/" 
                  render={(props) => <Home isLoggedIn={logButtonName} />} />
                  <Route exact path="/search" 
                  render={(props) => <SearchData isLoggedIn={logButtonName} />} />
                </Switch>
            </AnimatePresence>
          </Pages>
          </div>
        
    </>
  );
}

export default App;
