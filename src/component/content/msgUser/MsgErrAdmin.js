import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastErr, toastSuccess } from "../../../redux/slice/toastSlice";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { v4 as uuid } from "uuid";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(30),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(30),
    color: theme.palette.text.secondary,
  },
  time: {
    fontSize: theme.typography.pxToRem(30),
    color: "red",
    position: "absolute",
    right: "10rem",
  },
  delete: {
    fontSize: theme.typography.pxToRem(30),
    color: "red",
    position: "absolute",
    right: "30rem",
  },
  des: {
    fontSize: theme.typography.pxToRem(35),
    color: "blue",
    display: "flex",
    flexDirection: "column",
  },
}));
function MsgErrAdmin() {
  const [listErr, setListErr] = useState([]);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/courses/errMsg`, {
        headers: { token: `Bearer ${user.accessToken}` },
      })
      .then((res) => setListErr(res.data))
      .catch((err) => dispatch(toastErr(err.response.data)));
  }, [user, success]);

  const handleChange = (panel) => (event, isExpanded) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.nodeName !== "INPUT" &&
      event.target.nodeName !== "LABEL"
    ) {
      setExpanded(isExpanded ? panel : false);
    }
  };

  const handleChangeCheckbox = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/courses/statusErrMsg`,
        {
          id: e.target.name,
          checked: e.target.checked,
        },
        {
          headers: { token: `Bearer ${user.accessToken}` },
        }
      )
      .then((res) => {
        dispatch(toastSuccess(res.data));
        setSuccess(!success);
      })
      .catch((err) => {
        dispatch(err.response.data);
      });
  };

  return (
    <div className="fixed top-[6rem] right-[20rem] bottom-0 left-0 bg-white  z-[7777] text-[3rem] overflow-y-auto ">
      <h1>
        Hoàn thành:{" "}
        <strong className="text-[red]">
          {listErr.filter((item) => item.status).length}
        </strong>{" "}
        /{listErr.length}{" "}
      </h1>
      <div className={classes.root}>
        {listErr.length > 0 &&
          listErr
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item, index) => (
              <Accordion
                key={item._id}
                expanded={expanded === `panel-${index}`}
                onChange={handleChange(`panel-${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>
                    <span className="text-[red] font-bold">{index + 1} :</span>{" "}
                    {item.lesson.name}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {item.listErr.length > 0 ? (
                      item.listErr?.map((item, index) => (
                        <span className="mr-3" key={uuid()}>
                          {item}
                        </span>
                      ))
                    ) : (
                      <span>lỗi khác</span>
                    )}
                  </Typography>
                  <Typography className={classes.delete}>
                    <label className="cursor-pointer text-[green] flex gap-1">
                      <input
                        type="checkbox"
                        checked={item.status}
                        name={item._id}
                        onChange={handleChangeCheckbox}
                      />
                      Completed
                    </label>
                  </Typography>

                  <Typography className={classes.time}>
                    <span>
                      {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.des}>
                    <strong className="text-[red]">
                      id: {item.lesson._id}
                    </strong>
                    <strong className="text-[red]">
                      Lesson: {item.lesson.lesson} - {item.lesson.stage} -
                      {item.lesson.way} - {item.lesson.level}
                    </strong>
                    <strong>Message: {item.des}</strong>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
      </div>
    </div>
  );
}

export default MsgErrAdmin;
