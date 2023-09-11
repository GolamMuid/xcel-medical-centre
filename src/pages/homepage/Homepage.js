import React, { useRef, useState } from "react";
import Carousel from "../../components/home/carousel/Carousel";
import Photos from "../../components/home/photos/Photos";
import Videos from "../../components/home/videos/Videos";
import Footer from "../../layout/footer/Footer";
import Container from "../../layout/custom/Container";
import Navbar from "../../layout/navbar/Navbar";
import ScrollToTop from "../../layout/custom/ScrollToTop";
import About from "../../components/home/about/About";
import Services from "../../components/home/services/Services";

function Homepage() {
	const carouselRef = useRef(null);
	const aboutRef = useRef(null);
	const serviceRef = useRef(null);
	const photosRef = useRef(null);
	const videoRef = useRef(null);
	const footerRef = useRef(null);
	const [clicked, setClicked] = useState(false);

	const handleCarousel = () => {
		carouselRef.current?.scrollIntoView({ behavior: "smooth" });
		setClicked(false);
	};
	const handleAbout = () => {
		aboutRef.current?.scrollIntoView({ behavior: "smooth" });
		setClicked(false);
	};
	const handleService = () => {
		serviceRef.current?.scrollIntoView({ behavior: "smooth" });
		setClicked(false);
	};
	const handlePhotos = () => {
		photosRef.current?.scrollIntoView({ behavior: "smooth" });
		setClicked(false);
	};
	const handleVideo = () => {
		videoRef.current?.scrollIntoView({ behavior: "smooth" });
		setClicked(false);
	};
	const handleFooter = () => {
		footerRef.current?.scrollIntoView({ behavior: "smooth" });
		setClicked(false);
	};

	return (
		<div className="relative">
			<Navbar
				handleCarousel={handleCarousel}
				handleAbout={handleAbout}
				handleService={handleService}
				handlePhotos={handlePhotos}
				handleVideo={handleVideo}
				handleFooter={handleFooter}
				clicked={clicked}
				setClicked={setClicked}
			/>
			<ScrollToTop />
			<Container>
				<div className="pt-32" ref={carouselRef}>
					<Carousel />
				</div>
				<div className="grid gap-5 overflow-hidden about-us-container">
					<div className="pt-32" ref={aboutRef}>
						<About />
					</div>
					<div className="pt-32" ref={serviceRef}>
						<Services />
					</div>
				</div>
				<div className="pt-32" ref={photosRef}>
					<Photos />
				</div>
				<div className="pt-32" ref={videoRef}>
					<Videos />
				</div>
			</Container>
			<div className="pt-32" ref={footerRef}>
				<Footer />
			</div>
		</div>
	);
}

export default Homepage;
