import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Container, Row } from "reactstrap";
import GreetingCard from "../../Components/Dashboard/Default/GreetingCard";
import WidgetsWrapper from "../../Components/Dashboard/Default/WidgetsWraper";

const UserDashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Default" parent="Dashboard" title="Default" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard />
          <WidgetsWrapper />
        </Row>
      </Container>
    </Fragment>
  );
};

export default UserDashboard;
