import React from "react";
import {Typography, Button, Divider, Card, CardContent} from "@mui/material";

import "./styles.css";
import {useParams, Link} from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const {userId} = useParams();
    const user = models.userModel(userId);
    return (
      <div>
        <Typography variant="h4">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">
          <strong>Location: </strong> {user.location}
        </Typography>
        <Typography variant="body1">
          <strong>Occupation: </strong> {user.occupation}
        </Typography>
        <Typography variant="body1">
          <strong>Description: </strong> {user.description}
        </Typography>
        <Button 
        variant="contained"
        component={Link}
        to={`/photos/${userId}`}
        >View Photos</Button>
      </div>
    )
}

export default UserDetail;
