


"use client";
import { useState } from 'react';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import 'animate.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: 600, // Maximum width to ensure it doesn't grow too large
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    maxWidth: '100%',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const logoCircleStyle = {
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: '#003366', // Dark blue
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  marginRight: 2,
};

// Custom Styled Dialog for positioning on the left side
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    position: 'absolute',
    top: '64px', // Adjust according to your AppBar height
    left: 0,
    margin: theme.spacing(0),
    width: '150px', // Adjust width as needed
    zIndex: theme.zIndex.appBar + 1, // Ensure it appears above the AppBar
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#fff', // Match AppBar background color
  color: 'black',
  fontWeight: 'bold',
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: '#fff', // Match AppBar background color
  color: 'black',
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: '#fff', // Match AppBar background color
  borderTop: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false); // State for the modal dialog
  const [dialogAnchorEl, setDialogAnchorEl] = React.useState(null); // Anchor for the dialog
  const router = useRouter();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isAuthenticated, setIsAuthenticated] = React.useState();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = sessionStorage.getItem("user");
        if (userId) {
          setIsAuthenticated(userId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [setIsAuthenticated]);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpenProfile = () => {
    router.push("/user/myaccount");
  };

  const handleOpenOrders = () => {
    router.push("/user/Getmyorder");
  };

  const handleOpenLogin = () => {
    router.push("/user/login");
  };

  const handleOpenRegister = () => {
    router.push("/user/register");
  };

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const handleSearch = async (e) => {
    // Prevent default action if necessary
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleMenuIconClick = (e) => {
    setDialogAnchorEl(e.currentTarget);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogAnchorEl(null);
  };

  const handleNavigate = (path) => {
    router.push(path);
    handleDialogClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="animate__animated animate__fadeIn"
    >
      {isAuthenticated ? (
        <>
          <MenuItem onClick={handleOpenProfile}>My account</MenuItem>
          <MenuItem onClick={handleOpenOrders}>My Orders</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleOpenLogin}>Login</MenuItem>
          <MenuItem onClick={handleOpenRegister}>Register</MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className="animate__animated animate__fadeIn"
    >
      <MenuItem>
        <IconButton size="large" aria-label="show new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon sx={{ color: '#fff' }} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon sx={{ color: '#fff' }} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle sx={{ color: '#fff' }} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" className="animate__animated animate__fadeIn" position="static" sx={{ backgroundColor: '#003366', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuIconClick} // Open the dialog
          >
            <MenuIcon sx={{ color: '#fff' }} />
          </IconButton>
          <Box sx={logoCircleStyle}>
            <Typography variant="h5">PP</Typography>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 600, color: '#fff' }}
          >
            PixelPurchase
          </Typography>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
            />
            <IconButton color="primary" onClick={handleSearch} sx={{ position: 'absolute', right: 0, top: 0 }}>
              <SearchIcon />
            </IconButton>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <StyledDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        color='white'
        className="animate__animated animate__fadeIn"
        backgroundColor="white"
      >
        <StyledDialogTitle id="responsive-dialog-title">Menu</StyledDialogTitle>
        <StyledDialogContent>
          <MenuItem onClick={() => handleNavigate('/about')}>About Us</MenuItem>
          <MenuItem onClick={() => handleNavigate('/contact')}>Contact Us</MenuItem>
          <MenuItem onClick={() => handleNavigate('/follow')}>Follow Us</MenuItem>
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Close
          </Button>
        </StyledDialogActions>
      </StyledDialog>
    </Box>
  );
}
