import { useEffect, useState } from "react";

import { MdExpandLess } from "react-icons/md";

const Drawer = () => {
	useEffect(() => {
		window.addEventListener("scroll", handleWindowScroll);

		return () => {
			window.removeEventListener("scroll", handleWindowScroll);
		};
	}, []);

	const [scrollPosition, setScrollPosition] = useState(0);

	const [openDrawer, setOpenDrawer] = useState(false);

	// const handleDrawerIconClick = () => setOpenDrawer(!openDrawer);

	const handleWindowScroll = e => {
		var winScroll =
			document.body.scrollTop || document.documentElement.scrollTop;
		var height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		var scrolled = (winScroll / height) * 100;
		setScrollPosition(scrolled);
	};

	return (
		<div
			className={`bg-red-400 fixed bottom-0 w-full rounded-t-2xl p-1 px-3 flex justify-between  items-center  ${
				openDrawer ? "h-32" : ""
			}`}
			style={{ transition: "2s" }}>
			<div className='w-1/2 bg-gray-300 h-4 rounded-2xl overflow-hidden relative'>
				<span
					className='absolute text-xs'
					style={{ transform: "translateX(110px)" }}>
					{Math.floor(scrollPosition)}%
				</span>
				<div
					className='bg-green-500 h-full'
					style={
						scrollPosition === 0
							? { width: "0%" }
							: { width: `${scrollPosition}%`, color: "#333" }
					}></div>
			</div>
			<MdExpandLess
				size='1.7rem'
				cursor='pointer'
				// onClick={handleDrawerIconClick}
			/>

			{/* <button className='bg-green-400 rounded p-1'>save</button> */}
		</div>
	);
};

export default Drawer;
