import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { Comment } from "./Comment";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

export default function SwipeableTemporaryDrawer() {
  const [drawer, setdrawer] = useState(false);
  const { comments } = useAuth();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setdrawer((prev) => !prev);
  };
  useEffect(() => {}, [comments]);
  return (
    <div>
      <svg
        onClick={() => setdrawer(true)}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="wz"
      >
        <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path>
        <title className="p-2">Comment</title>
      </svg>
      <SwipeableDrawer
        anchor={"right"}
        open={drawer}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        <div className="" style={{ width: "450px" }}>
          <div className="d-flex align-items-center justify-content-between m-auto">
            <div className="p-3 fw-bolder fs-4 mx-3">Response</div>
            <div className="mx-4" onClick={() => setdrawer(false)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="bz ic"
              >
                <path
                  d="M5 5l7 7m7 7l-7-7m0 0l7-7m-7 7l-7 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
          </div>
          <div className="card p-3 m-auto shadow" style={{ width: "90%" }}>
            <div className="d-flex align-items-center">
              <img
                className="rounded-5"
                src="https://miro.medium.com/v2/resize:fill:40:40/0*eizS15M9MOWoKwUN"
                alt=""
              />
              <p className="mx-3 mt-2">Chirag Ajmera</p>
            </div>
            <textarea
              className="border-0 input-group p-3"
              style={{ resize: "none", outline: "none" }}
              placeholder="What are your throughts?"
              name=""
              id=""
              cols="5"
              rows="5"
            ></textarea>
            <div className="d-flex align-items-center justify-content-end">
              <p className="m-3">Cancel</p>
              <button className="btn bg-success border-0 btn-ouline-none text-white">
                Respond
              </button>
            </div>
          </div>
          {comments &&
            Object.keys(comments).map((key, index) => {
              const comment = comments[key];
              return <Comment  key={index} comment={comment} />;
            })}
        </div>
      </SwipeableDrawer>
    </div>
  );
}
