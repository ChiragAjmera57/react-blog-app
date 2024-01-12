import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleblog, formatDate } from "../utils/util";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import SwipeableTemporaryDrawer from "../component/Drawer";
import { Alert, Snackbar } from "@mui/material";

export const Details = ({ post }) => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [audioError, setAudioError] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleSvgClick = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };
  useEffect(() => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let audioBufferSourceNode = null;

    const playAudio = async () => {
      try {
        const response = await fetch(data?.audio_file);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        audioBufferSourceNode = audioContext.createBufferSource();
        audioBufferSourceNode.buffer = audioBuffer;

        audioBufferSourceNode.connect(audioContext.destination);

        audioBufferSourceNode.start();
        setAudioError(false);
      } catch (error) {
        setAudioError(true);
        console.error("Error loading audio:", error);
      }
    };

    if (isAudioPlaying) {
      playAudio();
    } else {
      if (audioBufferSourceNode) {
        audioBufferSourceNode.stop();
      }
    }

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isAudioPlaying, data?.audio_file]);
  useEffect(() => {
    fetchSingleblog(slug).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [slug]);
  // console.log(data)
  return (
    <div className="w-50 m-auto">
      <div className="">
        <img
          width="700"
          height="438"
          src={data ? data.feature_img : ""}
          alt=""
        />
      </div>
      <p className="fs-2 fw-bold mt-3 w-75 custom-roboto">
        {data ? data.title : ""}
      </p>
      <div className="d-flex  mt-4">
        <img
          width="35"
          height="35"
          className="rounded-5 mt-2"
          alt=""
          src="https://miro.medium.com/v2/resize:fill:30:30/1*QADoVQ9X8JvC9DL_2W_LIw.jpeg"
        />
        <div className="d-flex flex-column mx-3 gap-0 h-25">
          <p className="custom-Geologica fs-6">
            {data?.auther ? data.auther.first_name : "Geologica"} <br />
            Publised in {data ? formatDate(data.published_date) : ""}
          </p>
        </div>
      </div>
      <div>
        <hr className="hr hr-blurry" />
        <div className="d-flex justify-content-between w-75 m-auto">
          <SwipeableTemporaryDrawer />
          {isAudioPlaying ? (
            <svg
              width="24"
              height="24"  
              viewBox="0 0 24 24"
              fill="none"
              onClick={handleSvgClick}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 2v20h-4V2h4zM4 2h4v20H4V2z"
                fill="currentColor"
              ></path>
              <title>Pause</title>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={handleSvgClick}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0zm9-10a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.38 10.42l-4.6 3.06a.5.5 0 0 1-.78-.41V8.93c0-.4.45-.63.78-.41l4.6 3.06c.3.2.3.64 0 .84z"
                fill="currentColor"
              ></path>
              <title>Listen</title>
            </svg>
          )}
          <svg
            title="chirag"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.22 4.93a.42.42 0 0 1-.12.13h.01a.45.45 0 0 1-.29.08.52.52 0 0 1-.3-.13L12.5 3v7.07a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V3.02l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.8a.42.42 0 0 1 .07.5zm-.1.14zm.88 2h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.14c.1.1.15.22.15.35a.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9V8.96c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <hr />
      </div>
      {data && (
        <p
          className="custom-pt fs-3 lh-3 fw-medium mb-5 "
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></p>
      )}
      <Snackbar
        open={audioError}
        autoHideDuration={4000}
        onClose={() => setAudioError(false)}
      >
        <Alert
          onClose={() => setAudioError(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Post Created
        </Alert>
      </Snackbar>
    </div>
  );
};
