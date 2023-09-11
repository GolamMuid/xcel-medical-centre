import React, { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

function ScrollToTop() {
	const [visible, setVisible] = useState(false);
	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 200) {
			setVisible(true);
		} else if (scrolled <= 200) {
			setVisible(false);
		}
	};
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	window.addEventListener("scroll", toggleVisible);

	return (
		<div
			onClick={scrollToTop}
			className={`fixed bottom-8 right-8 bg-[#6CBE45] hover:bg-[#F57F20] text-white text-5xl z-10 transition-all delay-400 cursor-pointer rounded-full ${
				visible ? "opacity-100" : "opacity-0"
			}`}
		>
			<MdKeyboardArrowUp />
		</div>
	);
}

export default ScrollToTop;
