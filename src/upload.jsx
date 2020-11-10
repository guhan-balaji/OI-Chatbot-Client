import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./upload.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import ApiConstants from "../../config";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "../../App.css";
import { Card } from "react-bootstrap";
import { Animated } from "react-animated-css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as _ from "underscore";
import { postRequest, getRequest } from "../../globalhelper/helper";
import { Redirect } from "react-router-dom";
import axios from "axios";
import download from "downloadjs";
import moment from "moment";
import store from "../../store";
import { navUrl } from "../../actions/common_actions";
import { connect } from "react-redux";

// ApiConstants.externals.serverUrl
const ApiConstantsExternalsServerUrl =
  "https://audiresb.oneintegral.com/backend/";
//make config later

class Upload extends Component {
  constructor(props) {
    super(props);
    this.currentState = this.props.state;
    this.userData = this.currentState.login.userData;
    console.log(this.props, "New Props");
    this.state = {
      currentSystem: "",
      showmodal: false,
      uploadedFileName: "",
      mappedData: [],
      processdefn: [],
      showUpload: false,
      buttonDisabled: false,
      csvheaders: [],
      processPending: false,
      pendingProcess: "",
      system: localStorage.getItem("system"),
      processTablepagination: [],
      processFormData: {},
      processTableHeader: [
        {
          sort: true,
          dataField: "short_text",
          text: "Process Defn.",
          formatter: (rowContent, row) => {
            return (
              <p className={row.mandatory ? "text-danger" : "text-gray"}>
                {" "}
                {rowContent}{" "}
              </p>
            );
          },
        },
        {
          sort: true,
          dataField: "csvheader",
          text: "CSV Header",
          formatter: (rowContent, row) => {
            return (
              <select
                className="form-control"
                id={row.process}
                onChange={this.handleProcessTableChange}
                model={this.state.processFormData[row.process]}
              >
                <option selected value=" ">
                  {" "}
                </option>
                {this.state.csvheaders.map((opt) => (
                  <option
                    selected={
                      this.state.processFormData[row.process] === opt.process
                        ? this.state.processFormData[row.process]
                        : ""
                    }
                    key={opt.process}
                    value={opt.process}
                    defaultValue={
                      this.state.csvheaders.length === 1 ? true : false
                    }
                  >
                    {" "}
                    {opt.short_text}{" "}
                  </option>
                ))}{" "}
              </select>
            );
          },
        },
        {
          sort: true,
          dataField: "key",
          text: "Delete",
          formatter: (rowContent, row) => {
            return row.mandatory ? null : (
              <DeleteForeverIcon
                className="text-center"
                onClick={() => this.deleteProcess(row)}
                style={{ color: "red" }}
              />
            );
          },
        },
      ],
      mandIds: [],
      templateCsv: null,
      mandData: [],
      formData: {
        branch: this.userData.organization,
        process: null,
        company: this.userData.organization,
        module: localStorage.getItem("module"),
        file: null,
        filename: "",
        fileSize: "0.0 B",
        exactFile: null,
      },
      alert: null,
      listLeaseOptions: [],
      listModuleOptions: [],
      listCompanyOptions: [{ name: localStorage.getItem("organization") }],
      listBranchOptions: [{ name: localStorage.getItem("organization") }],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleProcessTableChange = this.handleProcessTableChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.checkHeaders = this.checkHeaders.bind(this);
  }

  componentWillMount = () => {
    getRequest(
      "api/fixedasset/checkPendingForUpload?tenant_id=" +
        "AB00001"
    ).then((response) => {
      console.log(response);
      var process = response.res.data;
      var proName = "";
      var f = 0;
      process.forEach((pro, index) => {
        if (pro.count > 0) {
          f++;
          console.log(proName);
          proName += index === 0 && proName === "" ? "" : " , " + pro.process;
          console.log(proName);
        }
      });
      if (f > 0) {
        this.setState({
          ...this.state,
          processPending: true,
          pendingProcess: proName,
        });
      } else {
        axios.get(ApiConstantsExternalsServerUrl +
          "api/module/modules?tenantId=" + "AB00001"
        ).then((response) => {
          if (response.res.status === "success") {
            this.setState({
              ...this.state,
              listModuleOptions: response.res.data,
            });
          }
        });
      }
    });
  };

  componentDidMount = () => {
    if (this.state.formData.module !== "") {
      this.getProcessSB();
    }

    if (
      this.state.formData.module !== "" &&
      this.state.formData.process !== ""
    ) {
      this.getProcessDefn();
    }
  };

  deleteProcess = (row) => {
    this.setState((prevState) => {
      var i = prevState.processdefn.findIndex((x) => x.key === row.key);
      prevState.processdefn.splice(i, 1);
      delete prevState.processFormData[row.process];
      return {
        processdefn: prevState.processdefn,
        processFormData: prevState.processFormData,
      };
    });
  };

  navPage = (url) => {
    this.props.navUrl(url);
  };

  // [FinancialInstruments,]
  // "Financial_Instruments".split("_").join(" ")

  getProcessSB = () => {
    var module = this.state.formData.module;

    postRequest("api/module/moduleProcess", {
      tenantId: "AB00001",
      moduleName: this.state.formData.module,
    })
      .then((response) => {
        if (response.res.status === "success") {
          console.log(response.res.data);
          this.setState(
            {
              ...this.state,
              listLeaseOptions: response.res.data,
              formData: {
                ...this.state.formData,
                process:
                  response.res.data.length === 1
                    ? response.res.data[0].process
                    : "",
              },
            },
            () => {
              if (response.res.data.length === 1) {
                this.getProcessDefn();
              }
            }
          );
        } else {
          this.setState({
            alert: (
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeInUp"
                isVisible={true}
              >
                {" "}
                <div className="alert alert-danger">
                  <strong> Problem With Connecting Server</strong>
                </div>{" "}
              </Animated>
            ),
          });
          setTimeout(() => {
            this.setState({ alert: null });
          }, 3000);
        }
      })
      .catch((err) => {
        this.setState({
          alert: (
            <Animated
              animationIn="fadeInDown"
              animationOut="fadeInUp"
              isVisible={true}
            >
              {" "}
              <div className="alert alert-danger">
                <strong> Problem With Connecting Server</strong>
              </div>{" "}
            </Animated>
          ),
        });
        setTimeout(() => {
          this.setState({ alert: null });
        }, 3000);
      });
  };

  getTemplate = () => {
    axios
      .post(ApiConstantsExternalsServerUrl + "api/lease/processTemplates", {
        processName: this.state.formData.process,
      })
      .then((response) => {
        if (response.data.status === "success") {
          this.setState({
            ...this.state,
            templateCsv: response.data.data[0],
          });
        }
      });
  };

  getProcessDefn = () => {
    if (this.state.formData.process !== null) {
      this.getTemplate();
      axios
        .post(ApiConstantsExternalsServerUrl + "api/lease/processdefn", {
          processName: this.state.formData.process,
          tenantId: "AB00001",
        })
        .then((response) => {
          let formData = {};
          let result = response.data.data.map((process) => {
            formData = {
              ...formData,
              [process.process]: "",
            };
          });
          this.setState({
            ...this.state,
            processdefn: response.data.data,
            showUpload: true,
            processFormData: formData,
            processTablepagination: {
              custom: true,
              sizePerPage: response.data.data.length,
            },
          });
        });
    }
  };

  handleChange = (event) => {
    var id = [event.target.id];
    let size = "0.0 B";
    let name = "";
    let exactFile = null;

    if (id[0] !== "file") {
      this.setState(
        {
          showUpload: false,
          csvheaders: [],
        },
        () => {
          this.deleteFile();
        }
      );
    }

    if (id[0] === "file") {
      size = event.target.files[0].size;
      name = event.target.files[0].name;
      exactFile = event.target.files[0];
    }

    this.setState(
      {
        formData: {
          ...this.state.formData,
          [id]: event.target.value,
        },
      },
      () => {
        if (id[0] === "file") {
          let file_size = "0.00 B";
          if (size < 1024) file_size = size + " B";
          else if (size < 1048576) file_size = (size / 1024).toFixed(1) + " KB";
          else if (size < 1073741824)
            file_size = (size / 1048576).toFixed(1) + " MB";
          else file_size = (size / 1073741824).toFixed(3) + " GB";
          this.setState(
            {
              formData: {
                ...this.state.formData,
                fileSize: file_size,
                filename: name,
                exactFile: exactFile,
              },
            },
            () => this.uploadFile()
          );
        } else if (id[0] === "process") {
          this.getProcessDefn();
        } else if (id[0] === "module") {
          this.state.listModuleOptions.forEach(
            function (module) {
              if (module.name === this.state.formData.module) {
                this.setState(
                  {
                    ...this.state,
                    system: module.system,
                    formData: {
                      ...this.state.formData,
                      process: null,
                    },
                  },
                  () => {
                    this.getProcessDefn();
                  }
                );
              }
            }.bind(this)
          );
          this.getProcessSB();
        }
      }
    );
  };

  handleProcessTableChange = (event) => {
    var id = [event.target.id];
    var value = event.target.value;
    this.setState(
      {
        processFormData: {
          ...this.state.processFormData,
          [id]: event.target.value,
        },
      },
      () => {
        console.log(this.state);
        if (value !== " ") {
          this.checkHeaders(id, value);
        }
      }
    );
  };

  checkHeaders = (id, value) => {
    Object.entries(this.state.processFormData).map(
      function (data) {
        if (data[0] !== id[0]) {
          if (data[1] === value) {
            document.getElementById(id[0]).selectedIndex = 0;
            this.setState({
              ...this.state,
              processFormData: {
                ...this.state.processFormData,
                [id[0]]: " ",
              },
              alert: (
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeInUp"
                  isVisible={true}
                >
                  {" "}
                  <div className="alert alert-danger">
                    <strong>Can't set multiple headers</strong>
                  </div>{" "}
                </Animated>
              ),
            });
            setTimeout(() => {
              this.setState({ alert: null });
            }, 3000);
          }
        }
      }.bind(this)
    );
  };

  openFileInput = () => {
    document.getElementById("file").click();
  };

  uploadFile = (checkDuplicate = true) => {
    let fileObject = this.state.formData.exactFile;

    var formData = new FormData();
    formData.append("tenantId", "AB00001");
    formData.append("checkDuplicate", checkDuplicate);
    formData.append("system", this.state.system);
    formData.append("file", this.state.formData.exactFile);

    this.setState({
      ...this.state,
      showmodal: false,
    });

    if (fileObject) {
      let state = store.getState();
      axios
        .post(ApiConstantsExternalsServerUrl + "api/lease/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + state.login.auth,
          },
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.setState({
              alert: (
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeInUp"
                  isVisible={true}
                >
                  {" "}
                  <div className="alert alert-success">
                    <strong>{response.data.message}</strong>
                  </div>{" "}
                </Animated>
              ),
              uploadedFileName: response.data.data.filename,
            });
            setTimeout(() => {
              this.setState({ alert: null });
            }, 3000);

            axios
              .post(ApiConstantsExternalsServerUrl + "api/lease/checkHeaders", {
                tenantId: "AB00001",
                processName: this.state.formData.process,
                fileNames: response.data.data.filename,
              })
              .then((result) => {
                if (result.data.status === "success") {
                  var formData = this.state.processFormData;

                  var tifOptions = Object.keys(formData).map(function (key) {
                    Object.entries(result.data.data.headers).map(function (
                      value,
                      index
                    ) {
                      if (key === value[1].process) {
                        formData[key] = value[1].process;
                      }
                    });
                  });

                  var processdefn = this.state.processdefn;

                  var man = processdefn.filter((obj) => {
                    return obj.mandatory === 1;
                  });

                  var non_man = processdefn.filter((obj) => {
                    return obj.mandatory !== 1;
                  });

                  var i = 0;
                  var entry1;
                  while (i < non_man.length) {
                    entry1 = non_man[i];
                    if (
                      result.data.data.headers.some(function (entry2) {
                        return entry1.process === entry2.process;
                      })
                    ) {
                      ++i;
                    } else {
                      non_man.splice(i, 1);
                    }
                  }
                  processdefn = [...man, ...non_man];
                  console.log(processdefn);

                  this.setState(
                    {
                      ...this.state,
                      csvheaders: result.data.data.headers,
                      processFormData: formData,
                      processdefn: processdefn,
                    },
                    () => {
                      console.log(
                        this.state.processFormData,
                        this.state.processdefn
                      );
                    }
                  );
                } else {
                  this.setState({
                    alert: (
                      <Animated
                        animationIn="fadeInDown"
                        animationOut="fadeInUp"
                        isVisible={true}
                      >
                        {" "}
                        <div className="alert alert-danger">
                          <strong>{response.data.message}</strong>
                        </div>{" "}
                      </Animated>
                    ),
                  });
                  setTimeout(() => {
                    this.setState({ alert: null });
                  }, 3000);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }
              });
          } else {
            if (response.data.message === "File Already Found") {
              this.setState({
                ...this.setState,
                showmodal: true,
              });
            } else {
              this.setState({
                alert: (
                  <Animated
                    animationIn="fadeInDown"
                    animationOut="fadeInUp"
                    isVisible={true}
                  >
                    {" "}
                    <div className="alert alert-danger">
                      <strong>{response.data.message}</strong>
                    </div>{" "}
                  </Animated>
                ),
              });
              setTimeout(() => {
                this.setState({ alert: null });
              }, 3000);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          }
        });
    }
  };

  deleteFile = () => {
    this.setState({
      formData: {
        ...this.state.formData,
        file: null,
        filename: null,
        fileSize: "0.0 B",
        exactFile: null,
      },
    });
  };

  saveMappedCsv = () => {
    this.setState({
      ...this.state,
      buttonDisabled: true,
    });
    var processdefn = this.state.processdefn;
    var processFormData = this.state.processFormData;
    var valid = true;
    Object.entries(processdefn).map(function (pd) {
      if (Number(pd[1].mandatory) === 1) {
        Object.entries(processFormData).map(function (data) {
          console.log(data);
          if (pd[1].process === data[0]) {
            console.log(data[1], Number(pd[1].mandatory));
            if (data[1] === "" && Number(pd[1].mandatory) === 1) {
              valid = false;
            } else {
              valid = true;
            }
          }
        });
      }
    });
    if (valid === true) {
      var mappedData = this.state.processFormData;
      var data = [];
      var i = 0;
      Object.entries(mappedData).map(function (value, index) {
        var d = [index, value];
        data.push(d);
        i++;
      });
      data.forEach(function (dt) {
        dt.shift();
      });
      console.log(data);

      var desc = {
        [this.state.formData.process]: [this.state.formData.filename],
      };
      let allProcesses = Object.keys(desc);

      postRequest("api/lease/mappedcsv", {
        config: data,
        created_at: moment
          .utc(new Date())
          .local()
          .format("YYYY-MM-DDTHH:mm:ss"),
        tenantId: "AB00001",
        org: this.userData.organization,
        uploadedFileName: this.state.uploadedFileName,
        originalFileName: this.state.formData.filename,
        user: this.userData.name,
        process: allProcesses,
        processName: this.state.formData.process,
        system: this.state.system,
        fileName: this.state.uploadedFileName,
      }).then((response) => {
        if (response.res.status === "success") {
          this.setState({
            alert: (
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeInUp"
                isVisible={true}
              >
                {" "}
                <div className="alert alert-success">
                  <strong>{response.res.message}</strong>
                </div>{" "}
              </Animated>
            ),
          });
          setTimeout(() => {
            this.props.navUrl("/transactions");
          }, 3000);
        } else {
          this.setState({
            alert: (
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeInUp"
                isVisible={true}
              >
                {" "}
                <div className="alert alert-danger">
                  <strong>{response.res.message}</strong>
                </div>{" "}
              </Animated>
            ),
          });
          setTimeout(() => {
            this.setState({ alert: null });
          }, 3000);
        }
      });
    } else {
      this.setState({
        alert: (
          <Animated
            animationIn="fadeInDown"
            animationOut="fadeInUp"
            isVisible={true}
          >
            {" "}
            <div className="alert alert-danger">
              <strong> Mandatory Fields Cannot Be Empty!</strong>
            </div>{" "}
          </Animated>
        ),
      });
      setTimeout(() => {
        this.setState({ alert: null });
      }, 3000);
    }
  };

  downloadTemplate = () => {
    axios
      .post(
        ApiConstantsExternalsServerUrl + "api/lease/downloadTemplate",
        {
          filename: this.state.templateCsv,
          system: this.state.system,
          tenantId: "AB00001",
        },
        { responseType: "blob" }
      )
      .then((response) => {
        const blob = response.data;
        download(blob, this.state.templateCsv);
      });
  };

  reloadPage = () => {
    this.setState({
      ...this.state,
      showmodal: false,
    });
    window.location.reload();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3 text-center">
                <div className="form-group">
                  <select
                    className="form-control"
                    id="company"
                    disabled
                    onChange={this.handleChange}
                    model={this.state.formData.company}
                  >
                    <option disabled defaultValue>
                      Company
                    </option>
                    {this.state.listCompanyOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {" "}
                        {opt.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="form-group">
                  <select
                    className="form-control"
                    id="branch"
                    disabled={
                      this.state.listBranchOptions.length === 1 ? true : false
                    }
                    onChange={this.handleChange}
                    model={this.state.formData.branch}
                  >
                    <option disabled defaultValue>
                      Branch
                    </option>
                    {this.state.listBranchOptions.map((opt) => (
                      <option
                        key={opt.name}
                        value={opt.name}
                        defaultValue={
                          this.state.listBranchOptions.length === 1
                            ? true
                            : false
                        }
                      >
                        {" "}
                        {opt.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="form-group">
                  <select
                    className="form-control"
                    id="module"
                    onChange={this.handleChange}
                    value={this.state.formData.module}
                  >
                    <option disabled value="default1" selected="default1">
                      Module
                    </option>
                    {this.state.listModuleOptions.map((opt) => (
                      <option
                        key={opt.name}
                        value={opt.name}
                        selected={
                          this.state.listModuleOptions.length === 1
                            ? true
                            : false
                        }
                      >
                        {" "}
                        {opt.name.split("_").join(" ") +
                          " [ " +
                          opt.desc +
                          "] "}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="form-group">
                  <select
                    className="form-control"
                    id="process"
                    model={this.state.formData.process}
                    onChange={this.handleChange}
                  >
                    <option disabled selected>
                      Process
                    </option>
                    {this.state.listLeaseOptions.map((opt) => (
                      <option
                        key={opt.process}
                        value={opt.process}
                        selected={
                          this.state.listLeaseOptions.length === 1
                            ? true
                            : false
                        }
                      >
                        {" "}
                        {opt.short_text}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <Card>
              <h6>
                <Card.Header className="card-header text-center">
                  {" "}
                  Templates{" "}
                </Card.Header>
              </h6>
              <Card.Body className="card-body">
                {this.state.formData.process ? (
                  <div>
                    <h6>
                      <Card.Text className="text-center">
                        {this.state.templateCsv ? (
                          <>
                            {this.state.templateCsv}
                            <GetAppIcon
                              style={{ cursor: "pointer" }}
                              onClick={this.downloadTemplate}
                            />
                          </>
                        ) : (
                          <h5> Template Not Found For Process </h5>
                        )}
                      </Card.Text>
                    </h6>
                  </div>
                ) : (
                  <div>
                    <h6 className="text-center">
                      <Card.Title>Select a Process above</Card.Title>
                    </h6>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
        <br />
        {this.state.formData.process &&
        this.state.formData.branch &&
        this.state.formData.module &&
        this.state.formData.company &&
        this.state.showUpload ? (
          <div>
            <div className="row">
              <div className="col-md-9">
                <h6 className="feild-header"> Upload Files </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-3">
                <Card className="uploader">
                  <Card.Header className="card-header">
                    <div className="row" style={{ marginLeft: "0px" }}>
                      <div className="col-md-10">
                        <div className="row">
                          <b className="text-white"> {this.state.system}</b>
                        </div>
                        <div className="row">
                          <b className="text-white">
                            {" "}
                            {this.state.formData.fileSize}{" "}
                          </b>
                        </div>
                      </div>
                      <div className="col-md-2 text-center">
                        <input
                          type="file"
                          id="file"
                          onChange={this.handleChange}
                          accept=".csv"
                        />
                        <AddCircleIcon
                          style={{
                            fontSize: "2rem",
                            cursor: "pointer",
                            marginLeft: "-10px",
                          }}
                          onClick={this.openFileInput}
                        />
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body className="card-body">
                    {this.state.formData.filename ? (
                      <div>
                        <div className="row">
                          <div className="col-md-9">
                            <p
                              className="text-center text-gray"
                              style={{ fontSize: "12px !important" }}
                            >
                              {" "}
                              {this.state.formData.filename}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p
                              className="text-center text-gray"
                              style={{ fontSize: "12px !important" }}
                            >
                              <DeleteOutlineIcon
                                style={{ cursor: "pointer" }}
                                onClick={this.deleteFile}
                              />
                            </p>
                          </div>
                        </div>
                        <Card.Text className="text-center">
                          {this.state.formData.fileSize}
                        </Card.Text>
                      </div>
                    ) : null}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br />
            <br />

            {this.state.csvheaders.length > 0 ? (
              <div>
                <div className="row">
                  <div className="col-md-9">
                    <h6 className="feild-header"> Map Fields </h6>
                  </div>
                </div>

                <div className="row scroll-table">
                  <div className="col-md-12">
                    <BootstrapTable
                      key="table1"
                      keyField="id"
                      data={this.state.processdefn}
                      columns={this.state.processTableHeader}
                      pagination={paginationFactory(
                        this.state.processTablepagination
                      )}
                    />
                  </div>
                </div>
                <br />
                <br />

                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 text-center">
                    <button
                      className="btn btn-teal"
                      disabled={this.state.buttonDisabled}
                      onClick={this.saveMappedCsv}
                    >
                      {" "}
                      Save{" "}
                    </button>
                  </div>
                  <div className="col-md-3"></div>
                </div>
                <br />
                <br />
              </div>
            ) : null}
          </div>
        ) : null}
        {this.state.alert}
        {this.state.showmodal ? (
          <Modal show={this.state.showmodal} onHide={this.reloadPage}>
            <Modal.Header closeButton>
              <Modal.Title>File Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              File already found. Do you want to Replace?{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.reloadPage}>
                No
              </Button>
              <Button variant="primary" onClick={() => this.uploadFile(false)}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
        {this.state.processPending ? (
          <Modal
            show={this.state.processPending}
            onHide={() => this.navPage("/sch_generator")}
          >
            <Modal.Header closeButton>
              <Modal.Title>Process Pending</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              A Process already Running. Please wait for the process to
              Complete!{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.navPage("/sch_generator")}
              >
                Go To Generate IFRS FA Schedule
              </Button>
              <Button
                variant="primary"
                onClick={() => this.navPage("/fixed_asset_register")}
              >
                Go To Report
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps, { navUrl })(Upload);
// export default Upload;
