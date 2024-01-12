import * as React from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TodoEditCard from "./TodoEditCard";

export default function TodoOperation() {
  const [anchor, setAnchor] = React.useState(null);
  const [showEditCard, setShowEditCard] = React.useState(false);

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
          <div className="w-full text-left hover:bg-gray-200 hover:text-gray-800 rounded-lg p-2">
            <DeleteRoundedIcon className="mr-3" />
            Delete
          </div>
        </div>
      </BasePopup>
      {showEditCard && <TodoEditCard handleClose={handleEditClose} />}
    </div>
  );
}
