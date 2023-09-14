import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import ErrorText from "../../ui/ErrorText";
import Loader from "../../ui/Loader";

export default function Photos() {
  const {
    isLoading,
    isError,
    data: photos = [],
  } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/gallery/get-active-gallery`
      );
      const data = await res.data.data;
      return data;
    },
  });

  const handleClick = (img) => {
    window.open(img, "_blank");
  };

  const swiperRef = useRef(null);

  if (isError) {
    return <ErrorText />;
  }

  return (
    <div className="select-none">
      <p className="text-4xl font-bold mb-5">Photos </p>
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          // slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          modules={[Navigation]}
          className="mySwiper"
          initialSlide={3} // Start from the middle slide (index 4)
          loop={true} // Enable looping
          // navigation={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              centeredSlides: true, // Center the slide
              slideClass: "mobile-slide", // 1 slide per view on mobile screens (less than 640px)
            },
            768: {
              slidesPerView: 2, // 3 slides per view on tablet screens (between 640px and 768px)
            },
            1024: {
              slidesPerView: 4, // 3 slides per view on laptop screens (between 768px and 1024px)
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {photos?.map((img, index) => {
            return (
              <SwiperSlide key={index}>
                <a
                  href={img.photoGallery}
                  className="flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleClick(img.photoGallery)}
                >
                  <img
                    src={img.photoGallery}
                    className="w-auto h-[300px] object-cover transition-all delay-400"
                    alt="photos"
                  />
                </a>
              </SwiperSlide>
            );
          })}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      )}
    </div>
  );
}
