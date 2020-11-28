import { Fragment, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import Lottie from "react-lottie";

import { GlobalContext } from "../context/context";

// import * as animationData from "../37320-bee-looping.json";
import * as ideaLottieAnimation from "../16546-waiting-for-ideas.json";

import Form from "../components/form";
import Navbar from "../components/navbar";
import CollectionLayout from "../components/collection-layout";
import Card from "../components/card";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: ideaLottieAnimation.default,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

export default function Home(props) {
	const { toggleFormInput, handleToggleFormInput } = useContext(GlobalContext);

	return (
		<Fragment>
			<Navbar />
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='z-10 mt-16'>
				<div className='flex flex-col items-center leading-8 p-2'>
					<HomeMain
						toggleFormInput={toggleFormInput}
						handleToggleFormInput={handleToggleFormInput}
					/>

					<HomeTopTalksView topRatedTalks={props.topRatedTedExVideos} />
				</div>
			</main>
		</Fragment>
	);
}

function HomeMain({ toggleFormInput, handleToggleFormInput }) {
	return (
		<div className='flex flex-col items-center h-90 md:h-screen  '>
			{/* <h1 className='text-2xl md:text-3xl font-bold p-3'>
				<span className='bg-red-400 px-1'>TED Ex</span>
				Summarizer
			</h1> */}

			<Image
				src='/undraw_reading_0re1.svg'
				alt='Picture of the author'
				width={500}
				height={500}
				className=' w-screen'
			/>

			{toggleFormInput ? (
				<Form />
			) : (
				<button
					className='sm:mt-6 bg-red-600 text-white px-3 py-1 rounded focus:outline-none'
					onClick={handleToggleFormInput}>
					Paste Video Url
				</button>
			)}
		</div>
	);
}

function HomeTopTalksView({ topRatedTalks }) {
	return (
		<div className=' mt-3 md:mt-5 flex flex-col items-center border-red-900 '>
			<h2 className='text-xl font-semibold mb-8'>
				Top <span className='bg-red-400'>Rated</span> Articles
			</h2>

			<CollectionLayout flexDir='flex-col' width='w-full'>
				{topRatedTalks.map(
					({
						snippet: { title, description, thumbnails },
						id: { videoId },
					}) => (
						<Card
							key={videoId}
							title={title}
							description={description}
							thumbnail={thumbnails.high.url}
							id={videoId}
						/>
					)
				)}
			</CollectionLayout>

			<div className='mt-5 flex flex-col items-center select-none'>
				<h1 className='text-center'>
					Still <span className='bg-red-400  rounded-sm'>Confused?</span> what
					to read.
				</h1>
				<Lottie options={defaultOptions} height={"90%"} width={"90%"} />
				<Link href='/explore'>
					<a className='my-6 sm:mt-6 bg-red-600 text-white px-4 py-1 rounded'>
						Explore
					</a>
				</Link>
			</div>
		</div>
	);
}

export const getStaticProps = async () => {
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.API_KEY}&maxResults=10&&type=video&channelId=${process.env.TED_CHANNEL_ID}&order=rating`;

	const response = await axios(url).catch(err => console.log(err));

	return {
		props: {
			topRatedTedExVideos: response.data.items.slice(0, 5),
		},
	};
};
