import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface ToDoFilterProps {
  setFilter: (filter: { sort: string; query: string }) => void;
  filter: { sort: string; query: string };
}

export const ToDoFilter: FC<ToDoFilterProps> = ({ filter, setFilter }) => {
  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilter({ ...filter, sort: event.target.value as string });
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: event.target.value });
  };

  return (
    <div className='flex gap-3'>
      <TextField
        className="w-full bg-white"
        id="filled-basic"
        label="Поиск..."
        variant="filled"
        value={filter.query}
        onChange={handleQueryChange}
      />
      <Select
        size="small"
        defaultValue={'all'}
        className="w-full max-w-[200px] bg-white"
        onChange={handleSelectChange}
      >
        <MenuItem value={'all'}>Все</MenuItem>
        <MenuItem value={'completed'}>Выполненные</MenuItem>
        <MenuItem value={'incompleted'}>Не выполненные</MenuItem>
      </Select>
    </div>
  );
};

export default ToDoFilter;
