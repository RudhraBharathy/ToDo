import React, { useState } from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TodoEditCard from "./TodoEditCard";
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todoSlice";
import TodoAlert from "./TodoAlert";
import axios from "axios";

export default function TodoOperation({ todo }) {
  const [anchor, setAnchor] = useState(null);
  const [showEditCard, setShowEditCard] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    show: false,
  });

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchor((prevAnchor) => (prevAnchor ? null : event.currentTarget));
  };

  const handleEditClick = () => {
    setShowEditCard(true);
    setAnchor(null);
  };

  const handleEditClose = (val) => {
    setShowEditCard(false);
    if (val) {
      setAlert({
        message: "Todo updated successfully",
        type: "success",
        show: true,
      });
    }
  };

  const deletedtodoDB = () => {
    const url = `http://localhost:3001/deletetodo`;
    try {
      const todoid = todo.id;
      axios.post(url, { id: todoid });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeleteClick = () => {
    setAnchor(null);
    setAlert({
      message: "Todo Deleted successfully",
      type: "error",
      show: true,
    });

    deletedtodoDB();

    dispatch(removeTodo(todo.id));
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popup" : undefined;

  return (
    <div>
      <div aria-describedby={id} onClick={handleClick}>
        <MoreHorizIcon />
      </div>
      <BasePopup
        id={id}
        open={open}
        anchor={anchor}
        placement="left"
        disablePortal
        className="z-50 rounded-lg text-sm mt-16 p-2"
        style={{ width: "200px", backgroundColor: "#1976d2", color: "#fff" }}
      >
        <div
          className="w-full text-left hover:bg-gray-200 hover:text-gray-800 rounded-lg p-2"
          onClick={handleEditClick}
        >
          <BorderColorRoundedIcon className="mr-3" />
          Edit...
        </div>
        <div
          className="w-full text-left hover:bg-gray-200 hover:text-gray-800 rounded-lg p-2"
          onClick={handleDeleteClick}
        >
          <DeleteRoundedIcon className="mr-3" />
          Delete
        </div>
      </BasePopup>
      {showEditCard && (
        <TodoEditCard todoToEdit={todo} handleClose={handleEditClose} />
      )}
      {alert.show && (
        <TodoAlert
          message={alert.message}
          alert={alert.type}
          setShowAlert={() => setAlert((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}
