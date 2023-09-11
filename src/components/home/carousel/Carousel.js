import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";

SwiperCore.use([Pagination, Autoplay]);

function Carousel() {
	const swiperElRef = useRef(null);

	const { isLoading, data: slider = [] } = useQuery({
		queryKey: ["slider"],
		queryFn: async () => {
			const res = await axios.get(
				// `/api/set-slider`
				`${process.env.REACT_APP_API_URL}/api/set-slider`
			);
			const fetchedData = await res;
			const data = await fetchedData.data;
			return data;
		},
	});

	const modifiedArray = slider?.map((obj) => {
		if (obj?.title?.includes("#")) {
			obj.title = obj.title.split("#").join("\n");
		}
		if (obj?.description?.includes("#")) {
			obj.description = obj.description.split("#").join("\n");
		}

		return obj;
	});

	return (
		<div className="relative">
			<Swiper
				ref={swiperElRef}
				slidesPerView={1}
				navigation={false}
				pagination={{ clickable: true }}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				className="my-swiper"
				loop={true}
			>
				{isLoading ? (
					<FadeLoader color="#000000" height={20} />
				) : (
					<>
						{modifiedArray?.map((slide, index) => {
							return (
								<SwiperSlide className="max-h-[520px] relative" key={index}>
									<img
										src={slide?.sliderImage}
										alt="carousel"
										// className="w-auto"
									/>
									<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
									<div className="absolute top-4 left-4">
										<p
											className="text-2xl font-bold text-white leading-tight md:text-5xl"
											style={{ whiteSpace: "pre-line" }}
										>
											{slide?.title}
										</p>
										<p
											className="text-white text-sm leading-tight md:text-lg"
											style={{ whiteSpace: "pre-line" }}
										>
											{slide?.description}
										</p>
									</div>
									<div className="absolute bottom-16 right-4">
										{slide?.downloadLinkStatus === "Y" ? (
											<Link
												to="https://apps.apple.com/app/xcel-medical-centre/id6449455026"
												target="_blank"
												className="text-white cursor-pointer z-10"
											>
												<button className="btn btn-sm bg-[#1979F4] w-[260px] text-white border-none hidden md:block hover:bg-[#F57F20]">
													Download Our IOS App
												</button>
											</Link>
										) : (
											""
										)}
									</div>
									<div className="absolute bottom-4 right-4">
										{slide?.downloadLinkStatus === "Y" ? (
											<Link
												to="https://play.google.com/store/search?q=xcel+medical+centre&c=apps&hl=en&gl=US"
												target="_blank"
												className="text-white cursor-pointer z-10"
											>
												<button className="btn btn-sm bg-[#6CBE45] w-[260px] text-white border-none hidden md:block hover:bg-[#F57F20]">
													Download Our Android App
												</button>
											</Link>
										) : (
											""
										)}
									</div>
									<div className="absolute bottom-4 left-4 w-[60%]">
										{/* <p className="text-5xl font-bold text-orange-400 leading-tight">
							Telemedicine
						</p> */}
										{/* <p className="text-white text-lg leading-tight">
							Telemedicine is the future of healthcare because it connects
							patients with doctors for convenient, affordable, and secure
							healthcare.Telemedicine is the future of healthcare because it
							connects patients with doctors for convenient, affordable, and
							secure healthcare.
						</p> */}
									</div>
								</SwiperSlide>
							);
						})}
					</>
				)}
			</Swiper>

			<div className="flex flex-col items-center pt-8 gap-4 md:hidden">
				<Link
					to="https://apps.apple.com/app/xcel-medical-centre/id6449455026"
					target="_blank"
					className="text-white cursor-pointer"
				>
					<button className="btn btn-sm bg-[#1979F4] w-[260px] text-white border-none hover:bg-[#F57F20]">
						Download Our IOS App
					</button>
				</Link>

				<Link
					to="https://play.google.com/store/search?q=xcel+medical+centre&c=apps&hl=en&gl=US"
					target="_blank"
					className="text-white cursor-pointer"
				>
					<button className="btn btn-sm bg-[#6CBE45] w-[260px] text-white border-none hover:bg-[#F57F20]">
						Download Our Android App
					</button>
				</Link>
			</div>
		</div>
	);
}

export default Carousel;
