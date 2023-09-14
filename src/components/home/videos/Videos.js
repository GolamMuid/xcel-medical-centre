import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FadeLoader } from "react-spinners";
import ErrorText from "../../ui/ErrorText";
import Loader from "../../ui/Loader";

function Videos() {
  const [videoSrc, setVideoSrc] = useState();

  const {
    isLoading: videoLoading,
    isError,
    data: videos = [],
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/video/get-active-videos`
      );
      const data = await res.data.data;
      setVideoSrc(data[0].videoUrlLink);
      return data;
    },
  });
  const handleClick = (video) => {
    setVideoSrc(video.videoUrlLink);
  };

  if (isError) {
    return <ErrorText />;
  }

  return (
    <div>
      <p className="text-4xl font-bold mb-5">Videos </p>
      {videoLoading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "grid",
            gap: "40px",
          }}
          className="video-container"
        >
          <iframe
            src={videoSrc}
            className="min-h-[300px]"
            width="100%"
            height="100%"
            title="youtube-video"
            allowFullScreen
          />
          <div className="flex flex-wrap gap-2 justify-between">
            {videos?.map((video, index) => {
              return (
                <div className="max-w-[130px] lg:max-w-[180px]" key={index}>
                  <img
                    src={video.videoImage}
                    alt="thumbnail"
                    className="cursor-pointer"
                    onClick={() => handleClick(video)}
                  />
                  <p> {video.title} </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Videos;
