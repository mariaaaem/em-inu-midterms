import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  InputUnstyled,
  MenuItem,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";

//FIREBASE
import firebase from "../utils/firebase";

//DISPATCHER AND ACTION
import { useDispatch } from "react-redux";
import { Login, signOut } from "../redux/actions/authAction";

//SELECTOR
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  display: "block",
  position: "relative",
  marginRight: 2,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "auto",

  [theme.breakpoints.down("sm")]: {
    flexGrow: 1,
    display: "flex",
    alignSelf: "flex-end",
    width: "85vw",
    height: "5vh",
    top: "55px",
    position: "absolute",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const classes = {
  cont: {
    color: "#D1D4C9",
    fontFamily: (theme) => theme.typography.fontFamily.Roboto,
    fontWeight: 300,
    fontSize: {
      xs: "10px",
      md: "12px",
      lg: "12px",
    },
    fontStyle: "normal",
  },
  menulink: {
    color: "white",
    cursor: "pointer",
    margin: 1,
    textDecoration: "none",
    whiteSpace: "noWrap",
    fontSize: {
      lg: "15px",
      md: "13px",
      xs: "12px",
    },
    padding: 1,
    "&:after": {
      content: '""',
      width: 0,
      left: "40%",
      top: 0,
      position: "absolute",
      height: "4px",
      backgroundColor: "#26CE8D",
      alignItems: "center",
      justifyContent: "center",
      // display: 'flex'
    },
    "&:hover::after, &:focus::after, .active::after": {
      width: "28px",
      transition: "width 0.4s linear",
    },
    "&:hover, &:focus, &:active": {
      color: "#26CE8D",
    },
  },

  appBar: {
    backgroundColor: "#1E1F20",
    cursor: "pointer",
    height: "70px",
  },
};

const StyledInputElement = styled("input")`
  width: 180px;
  font-size: 12px;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: #99a799;
  border: 1px solid #26ce8d;
  border-radius: 10px;
  padding: 6px 10px;
  margin-top: 5px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #26ce8d;
  }

  &:focus {
    outline: none;
    width: 220px;
    transition: width 200ms ease-out;
  }
`;
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});
export default function Navbar(props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    loginAs: "",
  });
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const students = useSelector((state) => state.students);

  const handleChange = (prop) => (e) => {
    setState((prevItem) => ({ ...prevItem, [prop]: e.target.value }));
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setAuthenticated(true);
        dispatch(Login(user.email));
        setState({ loginAs: user.email });
      } else {
        setAuthenticated(false);
      }
    });
  }, [dispatch, students.viewProfile]);

  //signin
  const submit = (e) => {
    e.preventDefault();

    if (!state.email) {
      alert("Enter Email or Password");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, "password")
      .then((userCredential) => {
        alert("Sign in success");
        dispatch(Login(userCredential.email));
      })
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode === "email already use") {
          firebase
            .auth()
            .signInWithEmailAndPassword(state.email, "password")
            .then((signedInUser) => {
              alert("Logged in.");
            })
            .catch((err) => {});
        }
      });
  };

  //logout
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((success) => {
        alert("Logout successful!");
        dispatch(signOut());
      })
      .catch((err) => {});
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={classes.appBar}>
        <Toolbar>
          <Box
            sx={{
              justifyContent: "space-between",
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
              width: 367,
            }}
          >
            <Box>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                style={{ fontWeight: 400 }}
              >
                Student Review
              </Typography>
            </Box>
            <Box sx={{ mt: 0.5 }}>
              <GridViewTwoToneIcon />
            </Box>
          </Box>

          <Box style={{ width: "100%" }}>
            <Box
              sx={{
                display: "grid",
                gap: 0.1,
                gridTemplateColumns: "repeat(3, 1fr)",
                width: 400,
                margin: "auto",
              }}
            >
              <Box style={{ textAlign: "center" }}>
                <NavLink
                  exact
                  to='/studentlist'
                  style={(isActive) => ({
                    color: isActive ? "#26CE8D" : "#fff",
                    textDecoration: "none",
                  })}
                >
                  <MenuItem sx={classes.menulink}>Student List</MenuItem>
                </NavLink>
              </Box>

              <Box style={{ textAlign: "center" }}>
                <NavLink
                  exact
                  to='/studentevaluation/EQLbqWTXIx6Yq3pUsE6p'
                  style={(isActive) => ({
                    color: isActive ? "#26CE8D" : "#fff",
                    textDecoration: "none",
                  })}
                >
                  <MenuItem sx={classes.menulink}>Student Evaluation</MenuItem>
                </NavLink>
              </Box>

              <Box style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 20,
                    marginBottom: 10,
                    marginTop: -2,
                  }}
                ></div>
                <MenuItem>Blog</MenuItem>
              </Box>
            </Box>
          </Box>

          <AccountCircleOutlinedIcon
            onClick={() => setOpen((open) => !open)}
            style={{ width: 28, height: 28, cursor: "pointer" }}
          />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      {open && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            style={{
              backgroundColor: "#131414",
              height: 220,
              width: 280,
              position: "absolute",
              right: 180,
              top: 65,
              borderRadius: 5,
              border: "1px solid #303336",
              zIndex: 1,
            }}
          >
            <Box
              style={{
                textAlign: "center",
                marginTop: 20,
                paddingRight: 30,
                paddingLeft: 30,
              }}
            >
              {authenticated ? (
                <Typography style={{ color: "#D1D4C9", fontSize: 18 }}>
                  Sign Out
                </Typography>
              ) : (
                <Typography style={{ color: "#D1D4C9", fontSize: 18 }}>
                  Sign In
                </Typography>
              )}
              {authenticated ? (
                <>
                  <Button
                    variant='outlined'
                    sx={{ color: "#26CE8D", marginTop: 1, fontSize: "12px" }}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                  <Typography
                    style={{ color: "#B6B6B5", fontSize: 14, marginTop: 8 }}
                  >
                    Rate Student
                  </Typography>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={classes.cont}>
                      {" "}
                      Sign in to review and rate
                    </Typography>
                    <Typography sx={classes.cont}> Students</Typography>
                    <CustomInput
                      aria-label='Demo input'
                      placeholder='enter email'
                      onChange={handleChange("email")}
                    />
                   <CustomInput
                      aria-label='Demo input'
                      type='password'
                      placeholder='enter password'
                   />
                    <Button  onClick={submit}
                      variant='contained'
                      style={{
                        width: "50%",
                        backgroundColor: "#20C284",
                        marginTop: 15,
                        height: 30,
                      }}
                     
                    >
                      Sign In
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </ClickAwayListener>
      )}

      {authenticated ? (
        <Typography
          style={{
            color: "#7C7E83",
            float: "right",
            marginRight: 30,
            fontSize: 14,
          }}
        >
          Logged in as {state.loginAs}
        </Typography>
      ) : (
        <div></div>
      )}
    </Box>
  );
}
