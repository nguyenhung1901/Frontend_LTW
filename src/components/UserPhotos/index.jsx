import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/photo/photosOfUser/${userId}`, {
      credentials: "include" 
    })
      .then(res => {
        if (res.status === 401) {
          console.error("Not authenticated");
          return null;
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data) setPhotos(data);
      })
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <>
      {photos.map(photo => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          <img
            src={`/images/${photo.file_name}`}
            alt={photo.file_name}
            style={{ width: "100%" }}
          />
          <CardContent>
            <Typography variant="caption" display="block">
              {photo.date_time}
            </Typography>

            {photo.comments && photo.comments.map(c => (
              <div key={c._id} style={{ marginTop: "10px" }}>
                <Typography variant="caption" display="block">
                  {c.date_time}
                </Typography>
                <Typography variant="body1">
                  <strong>
                    <Link to={`/users/${c.user._id}`}>
                      {c.user.first_name} {c.user.last_name}
                    </Link>
                  </strong>
                  : {c.comment}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default UserPhotos;


