import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Navbar = () => {
	const [scrolled, setScrollled] = useState(false);

	return (
		<nav className={`w-full h-12 bg-red-300 px-2 flex justify-center`}>
			logo
			<Link href='explore'>
				<a className='mr-5'>Explore Talks</a>
			</Link>
		</nav>
	);
};

export default Navbar;
