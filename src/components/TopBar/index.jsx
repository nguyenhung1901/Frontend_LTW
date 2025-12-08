import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import {useLocation} from "react-router-dom"
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const location = useLocation();
    let contextText = "";
    const pathParts = location.pathname.split("/");
    if(pathParts.length>=3){
      const pageType=pathParts[1];
      const userId = pathParts[2];
      const user = models.userModel(userId);
      if(user){
        const userName = `${user.first_name} ${user.last_name}`;
        if(pageType==="users"){
          contextText = userName;
        }
        else if(pageType==="photos"){
          contextText=`Photos of ${userName}`;
        }
      }
    }
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar sx={{justifyContent:'space-between'}}>
          <Typography variant="h5" color="inherit">
            Nguyễn Văn Hùng
          </Typography>
          <Typography variant="h5" color="inherit">
            {contextText}
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
