import { useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import axios from "axios";
import Lottie from "react-lottie";

import * as animationData from "../37320-bee-looping.json";

import { youtubeParser, decodeHTMLEntities } from "../utils";

import Form from "../components/form";
import Navbar from "../components/navbar";

export default function Home() {
	const [talkScript, setTalkScript] = useState("");

	const [loading, setLoading] = useState(false);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData.default,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const handleFormSubmit = async video_url => {
		console.log(video_url);

		const parsed_URL = youtubeParser(video_url);

		const fetchedTranscript = await axios(
			`https://video.google.com/timedtext?lang=en&v=${parsed_URL}`
		);

		const transcript = fetchedTranscript.data.replace(/<[^>]*>/g, "");

		const decodedTranscript = decodeHTMLEntities(transcript);

		setLoading(true);

		axios("http://localhost:3000/api/punctuator", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: { text: decodedTranscript },
		})
			.then(res => {
				setTalkScript(JSON.parse(res.data.text));
				setLoading(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<div className='  '>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className=' flex flex-col items-center  leading-8 '>
				<Navbar />
				{/* <Form handleFormSubmit={handleFormSubmit} /> */}

				{loading ? (
					<Lottie options={defaultOptions} height={400} width={400} />
				) : (
					<p>{talkScript}</p>
				)}
			</main>
		</div>
	);
}

//nox-shadow:0 3px 20px rgba(#000,0.2)
