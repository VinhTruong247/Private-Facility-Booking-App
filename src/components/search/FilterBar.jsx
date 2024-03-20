import React, { useEffect, useState } from 'react';
import { getAreaList } from '../../services/areaService';
import { getSportList } from '../../services/sportTypeService';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
  Box,
} from "@mui/material";

const FilterBar = (props) => {
  const {
    fetchAllCourts,
    setLoading,
    setAreaId,
    setSportTypeId,
    searchValue,
  } = props;

  const [areas, setAreas] = useState([]);
  const [sportTypes, setSportTypes] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [selectedSportTypeId, setSelectedSportTypeId] = useState('');

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await getAreaList({}, 1, 10);
        if (res.data && res.data.items) {
          setAreas(res.data.items);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();

    const fetchSportTypes = async () => {
      try {
        const res = await getSportList({}, 1, 10);
        if (res.data && res.data.items) {
          setSportTypes(res.data.items);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchSportTypes();

  }, []);

  const handleChangeArea = (value) => {
    setLoading(true);
    setSelectedAreaId(value);
    setAreaId(value);
    fetchAllCourts(1,selectedSportTypeId, value, searchValue);
  };

  const handleChangeSportType = (value) => {
    setLoading(true);
    setSelectedSportTypeId(value);
    setSportTypeId(value);
    fetchAllCourts(1, value, selectedAreaId, searchValue);
  };

  const handleClearFilters = () => {
    setSelectedAreaId('');
    setSelectedSportTypeId('');
    setAreaId('');
    setSportTypeId('');
    setLoading(true);
    fetchAllCourts(1, '', '', searchValue);
  };

  return (
    <>
      <div className="filterBar">
        <div className="filter-header">
          <div className="filter-title">Filters</div>
          <hr />
        </div>

        <div className="filter-options">
          <FormControl variant="standard" className="filter-control">
            <InputLabel id="area-select-label">Area</InputLabel>
            <Select
              labelId="area-select-label"
              id="area-select"
              value={selectedAreaId}
              onChange={(e) => handleChangeArea(e.target.value)}
              label="Area"
              className="select-field"
            >
              {areas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" className="filter-control">
            <InputLabel id="sport-type-select-label">Sport Types</InputLabel>
            <Select
              labelId="sport-type-select-label"
              id="sport-type-select"
              value={selectedSportTypeId}
              onChange={(e) => handleChangeSportType(e.target.value)}
              label="Sport Types"
              className="select-field"
            >
              {sportTypes.map((sport) => (
                <MenuItem key={sport.id} value={sport.id}>
                  {sport.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleClearFilters}
            className="clear-button"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterBar;