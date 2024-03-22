import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const { style1, style2 } = props;

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1), // Adjusted padding
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      width: "40%", // Adjusted width for smaller screens
    },
    [theme.breakpoints.up("lg")]: {
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1), // Adjusted padding
      paddingLeft: `calc(1em + ${theme.spacing(3)})`, // Adjusted padding
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "30ch", // Adjusted width
        "&:focus": {
          width: "50ch", // Adjusted width
        },
      },
      [theme.breakpoints.down("sm")]: {
        width: "20ch", // Adjusted width
      },
    },
  }));

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (!data.searchValue) return;

    navigate("/search-court", {
      state: {
        searchValue: data.searchValue,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Search sx={style1} style={{ marginLeft: 0 }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={style2}
          {...register("searchValue")}
        />
      </Search>
    </form>
  );
};

export default SearchBar;
