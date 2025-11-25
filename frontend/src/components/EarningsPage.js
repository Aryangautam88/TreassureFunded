import React, { useEffect, useRef } from "react";
import "./EarningsPage.css";
import reVideo from "../Assets/re.mp4";

const EarningsPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; 
    }
  }, []);

  return (
    <div className="earnings-container">
      <div className="earnings-header">
        <div className="globe-container">

          <video
            ref={videoRef}
            className="globe-video"
            src={reVideo}
            autoPlay
            loop
            muted
            playsInline
          ></video>

          <div className="overlay-text">
            <h1>$100+ Million</h1>
            <p className="subtext">Earned by Traders Globally at Treasure Funded</p>
            <p className="description">Quick and reliable. Zero reward denials.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
