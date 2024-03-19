import { IconButton, Skeleton } from "@mui/material";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";

const CourtList = (props) => {

  const { courtList, loading, totalResult, handleRefeshList } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="course-list ps-md-5 mt-4 mt-md-0">
      <div className="mb-3 mb-md-5 d-flex align-items-center justify-content-between">
        <div className="count ">{totalResult} Result</div>
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
                <Card className="course-item mb-4 p-1 " key={item.id}>
                  <Card.Img variant="top"/>
                  <Card.Body>
                    <Card.Title className="course-title">
                      {item.title}
                    </Card.Title>
                    <Card.Text>
                      <span className="category">{item.category}</span>
                      <span className="instructor mt-2">
                        <span>By</span> <b>{item.instructor}</b>
                      </span>
                      <span className="price">${item.price}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
        </>
      )}
    </div>
  );
};

export default CourtList;