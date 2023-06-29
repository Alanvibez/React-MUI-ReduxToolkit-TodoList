import { ToDo } from '../models/IToDo';
import { Button, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useState } from 'react';

interface ToDoItemProps {
  onDelete: (id: number) => void;
  onSave: (id: number, title: string) => void;
  oncompleted: (id: number) => void;
  todo: ToDo;
  index: number;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  onDelete,
  onSave,
  oncompleted,
  index,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editVal, setEditVal] = useState<string>('');

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setEditVal(todo.title);
  };

  const handleSaveEdit = () => {
    setIsEdit(false);
    if (editVal.trim()) {
      onSave(todo.id, editVal);
    }
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEditVal(event.target.value);
  };

  const handlecompletedToDo = () => {
    oncompleted(todo.id);
  };

  return (
    <div className="rounded bg-slate-600 p-5 flex gap-5 items-center">
      <div className="flex items-center flex-1">
        {!isEdit ? (
          <>
            <Switch checked={todo.completed} onClick={handlecompletedToDo} />
            <h1
              onClick={handleEdit}
              className={`${todo.completed && 'line-through'}`}
            >
              {index + 1} - {todo.title}
            </h1>
          </>
        ) : (
          <div className="flex gap-2">
            <h1>{index + 1} -</h1>
            <input
              className="flex-1 text-inherit bg-transparent text-white outline-none"
              value={editVal}
              onChange={handleChangeValue}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {isEdit ? (
          <>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={handleSaveEdit}
            >
              Сохранить
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => setIsEdit(false)}
            >
              Отмена
            </Button>
          </>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </div>
    </div>
  );
};
