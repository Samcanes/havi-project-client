import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "../../components/Headers";
import { DataGrid } from '@mui/x-data-grid';


export default function Home() {
  const navigate = useNavigate();
  const [allUserData, setAllUserData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // console.log(token);
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        sessionStorage.removeItem("token");
        navigate("/login");
      } else {
        // populateQuote();
      }
    } else {
      console.log("here");
      navigate("/login");
    }
    renderUsers()
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
    { field: 'email', headerName: 'Email', width: 180 },
    
    { field: 'city', headerName: 'City', type: 'string', width: 150},
    { field: 'dob', headerName: 'DOB', type: 'string', width: 130},
    { field: 'pin', headerName: 'ZIP', type: 'string', width: 90},
    { field: 'hash_password', headerName: 'Hash Password', width: 400 },
  ];

  async function renderUsers() {
    const response = await fetch(
      "https://havi-project-server.herokuapp.com/api/getUsers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userData = await response.json();
    console.log(userData.data)
    setAllUserData(userData.data.map(
      (element, index) => { 
        
        element.id = index
        console.log(element)
        return element
     }
     )
    );
    console.log(allUserData)
    // ();
  }
  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "80px" }}>

      <DataGrid
        rows={allUserData}
        columns={columns}
        rowHeight={38}
        rowsPerPageOptions={[]}
        checkboxSelection
        disableSelectionOnClick
      />
      </Container>
    </div>
  );
}
