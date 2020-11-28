import { Fragment, useContext } from "react";

import { useRouter } from "next/router";

import Layout from "../components/layout";
import Drawer from "../components/drawer";
import { GlobalContext } from "../context/context";

const Read = () => {
	const { loading, summarizer } = useContext(GlobalContext);

	const router = useRouter();

	// if (!loading && !summarizer) {
	// 	router.push("/");
	// }

	return (
		<Layout>
			{/* <Navbar /> */}
			<div className='p-3 mt-16 '>
				{loading ? <div>loading...sadas</div> : null}

				{summarizer && summarizer.sessionTalk.length > 0 && !loading ? (
					<div className='pb-10'>
						<h1 className='text-2xl font-semibold pb-2'>{summarizer.title}</h1>
						<p className='leading-8'>{summarizer?.sessionTalk}</p>
					</div>
				) : null}

				{/* {summarizer.sessionTalk.length === 0
					? "cannot fetch requested talk ☹"
					: null} */}
			</div>
			<Drawer />
		</Layout>
	);
};

export default Read;
