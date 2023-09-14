import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Pagination,
  Autoplay,
  EffectFade,
  EffectCreative,
} from "swiper";
import "swiper/swiper-bundle.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FadeLoader } from "react-spinners";
import ErrorText from "../../ui/ErrorText";
import Loader from "../../ui/Loader";

SwiperCore.use([Pagination, Autoplay, EffectFade, EffectCreative]);

function Services() {
  const {
    isLoading: serviceLoading,
    isError,
    data: services = [],
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/our-service/get-active-service`
        // `/api/set-service`
      );
      const data = await res.data.data;
      return data;
    },
  });

  const width = window.innerWidth;

  if (isError) {
    return <ErrorText />;
  }

  return (
    <div style={{ width: width > 767 ? "390px" : `${width}px` }}>
      <p className="text-4xl font-bold mb-5">Our Services </p>
      <div className="relative mb-16">
        <Swiper
          spaceBetween={50}
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
            },
          }}
          modules={[EffectCreative]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="mySwiper2"
        >
          {serviceLoading ? (
            <Loader />
          ) : (
            <>
              {services.map((service, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div>
                      <p className="text-2xl font-bold py-2">
                        {service?.title}
                      </p>
                    </div>
                    {/* <div className="h-[320px] w-[300px] flex items-center justify-center overflow-hidden lg:w-[390px]"> */}
                    <div
                      className="h-[320px] flex items-center justify-center overflow-hidden"
                      style={{ width: width > 767 ? "390px" : `${width}px` }}
                    >
                      <img
                        src={service?.serviceImage}
                        className="w-full h-full object-cover object-center"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default Services;
