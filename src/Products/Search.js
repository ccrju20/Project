import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const Search = (props) => {
  const getSearchTerm = (event) => {
      props.searchHandler(event.target.value);
  };
  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search"
        value={props.term}
        onChange={getSearchTerm}
        variant="standard"
        fullWidth
      />
    </>
  );
};

export default Search;
