import {
  Breadcrumbs,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Pagination,
  Grid,
  Container,
  Typography
} from "@mui/material";
import "./SearchCourseResult.scss";
import { useNavigate, useLocation } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import FilterBar from "./FilterBar";
import CourtList from "./courtList";
import { useEffect, useState } from "react";
import { getCourtList } from "../../services/courtService";
import { toast } from "react-toastify";

const SearchCourseResult = () => {
  const LIMIT = 10;

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
    fetchAllCourts(value, sportTypeId, areaId, searchValue);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue) return;
    setLoading(true);
    fetchAllCourts(1, sportTypeId, areaId, searchValue);
  };

  const handleRefeshList = async () => {
    setSearchValue("");
    setSportTypeId("");
    setAreaId("");
    setSortOption("");
    setLoading(true);
    fetchAllCourts();
  };

  const fetchAllCourts = async (
    current = 1,
    sportTypeId = "",
    areaId = "",
    searchValue = "",
    sortValue = "",
    sortDescend = false
  ) => {
    try {
      const res = await getCourtList({
        name: searchValue,
        sportTypeId: sportTypeId,
        areaId: areaId,
        sortBy: sortValue,
        sortDescending: sortDescend,
        current,
        pageSize: LIMIT
      });

      if (res && res.data && res.data.items) {
        setPage(current);
        setTotalResult(res.data.totalItems);
        setCount(res.data.totalPages);
        setCourtList(res.data.items);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching court list:", error);
      toast.error("An error occurred while fetching court list");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { searchValue, sportTypeId, areaId } = location.state;

      if (searchValue) {
        setSearchValue(searchValue);
        fetchAllCourts(1, null, null, searchValue);
      } else if (sportTypeId) {
        setSportTypeId(sportTypeId);
        fetchAllCourts(1, sportTypeId);
      } else if (areaId) {
        setAreaId(areaId);
        fetchAllCourts(1, null, areaId);
      } else {
        fetchAllCourts();
      }
    } else {
      fetchAllCourts();
    }
  }, [location.state]);

  return (
    <div className="searchList-container">
      <div className="header">
        <Container>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <form onSubmit={handleSearch}>
                <OutlinedInput
                  fullWidth
                  type="text"
                  placeholder="Search"
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
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className="body">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FilterBar
                fetchAllCourts={fetchAllCourts}
                setLoading={setLoading}
                setAreaId={setAreaId}
                setSportTypeId={setSportTypeId}
                searchValue={searchValue}
                setSortOption={setSortOption}
                sortOption={sortOption}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h2" className="count">
                {totalResult === 0
                  ? "Oops, nothing found"
                  : `Found ${totalResult} ${totalResult === 1 ? "court" : "courts"
                  }`}
              </Typography>

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
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default SearchCourseResult;