import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Container from "../custom/Container";

function NavSidebar({ children }) {
	const [drawerOpen, setDrawerOpen] = useState(true);

	const handleLogout = () => {
		window.location = "/login";
	};

	useEffect(() => {
		const handleResize = () => {
			setDrawerOpen(window.innerWidth > 950);
		};

		// Add event listener to window resize
		window.addEventListener("resize", handleResize);

		// Check initial screen width
		handleResize();

		// Cleanup the event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="max-h-screen overflow-hidden font-nunito">
			<div className="navbar bg-base-100 border fixed z-10 navigation-bar">
				<div className="navbar-start">
					<div onClick={() => setDrawerOpen(!drawerOpen)}>
						<label tabIndex={0} className="btn btn-ghost btn-circle">
							<RxHamburgerMenu size="24px" />
						</label>
					</div>
				</div>
				<div className="navbar-center font-semibold text-xl">
					XCEL MEDICAL ADMIN PANEL
				</div>
				<div className="navbar-end">
					<div className="dropdown dropdown-end">
						<label tabIndex="0" className="btn btn-ghost btn-circle">
							<FaUserCircle size="30px" />
						</label>
						<ul
							tabIndex="0"
							className="dropdown-content menu shadow bg-base-100"
						>
							<li onClick={handleLogout}>
								<Link>Logout</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				className={
					"w-60 top-16 h-[calc(100%-64px)] bg-white fixed ease duration-200 sidepanel " +
					(drawerOpen ? "left-0" : "-left-96")
				}
			>
				<ul className="menu p-4 space-y-4">
					<li className="hover:bg-[#E0F1EB] rounded-md">
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-[#EF614F] bg-[#F6F7F2] font-semibold"
									: "font-semibold"
							}
							to="/sliders"
						>
							Sliders
						</NavLink>
					</li>
					<li className="hover:bg-[#E0F1EB] rounded-md">
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-[#EF614F] bg-[#F6F7F2] font-semibold"
									: "font-semibold"
							}
							to="/about"
						>
							About
						</NavLink>
					</li>
					<li className="hover:bg-[#E0F1EB] rounded-md">
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-[#EF614F] bg-[#F6F7F2] font-semibold"
									: "font-semibold"
							}
							to="/services"
						>
							Services
						</NavLink>
					</li>
					<li className="hover:bg-[#E0F1EB] rounded-md">
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-[#EF614F] bg-[#F6F7F2] font-semibold"
									: "font-semibold"
							}
							to="/photos"
						>
							Photos
						</NavLink>
					</li>
					<li className="hover:bg-[#E0F1EB] rounded-md">
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-[#EF614F] bg-[#F6F7F2] font-semibold"
									: "font-semibold"
							}
							to="/videos"
						>
							Videos
						</NavLink>
					</li>
				</ul>
			</div>
			<div
				className={
					"absolute top-16 ease-in duration-100 main-content " +
					(drawerOpen ? "ml-60 w-[calc(100%-240px)]" : "w-full")
				}
			>
				<Container>{children}</Container>
				{/* <footer className="footer footer-center p-4 bg-gray-900 text-white">
					<div className="sm:flex flex-col align-middle md:flex-row">
						<p>@ Copyright All rights reserved by ATI Limited |</p>
						<p>Developed by</p>
						<img
							src={`${process.env.PUBLIC_URL}/assets/images/ati-logo.png`}
							alt="ATI"
							style={{ maxHeight: "30px", cursor: "pointer" }}
							onClick={() =>
								window.open("https://www.atilimited.net/", "_blank")
							}
						/>
					</div>
				</footer> */}
			</div>
		</div>
	);
}

export default NavSidebar;
