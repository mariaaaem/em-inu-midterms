import React, { useState, useEffect } from "react";
import {
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";

//DISPATCHER AND ACTION
import { useDispatch } from "react-redux";
import { setViewStudent, setStudentList } from "../redux/actions/studentsAction";

//STAR RATING
import StarRatings from "react-star-ratings";

//SELECTOR
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#131414",
    color: "#62666D",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: "#62666D",
    border: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#1E1F20",
  height: 18,
  borderRadius: 15,
  marginTop: 100,
  "&:hover": {
    background: "#292929",
  },
}));

export default function StudentTable() {
  //SELECTOR
  const students = useSelector((state) => state.students);
  const [loading, setLoading] = useState(true);

  //DISPATCHER
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setStudentList());
      setLoading(false);
    }, 400);
  }, [dispatch, loading]); 

  const navigatePage = (id) => {
    dispatch(setViewStudent(id));
    setTimeout(() => {}, 1000);
  };

  return (
    <TableContainer
      style={{
        marginTop: -50,
        width: "100%",
      }}
    >
      <Table
        sx={{
          minWidth: 700,
        }}
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 .7em",
        }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align='left' style={{ width: 270 }}>
              Name
            </StyledTableCell>
            <StyledTableCell align='center'>Year & Section</StyledTableCell>
            <StyledTableCell align='center'>Reviews</StyledTableCell>
            <StyledTableCell align='center' style={{ width: 120 }}>
              Rating
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ width: "100%" }}>
          {students.studentList.map((row) => (
            <StyledTableRow
              id={row.id}
              key={row.name}
              style={{ cursor: "pointer" }}
              onClick={() => navigatePage(row.id)}
            >
              <StyledTableCell
                align='left'
                style={{
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                  border: "1px solid #303336",
                  borderRight: "none",
                }}
              >
                <Link
                  to={`studentevaluation/${row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Box style={{ width: 45, marginRight: 20 }}>
                      <CardMedia
                        component='img'
                        sx={{
                          width: 35,
                          height: 35,
                          borderRadius: 1,
                          border: 1,
                          padding: 1,
                          borderColor: "#303336",
                        }}
                        image={row.photo}
                      />
                    </Box>
                    <Typography style={{ fontSize: 14, color: "#D1D4C9" }}>
                      {row.name}
                    </Typography>
                  </Box>
                </Link>
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{
                  border: "1px solid #303336",
                  borderLeft: "none",
                  borderRight: "none",
                  fontSize: 14,
                }}
              >
                <Link
                  to={`studentevaluation/${row.id}`}
                  style={{ textDecoration: "none", color: "#62666D" }}
                >
                  {row.section}
                </Link>
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{
                  border: "1px solid #303336",
                  borderLeft: "none",
                  borderRight: "none",
                  fontSize: 14,
                  color: "#D1D4C9",
                }}
              >
                <Link
                  to={`studentevaluation/${row.id}`}
                  style={{ textDecoration: "none", color: "#62666D" }}
                >
                  {row.stud_reviews}
                </Link>
              </StyledTableCell>
              <StyledTableCell
                align='center'
                style={{
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  border: "1px solid #303336",
                  borderLeft: "none",
                  fontSize: 14,
                }}
              >
                <Link
                  to={`studentevaluation/${row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <StarRatings
                    rating={row.stud_rating}
                    starRatedColor='#26CE8D'
                    numberOfStars={5}
                    starDimension='20px'
                    starSpacing='0px'
                    isSelectable='false'
                    starHoverColor='#26CE8D'
                    starEmptyColor='#696969'
                  />
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
