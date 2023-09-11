import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar(props) {
	const {
		handleCarousel,
		handleAbout,
		handleService,
		handlePhotos,
		handleVideo,
		handleFooter,
		clicked,
		setClicked,
	} = props;

	const [scrolled, setScrolled] = useState(false);

	window.addEventListener("scroll", () => {
		if (window.scrollY > 40) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	});

	return (
		<div className={`font-nunito fixed z-10 w-full ${scrolled && "shadow-md"}`}>
			<div className="navbar bg-base-100 p-0">
				<div className="w-full max-w-[1200px] m-auto relative">
					<div className="flex-1">
						{/* <a className="btn btn-ghost normal-case text-xl">Xcel Medical</a> */}
						<img src="/xcel.svg" className="logo w-32" alt="" />
					</div>
					<div className="flex-none hidden md:block">
						<ul className="menu menu-horizontal text-lg">
							<li onClick={handleCarousel}>
								<a>Home</a>
							</li>
							<li onClick={handleAbout}>
								<a>About Us</a>
							</li>
							<li onClick={handleService}>
								<a>Services</a>
							</li>
							<li onClick={handlePhotos}>
								<a>Photos</a>
							</li>
							<li onClick={handleVideo}>
								<a>Videos</a>
							</li>
							<li onClick={handleFooter}>
								<a>Contact Us</a>
							</li>
						</ul>
					</div>
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle md:hidden"
						onClick={() => setClicked(!clicked)}
					>
						<RxHamburgerMenu size="24px" />
					</label>
				</div>
				<ul
					className={`menu menu-vertical text-lg absolute w-full transition-all delay-200 z-100 bg-white shadow-md ${
						clicked ? "top-24" : "top-[-300px]"
					} `}
				>
					<li onClick={handleCarousel}>
						<a>Home</a>
					</li>
					<li onClick={handleAbout}>
						<a>About Us</a>
					</li>
					<li onClick={handleService}>
						<a>Services</a>
					</li>
					<li onClick={handlePhotos}>
						<a>Photos</a>
					</li>
					<li onClick={handleVideo}>
						<a>Videos</a>
					</li>
					<li onClick={handleFooter}>
						<a>Contact Us</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
