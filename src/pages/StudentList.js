import React, { useState, useEffect } from "react";
import { Typography, Box } from '@mui/material';

import TopStudentCard from "../components/TopStudentCard";
import FilterArea from "../components/FilterArea";
import StudentTable from "../components/StudentTable";
import StudentTablePagination from "../components/StudentTablePagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//DISPATCHER AND ACTION
import { useDispatch } from "react-redux";

import { topStud } from "../redux/actions/studentsAction";

export default function Studentlist() {
  const open = false;

  const [loading, setLoading] = useState(true);

  //DISPATCHER
  const dispatch = useDispatch();
  
  useEffect(() => {
    setTimeout(() => {
        dispatch(topStud());
        setLoading(false);
    }, 400)
}, [dispatch, loading]) 

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#131414', width: '100%', }}>
      <Navbar open={open} />

      <br /><br /><br />

      {/* body */}
      <Box style={{ width: '70%', margin: 'auto', marginBottom: 120 }}>
        <Box>
          <Typography style={{ color: '#D1D4C9' }}>Top Students</Typography><br />
          <Box sx={{
            display: 'grid', gap: 1.5,
            gridTemplateColumns: 'repeat(4, 1fr)', width: '100%',
          }}>
            <TopStudentCard />
          </Box>
        </Box>

        {/* filter component  */}
        <Box style={{ marginTop: 20, }}>
          <FilterArea />
        </Box>


        {/* table */}
        <Box style={{ marginTop: 80, }}>
          <StudentTable />
          <Box style={{ textAlign: 'center', width: 300, margin: 'auto' }}>
            <StudentTablePagination />
          </Box>
        </Box>

      </Box>

      <Box style={{
        width: '100%', height: 180, backgroundColor: '#131414',
        borderTop: '1px solid #515456'
      }}>
        <Footer />
      </Box>

    </Box>
  );
}
