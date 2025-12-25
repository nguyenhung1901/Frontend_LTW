import "./App.css";

import React, { useState } from "react";
import LoginRegister from "./components/LoginRegister";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={loggedInUser} setUser={setLoggedInUser} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList user={loggedInUser} />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              {!loggedInUser ? (
                <LoginRegister setUser={setLoggedInUser} />
              ) : (
                <Routes>
                  <Route path="/" element={<Navigate to="/users" />} />
                  <Route
                    path="/users"
                    element={<Typography>Select a user</Typography>}
                  />
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                </Routes>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
