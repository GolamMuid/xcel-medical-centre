import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Skeleton from "react-loading-skeleton";

function About() {
  const { isLoading: aboutUsLoading, data: aboutUs = [] } = useQuery({
    queryKey: ["aboutUs"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/information/get-active-information`
      );
      // const res = await axios.get(`/api/set-about`);
      const data = await res.data.data;
      return data;
    },
  });

  console.log(aboutUs);

  return (
    <div className="w-auto lg:w-[780px]">
      <div className="relative mb-16 md:mb-0">
        {aboutUsLoading ? (
          <div>
            <Skeleton count={5} />
          </div>
        ) : (
          <div>
            {aboutUs?.map((post) => {
              return (
                <div
                  className="bg-white mb-4 mr-[46px] md:mr-0 last:mb-0"
                  key={post.id}
                >
                  <p className="text-4xl font-bold mb-2"> {post?.title} </p>
                  <p className="text-lg text-justify">{post?.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
