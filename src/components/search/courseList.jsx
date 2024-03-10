import { Button, IconButton, Skeleton } from "@mui/material";
import facebook from "../../../assets/image/facebook.png";
import Card from "react-bootstrap/Card";
import { postAddToCart } from "../../../service/paymentService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";

const CourseList = (props) => {
  const userId = useSelector((state) => state.auth.userInfo.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { courseList, loading, totalResult, handleRefeshList } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCourseToCart = async (data) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    let res = await postAddToCart(
      {
        courses: [data.id],
      },
      userId
    );
    if (res.succeeded) {
      dispatch(
        addToCart({
          ...res.data[0],
          checked: false,
        })
      );
      toast.success("Course added to cart successfully.");
    } else toast.error(res.message);
    return;
  };

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
          {courseList &&
            courseList.length > 0 &&
            courseList.map((item) => {
              return (
                <Card className="course-item mb-4 p-1 " key={item.id}>
                  <Card.Img variant="top" src={facebook} />
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

                    {item.enrolled ? (
                      <Button className="add-btn px-5">Watch course</Button>
                    ) : (
                      <Button
                        className="add-btn px-5"
                        onClick={() => addCourseToCart(item)}
                      >
                        Add to cart
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
        </>
      )}
    </div>
  );
};

export default CourseList;
