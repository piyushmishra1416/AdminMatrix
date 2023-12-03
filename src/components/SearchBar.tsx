// import * as React from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",

  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));



interface SearchAppBarProps {
  onSearch: (query: string) => void;
  onDeleteSelected: () => void;
}

export default function SearchAppBar(
  { onSearch, onDeleteSelected }: SearchAppBarProps,

) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
   //  onSearch(query);
  };

  const handleKeyPress = (e: { key: string; }) => {
   if (e.key === 'Enter') {
      console.log('hello')
     onSearch(searchQuery);
   }
 };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
          <Search className="search-icon">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyUp={(e) => handleKeyPress(e)}
            />
          </Search>
          <Button
            variant="contained"
            color="error"
            onClick={onDeleteSelected}
            endIcon={<DeleteIcon />}
          >
            Delete All
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
