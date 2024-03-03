import {
  Breadcrumbs,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Pagination,
} from "@mui/material";
import "./SearchCourseResult.scss";
import { useNavigate, useLocation } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { Col, Container, Row } from "react-bootstrap";
import FilterBar from "./FilterBar";
import CourseList from "./courseList";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCourseList,
  getEnrolledCourses,
} from "../../../service/courseService";
import { getUserInfo } from "../../../service/userService";
import { useSelector } from "react-redux";

const SearchCourseResult = () => {
  const LIMIT = 5;
  const userId = useSelector((state) => state.auth.userInfo.id);
  const categoryList = useSelector((state) => state.category.categoryList);

  const [courseList, setCoursesList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePage = (e, value) => {
    setLoading(true);
    if (!sortOption) fetchAllCourses(value, selectedCategory, searchValue);
    if (sortOption === "createdAt")
      fetchAllCourses(value, selectedCategory, searchValue, sortOption);
    if (sortOption === "high")
      fetchAllCourses(value, selectedCategory, searchValue, "price", true);
    if (sortOption === "low")
      fetchAllCourses(value, selectedCategory, searchValue, "price", false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue) return;
    setLoading(true);
    if (!sortOption) fetchAllCourses(1, selectedCategory, searchValue);
    if (sortOption === "createdAt")
      fetchAllCourses(1, selectedCategory, searchValue, sortOption);
    if (sortOption === "high")
      fetchAllCourses(1, selectedCategory, searchValue, "price", true);
    if (sortOption === "low")
      fetchAllCourses(1, selectedCategory, searchValue, "price", false);
  };

  const handleRefeshList = async () => {
    setSearchValue("");
    setSelectedCategory("");
    setSortOption("");
    setLoading(true);
    fetchAllCourses();
  };

  const fetchEnrolledCourses = async () => {
    if (userId) {
      let res = await getEnrolledCourses(userId);
      if (res.succeeded) {
        return res.data;
      } else return [];
    }
    return [];
  };

  const fetchAllCourses = async (
    currentPage,
    categoryId,
    searchValue,
    sortValue,
    sortDescend
  ) => {
    let res = null;
    if (currentPage) {
      res = await getCourseList(
        { categoryId, searchValue, sortValue, sortDescend },
        currentPage,
        LIMIT
      );
    } else
      res = await getCourseList(
        { categoryId, searchValue, sortValue, sortDescend },
        1,
        LIMIT
      );

    if (res.succeeded) {
      let enrollList = await fetchEnrolledCourses();
      let userResArr = await Promise.all(
        res.data.items.map(async (course) => {
          return getUserInfo(course.creatorId);
        })
      );

      res.data.items.forEach((course, index) => {
        course.instructor = userResArr[index].data?.username
          ? userResArr[index].data.username
          : "Unknown";

        categoryList.forEach((category) => {
          if (course.categoryId === category.id)
            course.category = category.name;
        });

        enrollList.every((item) => {
          if (item.id === course.id) {
            course.enrolled = true;
            return false;
          }
          course.enrolled = false;
          return true;
        });
      });

      if (currentPage) setPage(currentPage);
      setTotalResult(res.data.resultCount);
      setCount(res.data.totalPages);
      setCoursesList(res.data.items);
      setLoading(false);
    } else toast.error(res.message);
  };

  useEffect(() => {
    if (location.state?.categoryId) {
      fetchAllCourses(1, location.state.categoryId);
      setSelectedCategory(location.state.categoryId);
    } else if (location.state?.searchValue) {
      fetchAllCourses(1, null, location.state.searchValue);
      setSearchValue(location.state.searchValue);
    } else fetchAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="searchList-container">
      <div className="header mt-2 py-5">
        <Container>
          <Col className="mb-4" xs={5}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Home
              </Link>
              <Link
                underline="hover"
                sx={{ cursor: "pointer" }}
                color="text.primary"
              >
                Search Result
              </Link>
            </Breadcrumbs>
          </Col>

          <Row>
            <Col className="title" xs={6} sm={4}>
              Search Result
            </Col>

            <Col xs={1} sm={4}></Col>

            <Col className="search-box" xs={5} sm={4}>
              <form onSubmit={handleSearch}>
                <OutlinedInput
                  size="small"
                  type="text"
                  placeholder="input search text."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end" type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </form>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="body py-3">
        <Container>
          <Row>
            <Col md={5} lg={4}>
              <FilterBar
                categoryList={categoryList}
                fetchAllCourses={fetchAllCourses}
                setLoading={setLoading}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                searchValue={searchValue}
                setSortOption={setSortOption}
                sortOption={sortOption}
              />
            </Col>
            <Col md={7} lg={8}>
              <CourseList
                fetchAllCourses={fetchAllCourses}
                courseList={courseList}
                totalResult={totalResult}
                loading={loading}
                handleRefeshList={handleRefeshList}
              />

              <Pagination
                className="course-paginate"
                count={count}
                page={page}
                color="primary"
                onChange={handleChangePage}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SearchCourseResult;
