import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Headers";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resData, setResData] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.token) {
      sessionStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setShowAlert(true);
      if (data.message) {
        setResData(data.message);
      } else {
        setResData("Cannot Sign IN");
      }
    }
  }

  return (
    <>
      <div>
        <Header></Header>
        {/* <Layout> */}
        <Container style={{ marginTop: "80px" }}>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={loginUser}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <Row>
                {showAlert == true && (
                  <Alert
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    <Alert.Heading>{resData}</Alert.Heading>
                    <p>
                      If u have not registered.
                      <a href="/register" class="alert-link">
                        Pls Click!
                      </a>
                    </p>
                  </Alert>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
        {/* </Layout> */}
      </div>
    </>
  );
}
