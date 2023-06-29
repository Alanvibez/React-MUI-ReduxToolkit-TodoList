import {
  List,
  ListItemButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';

interface SidebarProps {
  open: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ open }) => {
  return (
    <div
      className={`transition-all ${open ? 'w-[460px]' : 'w-0 overflow-hidden'}`}
    >
      <List
        className='text-black py-3'
        sx={{ width: '100%', height: '100%', bgcolor: 'white' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <Link className='w-full' to="/">Home</Link>
        </ListItemButton>
        <ListItemButton>
          <Link className='w-full' to="/ToDo">Todo list</Link>
        </ListItemButton>
      </List>
    </div>
  );
};

export default Sidebar;
