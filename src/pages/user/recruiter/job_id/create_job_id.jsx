import react, { Fragment, useState } from "react";
import { Breadcrumbs, Btn, P } from "../../../../AbstractElements";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import CKEditors from "react-ckeditor-component";
import { CreateNewJob } from "../../../../api_handler/jobHandler";
import WorkFlowModal from "./components/modal";

const CreateJobId = () => {
  const userType = sessionStorage.getItem("user_type");
  const [formdata, setFormdata] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("content");
  const [files, setFiles] = useState([]);
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const onSubmit = (data) => {
    setFormdata(data);
    const formDatas = new FormData();

    // Append key-value pairs to FormData
    formDatas.append("jobID", data.jobId);
    formDatas.append("department", data.dept);
    formDatas.append("jobTitle", data.jobt);
    formDatas.append("manager", data.mname);
    formDatas.append("owner", data.oname);
    formDatas.append("count", data.jobcount);
    formDatas.append("jd", content);

    // Append files to FormData
    for (let i = 0; i < files.length; i++) {
      formDatas.append("file", files[i]);
    }
    // Log FormData for debugging
    for (const pair of formDatas.entries()) {
      console.log(pair[0], pair[1]);
    }
    setModal(true);
    // Assuming CreateNewJob is an async function
    CreateNewJob(formDatas)
      .then((res) => {
        console.log(res);
        // window.location.replace(`/${userType}/job/all-jobs`);
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Job"
        title="Create Job ID"
        subParent="Job ID"
        mainTitle="Create Job ID"
      />

      <Container fluid={true}>
        <Card>
          <CardBody>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <Card>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label className="col-form-label">Job ID</Label>
                        <input
                          className={`form-control ${
                            errors.jobid && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Enter Job Id"
                          name="jobId"
                          defaultValue={formdata.jobId || ""}
                          {...register("jobId", { required: true })}
                        />
                        <span className="text-danger">
                          {errors.jobId && "Job Id is required"}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label className="col-form-label">Department</Label>
                        <input
                          className={`form-control ${
                            errors.dept && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Enter Department"
                          name="dept"
                          defaultValue={formdata.dept || ""}
                          {...register("dept", { required: true })}
                        />
                        <span className="text-danger">
                          {errors.dept && "Department is required"}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label className="col-form-label">Job Title</Label>
                        <input
                          className={`form-control ${
                            errors.jobt && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Enter Job Title"
                          name="jobId"
                          defaultValue={formdata.jobt || ""}
                          {...register("jobt", { required: true })}
                        />
                        <span className="text-danger">
                          {errors.jobt && "Job Title is required"}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label className="col-form-label">Manager Name</Label>
                        <input
                          className={`form-control ${
                            errors.mname && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Enter Manager Name"
                          name="mname"
                          defaultValue={formdata.mname || ""}
                          {...register("mname", { required: true })}
                        />
                        <span className="text-danger">
                          {errors.mname && "Manager Name is required"}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label className="col-form-label">Owner Name</Label>
                        <input
                          className={`form-control ${
                            errors.oname && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Enter Job Id"
                          name="oname"
                          defaultValue={formdata.oname || ""}
                          {...register("oname", { required: true })}
                        />
                        <span className="text-danger">
                          {errors.oname && "Owner Name is required"}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label className="col-form-label">Count</Label>
                        <input
                          className={`form-control ${
                            errors.jobcount && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Enter Count"
                          name="jobcount"
                          defaultValue={formdata.jobcount || ""}
                          {...register("jobcount", { required: true })}
                        />
                        <span className="text-danger">
                          {errors.jobcount && "Resume Count is required"}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label className="col-form-label">Resumes</Label>
                        <input
                          type="file"
                          placeholder="Enter Job Description"
                          name="file"
                          onChange={(e) => setFiles([...e.target.files])}
                          multiple
                        />
                        <span className="text-danger">
                          {errors.file && "Resumes is required"}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label className="col-form-label">
                          Job Description
                        </Label>
                        <Controller
                          name="jobdesc"
                          control={control}
                          defaultValue={formdata.jobdesc || ""}
                          render={({ field }) => (
                            <CKEditors
                              activeclassName="p10"
                              content={content}
                              events={{
                                change: onChange,
                              }}
                            />
                          )}
                        />
                        <span className="text-danger">
                          {errors.jobdesc && "Job Description is required"}
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Btn
                    attrBtn={{
                      color: "primary",
                      className: "m-r-15",
                      type: "submit",
                    }}
                  >
                    Start Screening...
                  </Btn>
                </CardFooter>
              </Card>
            </Form>
          </CardBody>
        </Card>
        <WorkFlowModal
          isOpen={modal}
          title={""}
          toggler={toggle}
          bodyClass="grid-showcase"
          cancel={"cancel"}
          save={"Redirect To All Jobs"}
          saveType={"url"}
          redection_url={`/${userType}/job/all-jobs`}
        >
          <Container fluid={true} className="bd-example-row">
            <Card>
              {/* <CardHeader style={{ backgroundColor: "blue" }}>{""}</CardHeader> */}
              <CardBody>
                <i
                  className="fa fa-tasks"
                  aria-hidden="true"
                  style={{ textAlign: "center", fontSize: "40px" }}
                ></i>
                <br />
                <P>Job Id has been Created</P>
              </CardBody>
            </Card>
          </Container>
        </WorkFlowModal>
      </Container>
    </Fragment>
  );
};
export default CreateJobId;
