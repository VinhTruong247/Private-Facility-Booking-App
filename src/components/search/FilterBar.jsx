import React, { useEffect, useState } from 'react';
import { getAreaList } from '../../services/areaService';
import { getSportList } from '../../services/sportTypeService';
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
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
        const res = await getAreaList({pageSize: 20});
        if (res.data && res.data.items) {
          const sortedAreas = res.data.items.sort((a, b) => {
            const numA = parseInt(a.name.substring(1));
            const numB = parseInt(b.name.substring(1));
            return numA - numB;
          });
          setAreas(sortedAreas);
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
    fetchAllCourts(1, selectedSportTypeId, value, searchValue);
  };

  const handleChangeSportType = (value) => {
    setLoading(true);
    setSelectedSportTypeId(value);
    setSportTypeId(value);
    fetchAllCourts(1, value, selectedAreaId, searchValue);
  };


  return (
    <>
      <div className="d-flex align-items-baseline justify-content-between">
        <div style={{ fontWeight: 500, fontSize: "1.3em" }}>Filters</div>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="area-select-label">Area</InputLabel>
          <Select
            labelId="area-select-label"
            id="area-select"
            value={selectedAreaId}
            onChange={(e) => handleChangeArea(e.target.value)}
            label="Area"
          >
            {areas.map((area) => (
              <MenuItem key={area.id} value={area.id}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <hr />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sport-type-select-label">Sport Types</InputLabel>
          <Select
            labelId="sport-type-select-label"
            id="sport-type-select"
            value={selectedSportTypeId}
            onChange={(e) => handleChangeSportType(e.target.value)}
            label="Sport Types"
          >
            {sportTypes.map((sport) => (
              <MenuItem key={sport.id} value={sport.id}>
                {sport.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr />
    </>
  );
};

export default FilterBar;
