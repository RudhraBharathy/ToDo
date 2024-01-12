import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TodoCard from "./TodoCard";
import { useSelector, useDispatch } from "react-redux";

export const TodoMainBox = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <Box className="m-10" sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {todos.map((todo) => (
          <Grid key={todo.id} xs={6} md={6}>
            <TodoCard todo={todo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
