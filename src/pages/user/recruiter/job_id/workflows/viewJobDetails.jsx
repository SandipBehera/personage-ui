import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../../../AbstractElements";
import { useParams } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Progress,
  Row,
} from "reactstrap";
import DataTable from "react-data-table-component";

const ViewJobDetailsById = () => {
  const { jobId } = useParams();
  const data = [
    {
      reqid: jobId,
      candidate_name: "John Doe",
      status: "Approved-AI",
      ai_comment: "Good",
    },
    {
      reqid: jobId,
      candidate_name: "John Doe",
      status: "Approved-AI",
      ai_comment: "Bad",
    },
    {
      reqid: jobId,
      candidate_name: "John Doe",
      status: "Approved-AI",
      ai_comment: "Good",
    },
  ];
  const tableColumns = [
    {
      name: "SL No.",
      label: "SL No.",
      selector: (row, index) => index + 1,
      options: {
        display: "false", // Set to true if you want to display the ID
      },
    },
    {
      name: "Job ID",
      label: "Job ID",
      selector: (row, index) => row.reqid,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Candidate Name",
      label: "Candidate Name",
      selector: (row, index) => row.candidate_name,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Status",
      label: "Status",
      selector: (row, index) => row.status,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "AI Comment",
      label: "AI Comment",
      selector: (row, index) => row.ai_comment,
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  return (
    <Fragment>
      <Breadcrumbs
        parent="Job"
        title={"View Job Details-" + jobId}
        mainTitle={"View Job Details-" + jobId}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <Row>
                  <Col md="2">
                    <Button color="primary">Screening</Button>
                  </Col>
                  <Col md="2">
                    <Button
                      color="recent-box-bg"
                      style={{
                        padding: "0.375rem 0.75rem",
                        marginLeft: "2.50rem",
                        border: "1px solid #ced4da",
                      }}
                    >
                      <i className="fa fa-solid fa-rotate-right"></i>
                    </Button>
                  </Col>
                  <Col md="8">
                    <Progress
                      animated
                      className="my-2"
                      color="success"
                      value="25"
                    >
                      25%
                    </Progress>
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <Button
                      color="recent-box-bg"
                      style={{ border: "1px solid #ced4da", float: "right" }}
                    >
                      5 resumes Processed
                    </Button>
                  </Col>
                  <Col md="6">
                    <Button
                      color="recent-box-bg"
                      style={{ border: "1px solid #ced4da" }}
                    >
                      10 resumes Pending
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <DataTable
              columns={tableColumns}
              data={data}
              pagination
              paginationPerPage={5}
              striped
              highlightOnHover
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
export default ViewJobDetailsById;
