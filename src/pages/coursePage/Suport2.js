import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Support from "./Support";
import { getStageCourse } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: "100%",
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function ScrollableTabsButtonAuto({ stage }) {
  const dispatch = useDispatch();
  const params = useParams();

  const [stageCourse, setStageCourse] = useState([]);
  const [value, setValue] = React.useState(0);
  const [listCurrent, setListCurrent] = useState([]);

  useEffect(() => {
    getStageCourse(dispatch, params.level, params.way, stage[value]).then(
      (list) => {
        setStageCourse(list);
      }
    );
  }, [value, stage]);
  useEffect(() => {
    let arr = [];
    stageCourse.forEach((way) => way && arr.push(way.lesson));
    setListCurrent([...new Set(arr)]);
  }, [stageCourse]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={` w-[400px] fixed z-[99] h-full  right-0`}>
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
