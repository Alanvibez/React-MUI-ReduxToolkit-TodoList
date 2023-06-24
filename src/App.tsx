import { ToDoList } from './components/ToDoList';
import { Counter } from './components/Counter';

const App: React.FC = () => {
  return (
    <div className='max-w-[800px] w-full m-auto'>
      <Counter />
      <ToDoList />
    </div>
  );
};

export default App;
