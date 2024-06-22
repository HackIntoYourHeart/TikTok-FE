import React, { useEffect, useRef } from 'react';

const Video = ({url, isPlaying, onPlay}) => {
    const videoRef = useRef(null);
    useEffect(() => {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }, [isPlaying]);
    
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [url]);

  return (
    <video ref={videoRef} onPlay={onPlay} controls>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
