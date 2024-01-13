import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { TodoMainBox } from "./components/TodoMainBox";
import TodoNewCard from "./components/TodoNewCard";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [editCardOpen, setEditCardOpen] = React.useState(false);

  const handleEditCardOpen = () => {
    setEditCardOpen(true);
  };

  const handleEditCardClose = () => {
    setEditCardOpen(false);
  };
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              ToDo
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Container className="pt-10">
        <TodoMainBox />
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        className="bg-white border-2 rounded-full text-blue-500 cursor-pointer text-3xl leading-12 w-12 h-12 fixed bottom-20 right-10 z-50"
        sx={{
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        <AddIcon sx={{ color: "#1976d2" }} onClick={handleEditCardOpen} />
      </Fab>
      {editCardOpen && <TodoNewCard handleClose={handleEditCardClose} />}
    </React.Fragment>
  );
}
