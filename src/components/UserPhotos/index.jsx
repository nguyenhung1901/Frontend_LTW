import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, TextField, Button, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import API_BASE_URL from "../../config/api";
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [commentTexts, setCommentTexts] = useState({}); 

  useEffect(() => {
    fetchPhotos();
  }, [userId]);

  const fetchPhotos = () => {
    fetch(`${API_BASE_URL}/api/photo/photosOfUser/${userId}`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data) setPhotos(data);
      })
      .catch(err => console.error(err));
  };

  const handleCommentChange = (photoId, text) => {
    setCommentTexts(prev => ({
      ...prev,
      [photoId]: text
    }));
  };

  const handleCommentSubmit = async (photoId) => {
    const commentText = commentTexts[photoId];
    
    if (!commentText || commentText.trim().length === 0) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/comment/${photoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ comment: commentText })
      });

      if (res.status === 200) {
        setCommentTexts(prev => ({
          ...prev,
          [photoId]: ""
        }));
        
        fetchPhotos();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to add comment");
      }
    } catch (err) {
      console.error("Comment error:", err);
      alert("Network error");
    }
  };

  return (
    <>
      {photos.map(photo => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          <img
            src={`${API_BASE_URL}/images/${photo.file_name}`}
            alt={photo.file_name}
            style={{ width: "100%" }}
          />
          <CardContent>
            <Typography variant="caption" display="block" color="textSecondary">
              {new Date(photo.date_time).toLocaleString()}
            </Typography>

            {/* Comments Section */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Comments ({photo.comments ? photo.comments.length : 0})
              </Typography>

              {photo.comments && photo.comments.map(c => (
                <Box key={c._id} sx={{ mb: 2, p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="caption" display="block" color="textSecondary">
                    {new Date(c.date_time).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>
                      <Link to={`/users/${c.user._id}`}>
                        {c.user.first_name} {c.user.last_name}
                      </Link>
                    </strong>
                    : {c.comment}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Add a comment..."
                  value={commentTexts[photo._id] || ""}
                  onChange={(e) => handleCommentChange(photo._id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCommentSubmit(photo._id);
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  onClick={() => handleCommentSubmit(photo._id)}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default UserPhotos;


