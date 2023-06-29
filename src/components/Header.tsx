import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface HeaderProps {
  burger: () => void;
  open: boolean;
}

export const Header: FC<HeaderProps> = ({ burger, open }) => {
  return (
    <header className="h-fit py-3">
      <IconButton color="primary" onClick={burger}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </header>
  );
};

export default Header;
