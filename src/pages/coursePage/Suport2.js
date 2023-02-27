import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Support from "./Support";
import { getStageCourse } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentStage,
  getCurrentStageList,
} from "../../redux/slice/courseSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div p={3}>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto({ stage, openMenu }) {
  const dispatch = useDispatch();
  const params = useParams();

  // const [stageCourse, setStageCourse] = useState([]);
  const [value, setValue] = useState(0);
  const [listCurrent, setListCurrent] = useState([]);

  const stageCourse = useSelector((state) => state.courses?.listStageCurrent);

  useEffect(() => {
    getStageCourse(dispatch, params.level, params.way, stage[value]).then(
      (list) => {
        dispatch(getCurrentStageList(list));
      }
    );
  }, [value, stage]);
  useEffect(() => {
    let arr = [];
    stageCourse && stageCourse.forEach((way) => way && arr.push(way.lesson));
    setListCurrent([...new Set(arr)]);
  }, [stageCourse]);
  const handleChange = (event, newValue) => {
    // dispatch(getCurrentStage(event.target.innerHTML));
    setValue(newValue);
  };

  return (
    <div
      className={` ${
        openMenu ? "right-0" : "right-[-26%]"
      } fixed z-[99] h-full   minhtuan md:w-[100%] tablet:w-[25%] `}
    >
      <AppBar position="static" color="default" className="text-5">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className=""
        >
          {stage.map((item, index) => {
            return (
              <Tab
                className="!text-[1.1rem] "
                key={item}
                label={item}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AppBar>
      {stage.map((item, index) => (
        <TabPanel
          key={item}
          value={value}
          index={index}
          className="h-full bg-[#ffff] overflow-auto"
        >
          <Support stageCourse={stageCourse} listCurrent={listCurrent} />
        </TabPanel>
      ))}
    </div>
  );
}
