import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import { ListItem,ListSubheader,List,ListItemText,ListItemIcon } from '@material-ui/core';
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";

const App = () => {
  
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
    async function getPilots() {
      try {
        const response = await axios.get(
          "https://api.hatchways.io/assessment/students"
        );
        // console.log(response.data.students);
        setPilots(response.data.students);
      } catch (error) {
        console.error(error);
      }
    }
    getPilots();
  }, []);

  return (
    <React.Fragment>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div className={classes.container}>
        <h1 className={classes.title}>Avians</h1>
          <Paper className={classes.paperStyles}>
            {pilots.map((student) => (
              <div key={student.id} className={classes.studentDetailsContainer}>
                <Accordion elevation={0} className={classes.accordianContainer}>
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid item xs={3}>
                      <img
                        src={student.pic}
                        className={classes.studentImage}
                        alt="Avatar"
                      ></img>
                    </Grid>
                    <Grid item xs={10} className={classes.studentDetails}>
                      <h2>
                        {student.firstName.toUpperCase()}{" "}
                        {student.lastName.toUpperCase()}
                      </h2>
                      <div>Email: {student.email}</div>
                      <div>Company: {student.company}</div>
                      <div>Skill: {student.skill}</div>
                      <div>
                        Average:{" "}
                        {student.grades.reduce((prev, curr) => +prev + +curr) /
                          student.grades.length}{" "}
                        %
                      </div>
                      <br></br>
                      {student.tag &&
                        student.tag.map((eachTag) => {
                          return (
                            <Chip
                              className={classes.chip}
                              key={Math.random()}
                              label={eachTag.tagValue}
                            />
                          );
                        })}
                      <br></br>
                      <br></br>

                    </Grid>
                  </AccordionSummary>
                  <Grid item xs={10} className={classes.studentGradesContainer}>
                    <AccordionDetails className={classes.studentGrades}>
                      {student.grades.map((value, i) => {
                        return (
                          <div key={Math.random()}>
                            Grade {i + 1} : {value}
                          </div>
                        );
                      })}
                    </AccordionDetails>
                  </Grid>
                </Accordion>
              </div>
            ))}
          </Paper>
          <Paper style={{position: 'fixed'}}>
   <List className={classes.list} component="nav" aria-label="main mailbox folders"
      subheader={<ListSubheader component="div" id="nested-list-subheader">Navigation</ListSubheader>}>
          <ListItem button>
             <ListItemIcon>
             </ListItemIcon>
             <ListItemText primary="Overview" />
             <h1 className={classes.title}>Avians</h1>

          </ListItem>
  </List></Paper>
      </div>
    </React.Fragment>
  );
};

export default App;
