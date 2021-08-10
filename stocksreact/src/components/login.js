import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { loginMethodAction } from "../actions/loginAction";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import NavBar from "./navbar";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, loginResponse, error } = useSelector(
    (state) => ({
      loading: state.LoginReducer.loading,
      loginResponse: state.LoginReducer.loginResponse,
      error: state.LoginReducer.error,
    }),
    shallowEqual
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const check = useRef(false);

  useEffect(() => {
    if (loginResponse && loginResponse.status === 200) {
      toast.success(loginResponse.data.message, { autoClose: 5000 });
      history.push("/stocks");
      localStorage.setItem("stocks_token", loginResponse.data.token);
    }
  }, [loginResponse]);

  useEffect(() => {
    if (check.current) {
      toast.error("Invalid credentials", { autoClose: 5000 });
    } else {
      check.current = true;
    }
  }, [error]);

  const loginMethod = (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      toast.warn("Please enter both fields", { autoClose: 5000 });
    } else {
      dispatch(loginMethodAction({ username: username, password: password }));
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <div className="d-flex justify-content-center align-middle">
          <Form onSubmit={loginMethod}>
            <FloatingLabel className="mb-3" label="Username">
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel className="mb-3" label="Password">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              )}
              {!loading && "Log In"}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
