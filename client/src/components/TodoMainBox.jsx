import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TodoCard from "./TodoCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addTodo } from "../features/todoSlice";

export const TodoMainBox = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/showtodos`);
        response.data.forEach((todo) => dispatch(addTodo(todo)));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [dispatch]);

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