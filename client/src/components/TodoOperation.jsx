import * as React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TodoEditCard from "./TodoEditCard";
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todoSlice";

export default function TodoOperation({ todo }) {
  const [anchor, setAnchor] = React.useState(null);
  const [showEditCard, setShowEditCard] = React.useState(false);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleEditClick = () => {
    setShowEditCard(true);
    setAnchor(null);
  };

  const handleEditClose = () => {
    setShowEditCard(false);
  };

  const handleDeleteClick = () => {
    dispatch(removeTodo(todo.id));
    setAnchor(null);
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
        <div>
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
        </div>
      </BasePopup>
      {showEditCard && (
        <TodoEditCard todoToEdit={todo} handleClose={handleEditClose} />
      )}
    </div>
  );
}
