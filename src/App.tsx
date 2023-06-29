import { Todo } from './pages/TodoPage';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { Layout } from './layouts/Layout';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="/ToDo" element={<Todo />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
