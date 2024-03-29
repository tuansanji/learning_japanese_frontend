import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          {
            name: "Trang chủ",
            link: "/",
          },
          {
            name: "Khóa học",
            link: "/courses ",
          },
          {
            name: "Khóa học của bạn",
            link: "/me/courses ",
          },
          {
            name: "Hướng dẫn",
            link: "/guide",
          },
          {
            name: "Blog",
            link: "/blogs",
          },
        ].map((text, index) => (
          <Link to={text.link} key={index} button className="">
            <ListItem>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText className="text-[2rem]" primary={text.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {[
          {
            name: "Trang cá nhân",
            link: "/user/infor",
          },
          {
            name: "Donate",
            link: "/donate",
          },
          {
            name: "Liên hệ",
            link: "mailto:hoangtuansanji@gmail.com",
          },
        ].map((text, index) => (
          <Link to={text.link} key={index} button>
            <ListItem>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div className=" tablet:hidden ">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="h-[4rem] w-[4rem]"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon style={{ fontSize: 40 }} />
          </Button>
          <SwipeableDrawer
            className="!z-[9999] "
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
