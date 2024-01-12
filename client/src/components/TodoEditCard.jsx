import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import NightlifeRoundedIcon from "@mui/icons-material/NightlifeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const icons = [
  <WorkRoundedIcon key="work" className="m-3 cursor-pointer" />,
  <MenuBookRoundedIcon key="menu" className="m-3 cursor-pointer" />,
  <NightlifeRoundedIcon key="nightlife" className="m-3 cursor-pointer" />,
  <PeopleRoundedIcon key="people" className="m-3 cursor-pointer" />,
];

export default function TodoEditCard({ handleClose }) {
  const [todoText, setTodoText] = useState({
    title: "",
    description: "",
  });

  const updateJsonText = (fieldName, newTodoText) => {
    setTodoText((prevtodoText) => ({
      ...prevtodoText,
      [fieldName]: newTodoText,
    }));
  };

  const handleInputChange = (fieldName, { target: { value } }) => {
    updateJsonText(fieldName, value);
  };

  const dispatch = useDispatch();

  const addTodoHandle = (event) => {
    event.preventDefault();
    dispatch(addTodo(todoText));
    setTodoText({
      title: "",
      description: ""
    })
    handleClose();
  };



  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <Box className="px-3 flex flex-row justify-between items-center">
          <DialogActions>
            <Button autoFocus onClick={addTodoHandle}>
              Add
            </Button>
          </DialogActions>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: "#1976d2",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                multiline
                maxRows={4}
                onChange={(e) => handleInputChange("title", e)}
              />
              <br />
              <TextField
                id="outlined-textarea"
                label="Description"
                multiline
                rows={4}
                onChange={(e) => handleInputChange("description", e)}
              />
            </div>
          </Box>
          <Box sx={{ color: "#1976d2" }}>{icons}</Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
