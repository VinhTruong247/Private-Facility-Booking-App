import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import Link
import { Container, Typography, Card, IconButton } from "@mui/material";
import { getCourtInfo } from "../../services/courtService";
import { ArrowBack } from "@mui/icons-material"; // Import ArrowBack icon
import "./SearchCourseResult.scss";

const CourtDetailsPage = () => {
  const { id } = useParams();

  const [courtData, setCourtData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate hook

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
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!courtData) {
    return (
      <div className="container">
        <div className="loading">No court details found.</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <IconButton onClick={() => navigate(-1)} aria-label="back" className="back-button">
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" component="h1" className="title">
          {courtData.name} Details
        </Typography>
      </div>
      <Card className="card">
        <Container>
          <Typography variant="h4" gutterBottom className="description">
            {courtData.description}
          </Typography>
          <Typography variant="body1" gutterBottom className="sport-type">
            <b>Sport Type:</b> {courtData.sportType}
          </Typography>
          <Typography variant="body1" gutterBottom className="area">
            <b>Area:</b> {courtData.area}
          </Typography>
          <Typography variant="body1" gutterBottom className="availability">
            <b>Availability:</b>{" "}
            <span>{courtData.isAvailable ? "Available" : "Not Available"}</span>
          </Typography>
        </Container>
      </Card>
    </div>
  );
};

export default CourtDetailsPage;