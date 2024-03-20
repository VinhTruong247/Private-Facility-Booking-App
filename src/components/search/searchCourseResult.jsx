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
import CourtList from "./courtList";
import { useEffect, useState } from "react";
import { getCourtList } from "../../services/courtService";
import { toast } from "react-toastify";

const SearchCourseResult = () => {
  const LIMIT = 5;

  const [courtList, setCourtList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sportTypeId, setSportTypeId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePage = (e, value) => {
    setLoading(true);
    if (!sortOption) fetchAllCourts(value, sportTypeId, areaId, searchValue);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue) return;
    setLoading(true);
    if (!sortOption) fetchAllCourts(1, sportTypeId, areaId, searchValue);
  };

  const handleRefeshList = async () => {
    setSearchValue("");
    setSportTypeId("");
    setAreaId("")
    setSortOption("");
    setLoading(true);
    fetchAllCourts();
  };

  const fetchAllCourts = async (
    current,
    sportTypeId,
    areaId,
    searchValue,
    sortValue,
    sortDescend
  ) => {
    let res = null;
    if (current) {
      res = await getCourtList(
        { sportTypeId, areaId, searchValue, sortValue, sortDescend },
        current,
        LIMIT
      );
    } else
      res = await getCourtList(
        { sportTypeId, areaId, searchValue, sortValue, sortDescend },
        1,
        LIMIT
      );

    if (res.succeeded) {
      if (current) setPage(current);
      setTotalResult(res.data.totalItems);
      setCount(res.data.totalPages);
      setCourtList(res.data.items);
      setLoading(false);
    } 
    else toast.error("Can't fetch the result you search, try something else");
  };

  useEffect(() => {
    if (location.state?.searchValue) {
      fetchAllCourts(1, null, location.state.searchValue);
      setSearchValue(location.state.searchValue); 
    } else if (location.state?.sportType) {
      fetchAllCourts(1, null, location.state.sportType);
      setSportTypeId(location.state.searchValue);
    } else if (location.state?.area) {
      fetchAllCourts(1, location.state.area);
      setAreaId(location.state.area);
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
                fetchAllCourts={fetchAllCourts}
                setLoading={setLoading}
                setAreaId={setAreaId}
                sportTypeId={sportTypeId}
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
