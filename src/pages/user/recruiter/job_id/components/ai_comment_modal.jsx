import React, { useState, useEffect } from "react";
import {
  Button,
  Collapse,
  Container,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { H6 } from "../../../../../AbstractElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const AiCommentModal = (props) => {
  const { isOpen, toggler, title, comment, name, status } = props;
  const [collapseStates, setCollapseStates] = useState({});

  // Function to toggle collapse state for a specific key
  const toggleCollapse = (key) => {
    setCollapseStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the state for the specified key
    }));
  };

  // Initialize collapse states for each entry in the comment object
  useEffect(() => {
    const initialCollapseStates = {};
    Object.keys(comment).forEach((key) => {
      initialCollapseStates[key] = false; // Set initial collapse state to false
    });
    setCollapseStates(initialCollapseStates);
  }, [comment]);

  return (
    <Modal isOpen={isOpen} toggle={toggler} centered>
      <ModalHeader toggle={toggler}>{title}</ModalHeader>
      <ModalBody className="text-center">
        <h4>{name}</h4>
        <p style={{ color: status === "Selected" ? "green" : "red" }}>
          {status}
        </p>
        {Object.entries(comment).map(([key, value]) => (
          <div key={key}>
            <button
              color="primary"
              onClick={() => toggleCollapse(key)} // Pass the key to toggleCollapse function
              style={{
                marginBottom: "1rem",
                textAlign: "left",
                backgroundColor: "#DDDDDD",
                border: "1px solid #76885B",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                color: status === "Selected" ? "green" : "red",
              }}
            >
              {key}{" "}
              <FontAwesomeIcon
                icon={collapseStates[key] ? faAngleUp : faAngleDown}
                style={{ float: "right" }}
              />
            </button>

            <Collapse isOpen={collapseStates[key]}>
              {" "}
              {/* Use collapse state based on key */}
              <Card>
                <CardBody>
                  {typeof value === "object" ? (
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>Skills</th>
                          <th>Match</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <tr key={subKey}>
                            <td>{subKey}</td>
                            <td>{subValue.match}</td>
                            <td>{subValue.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    value
                  )}
                </CardBody>
              </Card>
            </Collapse>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggler}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AiCommentModal;
