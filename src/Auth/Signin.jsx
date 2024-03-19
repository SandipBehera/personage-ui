import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import {
  EmailAddress,
  ForgotPassword,
  Password,
  RememberPassword,
  SignIn,
} from "../Constant";

import { useNavigate } from "react-router-dom";
import CustomizerContext from "../_helper/Customizer";
import { ToastContainer, toast } from "react-toastify";
import { LoginUser } from "../api_handler/onbordUsers";
import { el, tr } from "date-fns/locale";

const Signin = ({ selected }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);

  const [userType, setUserType] = useState(
    sessionStorage.getItem("user_type" || "")
  );
  const [name, setName] = useState(sessionStorage.getItem("Name" || ""));

  // useEffect(() => {
  //   if (sessionStorage.getItem("login")) {
  //     history(`${userType}/dashboard`);
  //   } else {
  //     history(`/login`);
  //   }
  // }, []);

  const loginAuth = async (e) => {
    e.preventDefault();
    const data = {
      username: userId,
      password: password,
    };
    LoginUser(data).then((res) => {
      try {
        if (res.message === "Success") {
          sessionStorage.setItem("login", JSON.stringify(true));
          sessionStorage.setItem("user_type", res.user_data.user_type);
          sessionStorage.setItem(
            "Name",
            res.user_data.first_name + res.user_data.last_name
          );
          sessionStorage.setItem("user_id", res.user_data.username);
          sessionStorage.setItem("authenticated", JSON.stringify(true));
          localStorage.setItem(
            "sidebar_layout",
            "horizontal-wrapper enterprice-type advance-layout"
          );
          window.location.href = `${res.user_data.user_type}/dashboard`;

          toast.success("Successfully logged in!..");
        } else {
          toast.error("You enter wrong password or username!..");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("internal server error!..");
      }
    });
  };

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <H4>
                    {selected === "simpleLogin" ? "" : "Welcome To Pesonage.Ai"}
                  </H4>
                  <P>{"Enter your UserId & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="text"
                      onChange={(e) => setUserId(e.target.value)}
                      value={userId}
                    />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input
                        className="form-control"
                        type={togglePassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <div
                        className="show-hide"
                        onClick={() => setTogglePassword(!togglePassword)}
                      >
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <div className="position-relative form-group mb-0">
                    <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <a className="link" href="#javascript">
                      {ForgotPassword}
                    </a>
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "d-block w-100 mt-2",
                        onClick: (e) => loginAuth(e),
                      }}
                    >
                      {SignIn}
                    </Btn>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
