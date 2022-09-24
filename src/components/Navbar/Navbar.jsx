import React, { useState, useEffect } from "react";
import { setUser, userSelector } from '../../features/auth.js'
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery
} from "@mui/material";
import { fetchToken, getSessionId, moviesApi } from "../../utils"
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom"
import useStyles from './styles'
import { useTheme } from "@emotion/react";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector)
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('request_token');
  const sessionid = localStorage.getItem('session_id');
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const dispatch = useDispatch();

  console.log(user)

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionid) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionid}`);
          dispatch(setUser(userData))
        } else {
          const sessionIdt = await getSessionId();

          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdt}`);

          dispatch(setUser(userData))
        }

        
      }

      
    }

    logInUser();
  }, [token])


  return (
    <>
      <AppBar position="fixed" >
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color="inherit" edge="start" style={{ outline: 'none' }} onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => { }} >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>Login &nbsp; <AccountCircle /> </Button>
            ) : (
              <Button color="inherit" component={Link} to={`/profile/${user.id}`} className={classes.linkButton} onClick={() => { }}>{!isMobile && <>My Movies &nbsp; </>}
                <Avatar style={{ width: '30px', height: '30px' }} alt='profile' src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' /> </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent" open
              classes={{ paper: classes.drawerPaper }}>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}

        </nav>
      </div>
    </>
  )
};

export default Navbar;
