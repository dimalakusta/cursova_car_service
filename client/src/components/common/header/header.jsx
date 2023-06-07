import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Avatar, Box, Menu, MenuItem, Toolbar, Typography, IconButton } from '@mui/material';
import { DEFAULT_USER_AVATAR } from 'common/constants/constants';
import { useState } from 'react';
import { StyledAppBar } from './header.styles';

const Header = ({ isSideMenuOpen, onSideMenuOpen, onLogout, username }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar isSideMenuOpen={isSideMenuOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onSideMenuOpen}
          edge="start"
          sx={{
            ...(isSideMenuOpen && { display: 'none' }),
            marginLeft: -1.5
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div">
            Car Service
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 0, flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
          <Typography variant="h6" noWrap component="div" marginRight={3}>
            {`Hey, ${username.charAt(0).toUpperCase() + username.slice(1)}`}
          </Typography>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Avatar Icon" src={DEFAULT_USER_AVATAR} />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <AccountCircleIcon />
              <Typography textAlign="center" marginLeft={2}>
                Профіль
              </Typography>
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <LogoutIcon />
              <Typography textAlign="center" marginLeft={2}>
                Вийти з системи
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export { Header };
