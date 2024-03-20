import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const { style1, style2 } = props;

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
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
      marginLeft: theme.spacing(1),
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "45ch",
        "&:focus": {
          width: "55ch",
        },
      },
      [theme.breakpoints.down("sm")]: {
        width: "25ch",
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
