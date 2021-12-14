import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import {
  AppBar, Box, Toolbar, Typography, InputBase,
  Button, TextField,
} from '@mui/material';
import {
  Search as SearchIcon,
  GridView as GridViewIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

//FIREBASE
import firebase from "../utils/firebase/firebase";

//DISPATCHER AND ACTION
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/actions/controlsAction";
import { goSearch, isLogged, signOut } from "../redux/actions/studentAction";

//SELECTOR
import { useSelector } from "react-redux";

// CSS 
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#131414',
  '&:hover': {
    backgroundColor: '#3d3e3f',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  background: '#131414',
  border: '1px solid #2C2F31',
  boxSizing: 'border-box',
  borderRadius: '8px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    color: "#fff"
  },
  width: '237px'
}));

const appBar = {
  backgroundColor: '#1E1F20',
  cursor: 'pointer'
}

const listsNav = {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  marginTop: 8,
  height: 5,
  borderTopLength: 1,
  marginBottom: 15,
  // color: "#fff",
  textDecoration: 'none'
}


const StyledTextField = withStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      color: '#D1D4C9',
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 14,
      border: '1px solid #303336',
      borderRadius: 5
    }
  }
}))(TextField);

export default function Navbar(props) {
  //DISPATCHER
  const dispatch = useDispatch();

  //SELECTOR
  const controls = useSelector((state) => state.controls);

  //STATES
  const [state, setState] = useState({
    email: "",
    logAs: "",
    search: ""
  });
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const student = useSelector((state) => state.student);

  //ONCHANE TEXTFIELD
  const handleChange = (prop) => (e) => {
    setState((prevItem) => ({ ...prevItem, [prop]: e.target.value }));
  };

  //IS AUTH FIREBASE
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAuthenticated(true);
        dispatch(isLogged(user.email));
        setState({ logAs: user.email })
      } else {
        setAuthenticated(false);
      }
    });
  }, [student.viewOneStudent]); // eslint-disable-line react-hooks/exhaustive-deps

  //SIGN IN
  const submit = (e) => {
    e.preventDefault();

    if (!state.email) {
      alert("Please type an email.")
    }

    //FIREBASE CREATE NEW USER
    firebase.auth().createUserWithEmailAndPassword(state.email, "12341234")
      .then((userCredential) => {
        // Signed in 
        // console.log(user.email);
        alert("Sign in success");
        dispatch(isLogged(userCredential.email));
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        // console.log(errorCode + ": " + errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          //LOGGED IN SAME EMAIL
          firebase
            .auth()
            .signInWithEmailAndPassword(state.email, "12341234")
            .then((signedInUser) => {
              alert("Logged in.");
            })
            .catch((err) => {
            });
          // alert(errorMessage);
        }
      });
  };

  //LOGOUT
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((success) => {
        alert("Logout successful!");
        dispatch(signOut());
      })
      .catch((err) => {
        //error
        // console.log(err);
      });
  };

  //CLOSE SIGN IN BOX
  const handleClickAway = () => {
    setOpen(false);
  };

  //SIGN IN BOX EFFECT
  useEffect(() => {
    // console.log(props.open)
    setOpen(props.open)
  }, [props.open]);

  // ON ENTER
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      // alert(state.search)
      dispatch(setSearch(state.search));
      dispatch(goSearch(state.search, controls.sortBy, controls.filterBy))
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={appBar}>
        <Toolbar>
          <Box sx={{
            justifyContent: 'space-between',
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            width: 367
          }}>
            <Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                style={{ fontWeight: 400 }}
              >
                Student Review
              </Typography>
            </Box>
            <Box sx={{ mt: .5 }}>
              <GridViewIcon />
            </Box>
          </Box>

          <Box style={{ width: '100%', }}>
            <Box
              sx={{
                display: 'grid',
                gap: .1,
                gridTemplateColumns: 'repeat(3, 1fr)',
                width: 400,
                margin: 'auto'
              }}
            >
              <Box style={{ textAlign: 'center' }}>
                <NavLink exact to="/studentlist" style={isActive => ({
                  color: isActive ? "#26CE8D" : "#fff",
                  textDecoration: 'none',
                })}>
                  <Typography style={listsNav} >Student List</Typography>
                </NavLink>
              </Box>

              <Box style={{ textAlign: 'center' }}>
                <NavLink exact to="/studentevaluation/EQLbqWTXIx6Yq3pUsE6p" style={isActive => ({
                  color: isActive ? "#26CE8D" : "#fff",
                  textDecoration: 'none'
                })}>
                  <Typography style={listsNav}>Student Evaluation</Typography>
                </NavLink>
              </Box>

              <Box style={{ textAlign: 'center' }}>
                <div style={{
                  width: 20, marginBottom: 10, marginTop: -2
                }}></div>
                <Typography style={listsNav}>Blog</Typography>
              </Box>

            </Box>

          </Box>

          <AccountCircleIcon onClick={() => setOpen(open => !open)}
            style={{ width: 28, height: 28, cursor: 'pointer' }} />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={onKeyDownHandler}
              onChange={handleChange("search")}
            />
          </Search>


        </Toolbar>
      </AppBar>


      {/* sign in */}
      {open &&

        <ClickAwayListener onClickAway={handleClickAway}>

          <Box
            style={{
              backgroundColor: '#131414', height: 220, width: 280,
              position: 'absolute', right: 180, top: 65, borderRadius: 5, border: '1px solid #303336',
              zIndex: 1

            }}>

            <Box style={{ textAlign: 'center', marginTop: 20, paddingRight: 30, paddingLeft: 30, }}>
              {authenticated ? (
                <Typography style={{ color: '#D1D4C9', fontSize: 18 }}>
                  Sign Out
                </Typography>
              ) : (<Typography style={{ color: '#D1D4C9', fontSize: 18 }}>
                Sign In
              </Typography>)
              }
              {authenticated ? (
                <><LogoutIcon style={{
                  color: '#fff', width: 30, height: 30, float: 'right',
                  marginTop: -30, cursor: 'pointer'
                }} onClick={logout} />
                  <Typography style={{ color: '#B6B6B5', fontSize: 14, marginTop: 8 }}>
                    You can now submit your review.
                  </Typography>
                </>
              ) : (
                <><Typography style={{ color: '#B6B6B5', fontSize: 14, marginTop: 8 }}>
                  Sign In to review and rate students
                </Typography>

                  <Box style={{ marginTop: 20 }}>
                    <StyledTextField id="standard-basic" variant="standard"
                      placeholder="Enter your email..." onChange={handleChange("email")} />
                    <Button variant="contained" style={{
                      width: '50%', backgroundColor: '#20C284',
                      marginTop: 15, height: 30
                    }} onClick={submit}>Sign In</Button>
                  </Box></>)}

            </Box>
          </Box>
        </ClickAwayListener>

      }

      {authenticated ? (<Typography style={{
        color: "#7C7E83", float: "right", marginRight: 30,
        fontSize: 14
      }}>Logged in as {state.logAs}</Typography>) : (<div></div>)}

    </Box>
  );
}
