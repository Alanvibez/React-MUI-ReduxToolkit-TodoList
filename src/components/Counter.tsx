import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { increment, decrement, incrementByAmount } from '../store/slices/count';
import { Button } from '@mui/material';

export const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(5));
  };

  return (
    <div className="my-5">
      <div className="text-center my-3 text-xl">Count: {count}</div>
      <div className="flex gap-3">
        <Button
          className="flex-1"
          variant="contained"
          color="success"
          onClick={handleIncrement}
        >
          Добавить
        </Button>
        <Button
          className="flex-1"
          variant="contained"
          color="success"
          onClick={handleDecrement}
        >
          Убавить
        </Button>
        <Button
          className="flex-1"
          variant="contained"
          color="success"
          onClick={handleIncrementByAmount}
        >
          Прибавить на 5
        </Button>
      </div>
    </div>
  );
};
