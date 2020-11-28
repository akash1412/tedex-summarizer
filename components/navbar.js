import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter();

	return (
		<div
			className={`fixed top-0 z-50 bg-red-100 w-full h-12  px-2 flex  items-center justify-between `}
			style={{
				boxShadow: "0 25px 50px -12px rgba(255, 0, 0, 0.30)",
				backgroundColor: "#FDFFF5",
			}}>
			<h1 className='text-xl md:text-2xl font-bold p-3'>
				<span className='bg-red-400 px-1'>TED Ex</span>
				Summarizer
			</h1>

			<div>
				{router.pathname !== "/" ? (
					<Link href='/'>
						<a className='mr-5 text-sm underline hover:bg-red-400'>Home</a>
					</Link>
				) : null}

				{router.pathname !== "/explore" ? (
					<Link href='explore'>
						<a className='mr-5 text-sm underline hover:bg-red-400'>
							Explore Talks
						</a>
					</Link>
				) : null}
			</div>
		</div>
	);
};

export default Navbar;
