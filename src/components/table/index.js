import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import Header from "../../components/Headers";

export default function Home() {
  const navigate = useNavigate();
  const [allUserData, setAllUserData] = useState("");

  useEffect(() => {
    renderUsers();
    console.log(allUserData);
    const token = sessionStorage.getItem("token");
    console.log(token);
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
  }, []);

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
    console.log(userData);
    setAllUserData(userData);
    // ();
  }

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "80px" }}>
        <Table style={{ fontSize: 12 }} responsive="sm">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>DOB(YYYY-MM-DD)</th>
              <th>City</th>
              <th>ZIP</th>
              <th>Password Stored</th>
            </tr>
          </thead>
          <tbody>
            {allUserData
              ? allUserData.data.map((user) => {
                  console.log(user);
                  return (
                    <tr key={user._id}>
                      <td> {user.lastName}</td>
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                      <td>{user.dob}</td>
                      <td>{user.city}</td>
                      <td>{user.pin}</td>
                      <td>{user.hash_password}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table> 
      </Container>
    </div>
  );
}
