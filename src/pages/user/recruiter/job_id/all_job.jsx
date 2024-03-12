import React, { Fragment, useCallback, useState } from "react";
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

export const AllJobs = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelet, setToggleDelet] = useState(false);
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const data = [
    {
      id: 1,
      JobTitle: "Software Developer",
      applicats_count: 10,
      status: "Active",
    },
    {
      id: 2,
      JobTitle: "Software Developer",
      applicats_count: 10,
      status: "Inprogress",
    },
    {
      id: 3,
      JobTitle: "Software Developer",
      applicats_count: 10,
      status: "Complete",
    },
  ];

  const tableColumns = [
    {
      name: "JobId",
      selector: (row, index) => index + 1,
      sortable: true,
      center: false,
    },
    {
      name: "Job Title",
      selector: (row) => `${row.JobTitle}`,
      sortable: true,
      center: true,
    },
    {
      name: "Total Applicants",
      selector: (row) => `${row.applicats_count}`,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <Button
          color={
            row.status === "Active"
              ? "info"
              : row.status === "Inprogress"
              ? "primary"
              : "success"
          }
          className="px-3"
        >
          {row.status}
        </Button>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Action",
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
                to={`#`}
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

  return (
    <Fragment>
      <Breadcrumbs
        parent="Job"
        title="All Jobs"
        subParent="Job ID"
        mainTitle="All Job ID"
      />
      <Container fluid={true}>
        <Card>
          <CardBody>
            <H5>All Jobs</H5>
            <DataTable
              data={data}
              columns={tableColumns}
              striped={true}
              center={true}
              pagination
              selectableRows
              onSelectedRowsChange={handleRowSelected}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
export default AllJobs;
