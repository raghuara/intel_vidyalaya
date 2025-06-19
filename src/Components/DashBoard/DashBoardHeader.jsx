import React from 'react';
import { Box, IconButton, useMediaQuery, useTheme, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMainMenu } from '../../Redux/Slices/MainMenuSlice';
import productLogo from '../../Images/Login/SchoolMate Logo.png';
import { closeSubmenu } from '../../Redux/Slices/SubMenuController';
import { selectWebsiteSettings } from '../../Redux/Slices/websiteSettingsSlice';

function DashbrdHeader() {
  const theme = useTheme(); 
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMainMenuOpen = useSelector((state) => state.menu.isMainMenuOpen);
  const websiteSettings = useSelector(selectWebsiteSettings); 
  const handleToggleSidebar = () => {
    dispatch(toggleMainMenu());
    dispatch(closeSubmenu());
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1201,
      }}
    >
      <Box sx={{ display: "flex", alignItems: 'center' }}>
      <Box sx={{ height: "60px", display:"flex", alignItems:"center", pl:2 }}>
                <img src={productLogo} width={"150px"} alt="logo" />
            </Box>
      </Box>
      {isMobile && (
        <IconButton onClick={handleToggleSidebar}>
          {isMainMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}
    </Box>
  );
}

export default DashbrdHeader;
