import React, { Fragment, useEffect, useState } from "react";
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
import {
  GetJobDetails,
  GetJobDetailsById,
} from "../../../../../api_handler/jobHandler";
import AiCommentModal from "../components/ai_comment_modal";
import io from "socket.io-client";
import { Socket_url } from "../../../../../api";

const ViewJobDetailsById = () => {
  const { jobId } = useParams();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [commentData, setCommentData] = useState({});
  const [commentName, setCommentName] = useState("");
  const [commentStatus, setCommentStatus] = useState("");
  const [progressStatus, setProgressStatus] = useState(0);
  const [jobStatus, setJobStatus] = useState("");

  const modalToggle = () => setModal(!modal);

  const fetch = async () => {
    const body = { requisition_id: jobId };
    return await GetJobDetailsById(body).then((res) => {
      // setData(res);
      const fetchdata = Object.values(res).map((item) => ({
        candidate_name: item.ai_response["name"],
        reqid: jobId,
        status: item.ai_response["Decision"],
        ai_comment: item.ai_response,
      }));
      setData(fetchdata);
    });
  };

  const fetchStatus = async () => {
    try {
      await GetJobDetails().then((res) => {
        setJobStatus(res[jobId].status);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetch();
    fetchStatus();
  }, []);

  useEffect(() => {
    const socket = io(Socket_url);
    socket.on("connect", () => {
      console.log("Connected to the server.");

      socket.on("resume_status", (data) => {
        console.log("Upload complete:", data);
        const resCompleteData = data.completed;
        const resPendingData = data.pending;
        const totalData = resCompleteData + resPendingData;
        const progress = ((totalData - resCompleteData) / totalData) * 100;
        setProgressStatus(progress);
        fetch();
        fetchStatus();
      });
      return () => {
        socket.disconnect();
      };
    });
  }, []);

  const handleViewComment = (comment, name, status) => {
    setCommentData(comment);
    setCommentName(name);
    setCommentStatus(status);
    modalToggle();
  };
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
      cell: (row, index) => {
        return (
          <div>
            <Button
              color="primary"
              style={{
                padding: "0.375rem 0.75rem",
                marginLeft: "2.50rem",
                border: "1px solid #ced4da",
              }}
              onClick={() =>
                handleViewComment(
                  row.ai_comment,
                  row.candidate_name,
                  row.status
                )
              }
            >
              View
            </Button>
          </div>
        );
      },
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
                    {jobStatus === "uploaded" ||
                    jobStatus === "parsed" ||
                    jobStatus === "screening" ? (
                      <Button color="warning">{jobStatus}</Button>
                    ) : (
                      <Button color="success">{jobStatus}</Button>
                    )}
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
                  {progressStatus !== 0 && (
                    <Col md="8">
                      <Progress
                        animated
                        className="my-2"
                        color="success"
                        value={progressStatus || "0"}
                      >
                        {progressStatus}%
                      </Progress>
                    </Col>
                  )}
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
        <AiCommentModal
          isOpen={modal}
          title={""}
          toggler={modalToggle}
          bodyClass="grid-showcase"
          close={"Close"}
          comment={commentData}
          name={commentName}
          status={commentStatus}
        ></AiCommentModal>
      </Container>
    </Fragment>
  );
};
export default ViewJobDetailsById;
