import { useSelector, useDispatch } from 'react-redux';
import {
  addToDo,
  deleteTodo,
  toggleTodo,
  changeTodo,
  fetchTodos,
} from '../store/slices/todo';
import { RootState, AppDispatch } from '../store/store';
import { ToDo } from '../models/IToDo';
import { ToDoItem } from './ToDoItem';
import { MyForm } from './MyForm';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import ToDoFilter from './ToDoFilter';

export const ToDoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<{ sort: string; query: string }>({
    sort: 'all',
    query: '',
  });

  //Add task
  const handleAddToDo = useCallback(
    (todo: ToDo) => {
      dispatch(addToDo(todo));
    },
    [dispatch]
  );

  //Delete task
  const handledelteToDo = useCallback(
    (id: number) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  //Change task
  const handleEditToDo = useCallback(
    (id: number, title: string) => {
      dispatch(changeTodo({ id, title }));
    },
    [dispatch]
  );

  //Complete task
  const handleComplete = useCallback(
    (id: number) => {
      dispatch(toggleTodo(id));
    },
    [dispatch]
  );

  //Sort tasks
  // const handleSortChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   value: string
  // ) => {
  //   setSort(value);

  //   todos.sort((a, b): number => {
  //     if (sort === 'title') {
  //       return a.title.localeCompare(b.title);
  //     } else if (sort === 'index') {
  //       return b.id - a.id;
  //     } else {
  //       return 0;
  //     }

  //   });
  // };

  //Filter tasks
  let filteredTodos = useMemo(() => {
    if (filter.sort === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else if (filter.sort === 'incompleted') {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
  }, [todos, filter.sort]);

  filteredTodos = useMemo(() => {
    return filteredTodos.filter((todo) =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [filteredTodos, filter.query]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="w-full py-3">
      <div className="flex flex-col gap-4">
        <MyForm onSubmit={handleAddToDo} />
        <ToDoFilter setFilter={setFilter} filter={filter} />

        {filteredTodos.length ? (
          <>
            {filteredTodos.map((todo: ToDo, index) => (
              <ToDoItem
                oncompleted={handleComplete}
                onSave={handleEditToDo}
                onDelete={handledelteToDo}
                todo={todo}
                key={todo.id}
                index={index}
              ></ToDoItem>
            ))}
          </>
        ) : (
          <Typography className="text-white text-center" variant="h5">
            {filter.query ? 'Не найдено...' : 'Пусто...'}
          </Typography>
        )}
      </div>
    </div>
  );
};
