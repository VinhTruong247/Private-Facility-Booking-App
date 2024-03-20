import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Skeleton } from "@mui/material";
import Card from "react-bootstrap/Card";
import RefreshIcon from "@mui/icons-material/Refresh";

const CourtList = (props) => {
  const { courtList, loading, handleRefeshList } = props;

  return (
    <div className="course-list ps-md-5 mt-4 mt-md-0">
      <div className="mb-3 mb-md-5 d-flex align-items-center justify-content-between">
        <IconButton onClick={handleRefeshList}>
          <RefreshIcon />
        </IconButton>
      </div>

      {loading ? (
        <>
          <Skeleton height={80} />
          <Skeleton variant="rectangular" height={200} />
        </>
      ) : (
        <>
          {courtList &&
            courtList.length > 0 &&
            courtList.map((item) => {
              return (
                <Link to={`/court/${item.id}`} key={item.id}>
                  <Card className="course-item mb-4 p-1 ">
                    <Card.Img variant="top" />
                    <Card.Body>
                      <Card.Title className="course-title">
                        {item.name}
                      </Card.Title>
                      <Card.Text>
                        <span className="category">{item.sportType}</span>
                        <span className="area mt-2">
                          <span>By</span> <b>{item.area}</b>
                        </span>
                        <span className="description">
                          {item.description}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
        </>
      )}
    </div>
  );
};

export default CourtList;
