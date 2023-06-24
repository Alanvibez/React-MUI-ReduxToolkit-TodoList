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
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const ToDoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('');

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

  // Sort tasks
  // const handleSortChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   value: string
  // ) => {
  //   setSort(value);

  //   [...filteredTodos].sort((a, b): number => {
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
  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  let filteredTodos = useMemo(() => {
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else if (filter === 'incompleted') {
      return todos.filter((todo) => !todo.completed);
    } else {
      return todos;
    }
  }, [todos, filter]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="my-5 bg-white rounded-sm p-4">
      <div className="flex flex-col gap-4">
        <MyForm onSubmit={handleAddToDo} />
        {todos.length ? (
          <>
            <div className="flex justify-between">
              <Select
                size="small"
                defaultValue={'all'}
                className="max-w-[200px]"
                onChange={handleSelectChange}
              >
                <MenuItem value={'all'}>Все</MenuItem>
                <MenuItem value={'completed'}>Выполненные</MenuItem>
                <MenuItem value={'incompleted'}>Не выполненные</MenuItem>
              </Select>
              <ToggleButtonGroup
                color="primary"
                // value={alignment}
                exclusive
                // onChange={handleSortChange}
                aria-label="Platform"
              >
                <ToggleButton value="title">
                  <SortByAlphaIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="index">
                  <SortIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <TransitionGroup>
              {filteredTodos.map((todo: ToDo, index) => (
                <CSSTransition classNames="fade" timeout={500} key={todo.id}>
                  <ToDoItem
                    oncompleted={handleComplete}
                    onSave={handleEditToDo}
                    onDelete={handledelteToDo}
                    todo={todo}
                    key={todo.id}
                    index={index}
                  ></ToDoItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </>
        ) : (
          <Typography className="text-black text-center" variant="h5">
            Пусто...
          </Typography>
        )}
      </div>
    </div>
  );
};
