import React from "react";
import Container from "../custom/Container";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

// const containerStyle = {
// 	width: "100%",
// 	height: "300px",
// };

// const center = {
// 	lat: 5.557231453720059,
// 	lng: -0.269099184657815,
// };

const locationSrc =
	"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2103.6017078242667!2d-0.2699763488156872!3d5.5563178960247095!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf971b36e84541%3A0xc8bbad2648a9446a!2sXcel%20Medical%20Centre%20and%20Dental%20Clinic%20Dansoman!5e0!3m2!1sen!2sbd!4v1687337960964!5m2!1sen!2sbd";

function Footer() {
	return (
		<div className="bg-black py-4 text-white">
			<Container>
				<div className="grid gap-4 footer-container">
					<div>
						<p className="text-4xl font-bold"> Contact Us </p>
						<img src="/xcel.svg" alt="logo" className="w-[200px]" />
						<ul className="">
							<li>HNO. A889-17, PROF</li>
							<li>ACHEAMPONG ROAD</li>
							<li>DANSOMAN, ACCRA, GHANA</li>
							<div className="flex items-center gap-2">
								<FaMobileAlt />
								<p> +233556067677 </p>
							</div>
							<div className="flex items-center gap-2">
								<HiOutlineMail />
								<p> xcelmedicalcentre@gmail.com </p>
							</div>
						</ul>
					</div>
					<div>
						{/* <LoadScript googleMapsApiKey="AIzaSyA1VSFoi2yYFEmb2Vg4kjgiAtaRz4gY45A">
							<GoogleMap
								mapContainerStyle={containerStyle}
								center={center}
								zoom={17}
							>
								<Marker
									position={{ lat: 5.557231453720059, lon: -0.269099184657815 }}
								/>
							</GoogleMap>
						</LoadScript> */}

						<iframe
							src={locationSrc}
							title="location"
							width="100%"
							height="300px"
							// style="border:0;"
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>

						<div className="flex justify-center gap-5 py-4 text-3xl ">
							<Link
								to="https://www.facebook.com/XcelMedCentre/"
								className="hover:text-orange-400"
								target="_blank"
							>
								<BsFacebook />
							</Link>
							<Link
								to="https://www.instagram.com/xcelmedicalcentre/?hl=en"
								className="hover:text-orange-400"
								target="_blank"
							>
								<BsInstagram />
							</Link>
							<Link
								to="https://twitter.com/xcelmedical?lang=en"
								className="hover:text-orange-400"
								target="_blank"
							>
								<BsTwitter />
							</Link>
							<Link
								to="https://www.youtube.com/channel/UCV7WHtA2NupN4YznpfKVv_w"
								className="hover:text-orange-400"
								target="_blank"
							>
								<BsYoutube />
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Footer;

// https://www.google.com/maps/search/Acheampong+Road,+Ghana/@6.5498716,-1.7692616,9z?entry=ttu
