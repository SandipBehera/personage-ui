import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Breadcrumbs, Btn, H5 } from "../../../../AbstractElements";
import {
  Button,
  Card,
  CardBody,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { GetJobDetails } from "../../../../api_handler/jobHandler";
import { Socket_url } from "../../../../api";
import io from "socket.io-client";
import { userType } from "../../../../Constant";

export const AllJobs = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelet, setToggleDelet] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const fetch = async () => {
    try {
      await GetJobDetails().then((res) => {
        setFetchData(res);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    const socket = io(Socket_url);
    socket.on("connect", () => {
      console.log("Connected to the server.");

      socket.on("resume_status", (data) => {
        console.log("Upload complete:", data);
        return fetch();
      });

      socket.on("parsing_files", (data) => {
        console.log("parsing_files:", data);
      });

      socket.on("hahahaha", (data) => {
        console.log("screening_complete:", data);
      });

      socket.on("current_status", (data) => {
        console.log("Upload complete:", data);
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server.");
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const tableColumns = [
    // {
    //   name: "SL No.",
    //   label: "SL No.",
    //   selector: (row, index) => index + 1,
    //   options: {
    //     display: "false", // Set to true if you want to display the ID
    //   },
    // },
    {
      name: "Job ID",
      label: "Job ID",
      selector: (row, index) => row.keyName,
      options: {
        filter: true,
        sort: true,
      },
      width: "15%"
    },
    {
      name: "Count",
      label: "Count",
      selector: (row, index) => row.count,
      options: {
        filter: true,
        sort: true,
      },
      width: "15%"
    },
    {
      name: "Job Title",
      label: "Job Title",
      selector: (row, index) => row.jobTitle,
      options: {
        filter: true,
        sort: true,
      },
      width: "15%"
    },
    {
      name: "Status",
      label: "Status",
      cell: (row, index) => {
        return row.status === "uploaded" ? (
          <Button color="warning" style={{ width: '100%' }}>Parsing</Button>
        ) : row.status === "parsed" ? (
          <Button color="warning" style={{ width: '100%' }}>Parsing</Button>
        ) : row.status === "screening" ? (
          <Button color="warning" style={{ width: '100%' }}>Screening</Button>
        ) : row.status === "complete" ? (
          <Button color="success" style={{ width: '100%' }}>Complete</Button>
        ) : row.status === "closed" ? (
          <Button color="secondary" style={{ width: '100%' }}>Closed</Button>
        ) : (
          <Button color="danger" style={{ width: '100%' }}>Failed</Button>
        );
      },

      options: {
        filter: true,
        sort: true,
      },
      width: "20%"
    },
    {
      name: "Action",
      width: "20%",
      cell: (row) => (
        <Dropdown
          isOpen={activeDropdown === row.id}
          toggle={() => toggleDropdown(row.id)}
        >
          <DropdownToggle caret color="secondary">
            Action
          </DropdownToggle>
          <DropdownMenu
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <DropdownItem>
              <Link
                to={`/${userType}/job_id/workflows/viewJobDetails/${row.keyName}`}
              //   state={{ bookDetails: row }}
              >
                View Details
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="#">Add More Resumes</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="#">Mark Complete</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];
  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const transformedData = Object.entries(fetchData).map(([key, value]) => ({
    id: key,
    keyName: key,
    ...value,
  }));
  const options = {
    selectableRows: "multiple",
    onSelectedRowsChange: handleRowSelected,
    pagination: true,
    center: true,
    dense: true,
    responsive: true,
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Job"
        title="All Jobs"
        subParent="Job ID"
        mainTitle="All Jobs"
      />
      <Container fluid={true}>
        <Card>
          <CardBody>
            <DataTable
              data={transformedData}
              columns={tableColumns}
              options={options}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
export default AllJobs;
