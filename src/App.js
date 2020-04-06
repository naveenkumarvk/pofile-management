import React from "react";
import "./App.css";
import JobPicker from "./components/jobPicker";
import JobTable from "./components/JobTable";
import axios from "axios";

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectedUserObject: {},
      selectedJobId: "",
      selectedHours: 0,
      selectedMinutes: 0,
      jobs: [
        {
          id: 1,
          name: "job1",
          color: "violet",
          selectedHours: "",
          selectedMinutes: ""
        },
        {
          id: 2,
          name: "job2",
          color: "green",
          selectedHours: "",
          selectedMinutes: ""
        },
        {
          id: 3,
          name: "job3",
          color: "blue",
          selectedHours: "",
          selectedMinutes: ""
        },
        {
          id: 4,
          name: "job4",
          color: "yellow",
          selectedHours: "",
          selectedMinutes: ""
        },
        {
          id: 5,
          name: "job5",
          color: "orange",
          selectedHours: "",
          selectedMinutes: ""
        }
      ],
      removedUnselected: [],
      enableJobSelector: false
    };
  }

  componentDidMount() {
    this.loadIntial();
  }

  loadIntial = (id = 1) => {
    //initla id 1
    axios.get("http://localhost:3000/personByJob").then(response => {
      this.setState({
        users: response.data,
        selectedJobId: "",
        selectedHours: 0,
        selectedMinutes: 0
      });
      this.selectedUsers(id);
    });
  };

  selectedUsers = userId => {
    console.log("userId", userId);
    axios.get(`http://localhost:3000/personByJob/${userId}`).then(response => {
      console.log(response.data.name);
      this.setState(
        {
          jobs: response.data.jobs,
          selectedUserObject: response.data
        },
        () => {
          this.loadInitalSlot();
        }
      );
    });
  };

  loadInitalSlot = () => {
    const { newJobs, removedUnselected } = this.applySlot();

    this.setState({
      jobs: newJobs,
      removedUnselected
    });
  };

  applySlot = () => {
    const { jobs } = this.state;

    let newJobs = JSON.parse(JSON.stringify(jobs));

    newJobs.sort(function(a, b) {
      let aDate = new Date(
        2020,
        4,
        4,
        a.selectedHours,
        a.selectedMinutes,
        0,
        0
      );
      let bDate = new Date(
        2020,
        4,
        4,
        b.selectedHours,
        b.selectedMinutes,
        0,
        0
      );
      return aDate - bDate;
    });

    let removedUnselected = [];

    newJobs.forEach((element, i) => {
      if (element.selectedHours !== "" && element.selectedMinutes !== "") {
        if (newJobs.length - 1 !== i) {
          element.selectedEndHours = newJobs[i + 1].selectedHours;
          element.selectedEndMinutes = newJobs[i + 1].selectedMinutes;
          element.fromDate = new Date(
            2010,
            4,
            4,
            element.selectedHours,
            element.selectedEndMinutes,
            0,
            0
          );
          element.toDate = new Date(
            2010,
            4,
            4,
            newJobs[i + 1].selectedHours,
            newJobs[i + 1].selectedMinutes,
            0,
            0
          );
          removedUnselected.push(element);
        } else {
          element.selectedEndHours = 23;
          element.selectedEndMinutes = 59;
          element.fromDate = new Date(
            2010,
            4,
            4,
            element.selectedHours,
            element.selectedMinutes,
            0,
            0
          );
          element.toDate = new Date(2010, 4, 4, 23, 59, 0, 0);
          removedUnselected.push(element);
        }
      }
    });

    console.log("removedUnselected===>", removedUnselected);

    return { newJobs, removedUnselected };
  };

  allocate = () => {
    const {
      selectedMinutes,
      selectedHours,
      selectedJobId,
      jobs,
      selectedUserObject
    } = this.state;

    if (
      selectedJobId === "" ||
      selectedHours === "" ||
      selectedMinutes === ""
    ) {
      alert("please selected job and hours");
      return;
    }

    console.log("---", jobs);

    let exists = jobs.findIndex(
      data =>
        data.selectedHours == selectedHours &&
        data.selectedMinutes == selectedMinutes
    );

    if (exists != -1) {
      jobs[exists] = {
        id: jobs[exists].id,
        name: jobs[exists].name,
        color: jobs[exists].color,
        selectedMinutes: "",
        selectedHours: ""
      };
    }

    let newJobs = JSON.parse(JSON.stringify(jobs));

    let selectedJob = jobs.findIndex(data => data.id === selectedJobId);
    newJobs[selectedJob].selectedMinutes = parseInt(selectedMinutes);
    newJobs[selectedJob].selectedHours = parseInt(selectedHours);

    newJobs.sort(function(a, b) {
      let aDate = new Date(
        2020,
        4,
        4,
        a.selectedHours,
        a.selectedMinutes,
        0,
        0
      );
      let bDate = new Date(
        2020,
        4,
        4,
        b.selectedHours,
        b.selectedMinutes,
        0,
        0
      );
      return aDate - bDate;
    });

    let removedUnselected = [];

    newJobs.forEach((element, i) => {
      if (element.selectedHours !== "" && element.selectedMinutes !== "") {
        if (newJobs.length - 1 !== i) {
          element.selectedEndHours = newJobs[i + 1].selectedHours;
          element.selectedEndMinutes = newJobs[i + 1].selectedMinutes;
          element.fromDate = new Date(
            2010,
            4,
            4,
            element.selectedHours,
            element.selectedEndMinutes,
            0,
            0
          );
          element.toDate = new Date(
            2010,
            4,
            4,
            newJobs[i + 1].selectedHours,
            newJobs[i + 1].selectedMinutes,
            0,
            0
          );
          removedUnselected.push(element);
        } else {
          element.selectedEndHours = 23;
          element.selectedEndMinutes = 59;
          element.fromDate = new Date(
            2010,
            4,
            4,
            element.selectedHours,
            element.selectedMinutes,
            0,
            0
          );
          element.toDate = new Date(2010, 4, 4, 23, 59, 0, 0);
          removedUnselected.push(element);
        }
      }
    });

    console.log("removedUnselected", removedUnselected);
    this.setState(
      {
        jobs: newJobs,
        removedUnselected
      },
      () => {
        let updateObject = { ...selectedUserObject };
        updateObject.jobs = newJobs;
        updateObject.noJobs = removedUnselected.length;
        console.log(updateObject);
        axios
          .put(
            `http://localhost:3000/personByJob/${selectedUserObject.id}`,
            updateObject
          )
          .then(response => {});
      }
    );
  };

  renderBackGroundColor = slot => {
    const { removedUnselected } = this.state;

    const slotTime = new Date(2010, 4, 4, slot, 0, 0, 0);

    let getSelected = removedUnselected.find(
      data => slotTime >= data.fromDate && slotTime < data.toDate
    );

    if (getSelected !== undefined) {
      return getSelected.color;
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = (e, value) => {
    this.setState({
      selectedJobId: value
    });
  };

  render() {
    const {
      selectedJobId,
      users,
      selectedUserObject,
      enableJobSelector
    } = this.state;

    return (
      <div className="App">
        <div style={{ backgroundColor: "grey", fontWeight: "bolder" }}>
          {selectedUserObject.name}
        </div>
        <div className="flex-row">
          <div
            class="flex-container-1"
            onClick={() => {
              this.setState({ enableJobSelector: !enableJobSelector });
            }}
          >
            Choose Job
          </div>
          <JobPicker renderBackGroundColor={this.renderBackGroundColor} />
        </div>
        {enableJobSelector && (
          <div className="choose-job">
            <div className="job-title">Select Job</div>
            <div className="column-direction fitty-percent">
              <div
                style={{ backgroundColor: "violet" }}
                name="selectedJobId"
                className={`pointer jobs ${
                  selectedJobId === 1 ? "job-number" : ""
                }`}
                onClick={e => {
                  this.handleClick(e, 1);
                }}
              >
                Job 1<div></div>
              </div>
              <div
                name="selectedJobId"
                className={`pointer jobs ${
                  selectedJobId === 2 ? "job-number" : ""
                }`}
                style={{ backgroundColor: "green" }}
                onClick={e => {
                  this.handleClick(e, 2);
                }}
              >
                Job 2
              </div>
              <div
                name="selectedJobId"
                className={`pointer jobs ${
                  selectedJobId === 3 ? "job-number" : ""
                }`}
                onClick={e => {
                  this.handleClick(e, 3);
                }}
                style={{ backgroundColor: "blue" }}
              >
                Job 3
              </div>
              <div
                name="selectedJobId"
                className={`pointer jobs ${
                  selectedJobId === 4 ? "job-number" : ""
                }`}
                onClick={e => {
                  this.handleClick(e, 4);
                }}
                style={{ backgroundColor: "yellow" }}
              >
                Job 4
              </div>
              <div
                name="selectedJobId"
                className={`pointer jobs ${
                  selectedJobId === 5 ? "job-number" : ""
                }`}
                onClick={e => {
                  this.handleClick(e, 5);
                }}
                style={{ backgroundColor: "orange" }}
              >
                Job 5
              </div>
            </div>
            <div className="column-direction fitty-percent">
              <div className="jobs">Start Time</div>
              <div class="timer">
                <div className="row-direction">
                  <div>
                    {" "}
                    <input
                      min="0"
                      max="23"
                      defaultValue="1"
                      type="number"
                      name="selectedHours"
                      placeholder="hours"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    {" "}
                    {/* <input
            min="0"
            max="59"
            defaultValue="0"
            type="number"
            name="selectedMinutes"
            disabled ={true}
            onChange={this.handleChange}
          /> */}
                  </div>
                </div>
              </div>
              <div className="square-border pointer" onClick={this.allocate}>
                {" "}
                DONE
              </div>
            </div>
          </div>
        )}
        <JobTable users={users} loadIntial={this.loadIntial} />
      </div>
    );
  }
}

export default Main;
