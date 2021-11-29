import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../../components/Headers";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {
  const navigate = useNavigate();
  const [allUserData, setAllUserData] = useState([]);
  const [dataSearched, setDataSearched] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // console.log(token);
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        sessionStorage.removeItem("token");
        navigate("/login");
      } else {
      }
    } else {
      console.log("here");
      navigate("/login");
    }
    renderUsers();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "lastName") || ""
        }`,
    },
    { field: "email", headerName: "Email", width: 180 },
    { field: "city", headerName: "City", type: "string", width: 150 },
    { field: "dob", headerName: "DOB", type: "string", width: 130 },
    { field: "pin", headerName: "ZIP", type: "string", width: 90 },
    { field: "hash_password", headerName: "Hash Password", width: 400 },
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
    console.log(userData.data);
    setDataSearched(
      userData.data.map((element, index) => {
        element.id = index;
        console.log(element);
        return element;
      }), 
    );
    setAllUserData(
      userData.data.map((element, index) => {
        element.id = index;
        console.log(element);
        return element;
      }), 
    );
  }
  const searchFunc = (search) => {
    
    if (searchTerm === "") {
      setDataSearched(allUserData);
    } else {
      setDataSearched(
        allUserData.filter((res) => {
          console.log(res);
          return res.firstName.toLowerCase().match(searchTerm.toLowerCase());
        })
      );
      
    }
  };
  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "80px" }}>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search for..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            searchFunc(e.target.value)
          }}
          onInput={(e) => {
            setSearchTerm(e.target.value)
            searchFunc(e.target.value)
          }}
          onKeyDown={(e) => {
            setSearchTerm(e.target.value)
            searchFunc(e.target.value)
          }}
        />
        {/* dataSearched */}
        <DataGrid
          rows={dataSearched}
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
