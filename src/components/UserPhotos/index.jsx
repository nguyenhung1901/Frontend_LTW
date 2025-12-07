import React from "react";
import { Typography, Card, CardContent, Divider } from "@mui/material"; 
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models"; 

import "./styles.css";

function UserPhotos () {
    const {userId} = useParams();
    const photos = models.photoOfUserModel(userId);
    const user = models.userModel(userId);
    return (
      <>
      <Typography variant="h5">
        Photos of {user.first_name} {user.last_name} ({user.location})
      </Typography>
      <Divider />
      {photos.map((photo)=>(
        <React.Fragment key={photo._id}>
          <Card>
            <img
              src={`src/images/${photo.file_name}`} 
              alt={photo.file_name}
              width="100%"
            />
            <CardContent>
              <Typography variant="caption" display="inline">
                {photo.date_time}
              </Typography>
              {photo.comments && photo.comments.map((c)=>(
                <div key={c._id}>
                  <Typography variant="caption" display="inline">
                    {c.date_time}
                  </Typography>
                  <Typography variant="body1">
                    <strong>
                    <Link to={`/users/${c.user._id}`}>
                     { c.user.first_name} {c.user.last_name}
                    </Link>
                    </strong>
                  :{c.comment}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
      </>
    )
}

export default UserPhotos;
