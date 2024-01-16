import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "../features/todoSlice";
import TodoAlert from "./TodoAlert";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function TodoNewCard({ handleClose }) {
  const [todoText, setTodoText] = useState({
    title: "",
    description: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    type: "",
    show: false,
  });

  const handleInputChange = (fieldName, { target: { value } }) => {
    setTodoText((prevTodoText) => ({
      ...prevTodoText,
      [fieldName]: value,
    }));
  };

  const dispatch = useDispatch();

  const addDataInDB = async () => {
    const todoWithId = {
      id: nanoid(),
      title: todoText.title,
      description: todoText.description,
    };
    const url = `http://localhost:3001/addtodo`;
    console.log(todoWithId.id);
    try {
      await axios.post(url, todoWithId);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const addTodoHandle = () => {
    if (!todoText.title || !todoText.description) {
      setAlert({
        message: "Please fill all the fields",
        type: "error",
        show: true,
      });
      return;
    }

    addDataInDB();

    dispatch(addTodo({ ...todoText, id: nanoid() }));
    setTodoText({
      title: "",
      description: "",
    });
    handleClose(1);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={() => handleClose(0)}
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
            onClick={() => handleClose(0)}
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
                value={todoText.title}
                onChange={(e) => handleInputChange("title", e)}
              />
              <br />
              <TextField
                id="outlined-textarea"
                label="Description"
                multiline
                rows={4}
                value={todoText.description}
                onChange={(e) => handleInputChange("description", e)}
              />
            </div>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      {alert.show && (
        <TodoAlert
          message={alert.message}
          alert={alert.type}
          setShowAlert={() => setAlert((prev) => ({ ...prev, show: false }))}
        />
      )}
    </React.Fragment>
  );
}
