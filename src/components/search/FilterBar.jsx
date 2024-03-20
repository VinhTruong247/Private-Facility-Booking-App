import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Accordion } from "react-bootstrap";

const FilterBar = (props) => {
  const {
    categoryList,
    fetchAllCourses,
    setLoading,
    setSelectedCategory,
    selectedCategory,
    searchValue,
    setSortOption,
    sortOption,
  } = props;

  const handleChangeCategory = (value) => {
    setLoading(true);
    setSelectedCategory(value);
    if (!sortOption) fetchAllCourses(1, value, searchValue);
    if (sortOption === "createdAt")
      fetchAllCourses(1, value, searchValue, sortOption);
    if (sortOption === "high")
      fetchAllCourses(1, value, searchValue, "price", true);
    if (sortOption === "low")
      fetchAllCourses(1, value, searchValue, "price", false);
  };

  const handleSort = (value) => {
    setLoading(true);
    setSortOption(value);
    if (value === "createdAt")
      fetchAllCourses(1, selectedCategory, searchValue, value);
    if (value === "high")
      fetchAllCourses(1, selectedCategory, searchValue, "price", true);
    if (value === "low")
      fetchAllCourses(1, selectedCategory, searchValue, "price", false);
  };

  return (
    <>
      <div className="d-flex align-items-baseline justify-content-between">
        <div style={{ fontWeight: 500, fontSize: "1.3em" }}>Filters</div>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            {/* <MenuItem value="Most reviewed">Most reviewed</MenuItem>
            <MenuItem value="Highest Rated">Highest Rated</MenuItem> */}
            <MenuItem value="createdAt">Newest</MenuItem>
            <MenuItem value="low">Lowest Price</MenuItem>
            <MenuItem value="high">Hightest Price</MenuItem>
          </Select>
        </FormControl>
      </div>

      <hr />

      <Accordion
        className="filterBar"
        defaultActiveKey={["0"]}
        flush
        alwaysOpen
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body>
            <FormControl>
              <RadioGroup
                name="controlled-radio-buttons-group"
                value={selectedCategory}
                onChange={(e) => handleChangeCategory(e.target.value)}
              >
                {categoryList &&
                  categoryList.length > 0 &&
                  categoryList.map((item) => {
                    return (
                      <FormControlLabel
                        key={item.id}
                        control={<Radio value={item.id} />}
                        label={item.name}
                      />
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FilterBar;
