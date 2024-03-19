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
import CourtList from "./courseList";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCourtList } from "../../services/courtService";
import { useSelector } from "react-redux";

const SearchCourseResult = () => {
  const LIMIT = 5;
  const categoryList = useSelector((state) => state.category.categoryList);

  const [courtList, setCourtList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [areaId, setAreaId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePage = (e, value) => {
    setLoading(true);
    if (!sortOption) fetchAllCourts(value, areaId, searchValue);
    if (sortOption === "createdAt")
      fetchAllCourts(value, areaId, searchValue, sortOption);
    if (sortOption === "high")
      fetchAllCourts(value, areaId, searchValue, "price", true);
    if (sortOption === "low")
      fetchAllCourts(value, areaId, searchValue, "price", false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue) return;
    setLoading(true);
    if (!sortOption) fetchAllCourts(1, areaId, searchValue);
    if (sortOption === "createdAt")
      fetchAllCourts(1, areaId, searchValue, sortOption);
    if (sortOption === "high")
      fetchAllCourts(1, areaId, searchValue, "price", true);
    if (sortOption === "low")
      fetchAllCourts(1, areaId, searchValue, "price", false);
  };

  const handleRefeshList = async () => {
    setSearchValue("");
    areaId("");
    setSortOption("");
    setLoading(true);
    fetchAllCourts();
  };

  const fetchAllCourts = async (
    currentPage,
    areaId,
    searchValue,
    sortValue,
    sortDescend
  ) => {
    let res = null;
    if (currentPage) {
      res = await getCourtList(
        { areaId, searchValue, sortValue, sortDescend },
        currentPage,
        LIMIT
      );
    } else
      res = await getCourtList(
        { areaId, searchValue, sortValue, sortDescend },
        1,
        LIMIT
      );
  };

  useEffect(() => {
    if (location.state?.areald) {
      fetchAllCourts(1, location.state.areaId);
      setAreaId(location.state.areaId);
    } else if (location.state?.searchValue) {
      fetchAllCourts(1, null, location.state.searchValue);
      setSearchValue(location.state.searchValue);
    } else fetchAllCourts();
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
                fetchAllCourts={fetchAllCourts}
                setLoading={setLoading}
                setAreaId={setAreaId}
                areaId={areaId}
                searchValue={searchValue}
                setSortOption={setSortOption}
                sortOption={sortOption}
              />
            </Col>
            <Col md={7} lg={8}>
              <CourtList
                fetchAllCourts={fetchAllCourts}
                courtList={courtList}
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
