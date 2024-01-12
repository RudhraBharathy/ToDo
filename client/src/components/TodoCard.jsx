import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import NightlifeRoundedIcon from "@mui/icons-material/NightlifeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import TodoOperation from "./TodoOperation";

const icons = [
  <WorkRoundedIcon key="work" className="m-3" />,
  <MenuBookRoundedIcon key="menu" className="m-3" />,
  <NightlifeRoundedIcon key="nightlife" className="m-3" />,
  <PeopleRoundedIcon key="people" className="m-3" />,
];

const cardStyle = {
  minWidth: 300,
  border: "1px #1976d2 solid",
};

const contentStyle = {
  py: 4,
  px: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const TodoCard = ({todo}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Card className="px-6" sx={cardStyle}>
      <Box>
        <CardContent sx={contentStyle}>
          <Typography
            sx={{
              fontSize: 25,
              textDecoration: isChecked ? "line-through" : "none",
            }}
            color="black"
          >{todo.title}
          </Typography>
          <Button size="small">
            <TodoOperation />
          </Button>
        </CardContent>
        <Typography
          sx={{
            fontSize: 15,
            textDecoration: isChecked ? "line-through" : "none",
          }}
        > {todo.description}
        </Typography>
      </Box>
      <CardContent sx={contentStyle}>
        <Box sx={{ color: "#1976d2" }}>{icons}</Box>
        <Box className="m-0 p-0 mr-5 flex flex-row justify-end items-center">
          <Checkbox
            size="small"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
          />
          <Typography
            sx={{
              fontSize: 16,
            }}
            color="black"
          >
            Done
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoCard;