import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, IconButton, CircularProgress } from "@mui/material";
import { getCourtInfo } from "../../services/courtService";
import { ArrowBack } from "@mui/icons-material";
import "./SearchCourseResult.scss";

const CourtDetailsPage = () => {
  const { id } = useParams();
  const [courtData, setCourtData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        setLoading(true);
        const res = await getCourtInfo(id);
        if (res.data) {
          setCourtData(res.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching court details:", error);
        setLoading(false);
      }
    };

    fetchCourtDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <CircularProgress size={60} thickness={4} className="loading-spinner" />
      </div>
    );
  }

  if (!courtData) {
    return (
      <div className="container">
        <Typography variant="h5" className="no-data-text">No court details found.</Typography>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <IconButton onClick={() => navigate(-1)} aria-label="back" className="back-button">
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" className="title">
          {courtData.name} Details
        </Typography>
      </div>
      <Card className="card">
        <Container>
          <Typography variant="body1" gutterBottom className="description">
            {courtData.description}
          </Typography>
          <Typography variant="body1" gutterBottom className="info">
            <b>Sport Type:</b> {courtData.sportType}
          </Typography>
          <Typography variant="body1" gutterBottom className="info">
            <b>Area:</b> {courtData.area}
          </Typography>
          <Typography variant="body1" gutterBottom className="info">
            <b>Availability:</b> <span className={courtData.isAvailable ? "available" : "not-available"}>
              {courtData.isAvailable ? "Available" : "Not Available"}
            </span>
          </Typography>
          {courtData.file && (
            <div className="image-container">
              <img src={courtData.file.url} alt="Court" className="court-image" />
            </div>
          )}
        </Container>
      </Card>
    </div>
  );
};

export default CourtDetailsPage;
