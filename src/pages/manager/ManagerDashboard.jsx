import React, { Fragment } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { Container, Row } from "reactstrap";
import GreetingCard from "../../Components/Dashboard/Default/GreetingCard";

const ManagerDashboard = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Default" parent="Dashboard" title="Default" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <GreetingCard />
        </Row>
      </Container>
    </Fragment>
  );
};

export default ManagerDashboard;
