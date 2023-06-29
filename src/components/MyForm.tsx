import { TextField } from '@mui/material';
import { ToDo } from '../models/IToDo';
import { useState } from 'react';
import { Button } from '@mui/material';

interface MyFormProps {
  onSubmit: (newToDo: ToDo) => void;
}

export const MyForm: React.FC<MyFormProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      const newToDo: ToDo = {
        id: new Date().getTime(),
        title: value,
        date: new Date().getDate(),
        completed: false,
      };
      onSubmit(newToDo);
      setValue('');
    }
  };

  return (
    <form className="flex gap-2" action="" onSubmit={handleSubmit}>
      <TextField
        className="w-full bg-white"
        id="filled-basic"
        label="Добавить задачу..."
        variant="filled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        className="w-[100px]"
        type="submit"
        variant="contained"
        color="success"
      >
        Добавить
      </Button>
    </form>
  );
};
