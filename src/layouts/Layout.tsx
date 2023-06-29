import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar open={open}></Sidebar>
        <div className="flex-1 px-3 flex flex-col h-full overflow-y-auto">
          <Header open={open} burger={openSidebar} />
          <Outlet />
        </div>
      </div>
    </>
  );
};
