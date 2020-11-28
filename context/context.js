import { useState, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { youtubeParser, decodeHTMLEntities } from "../utils";

export const GlobalContext = createContext({
	loading: false,
	summarizer: {
		title: null,
		sessionTalk: null,
	},
	toggleFormInput: false,
	GetSummarizer: () => {},
	handleToggleFormInput: () => {},
});

const GlobalContextProvider = ({ children }) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const [summarizer, setSummarizer] = useState(null);

	const [toggleFormInput, setToggleFormInput] = useState(false);

	const handleToggleFormInput = () => {
		setToggleFormInput(!toggleFormInput);
	};

	const GetSummarizer = async VIDEO_URL => {
		setLoading(true);
		router.push("/read");

		const parsed_URL = youtubeParser(VIDEO_URL);

		if (!VIDEO_URL) {
			return;
		}

		const fetchedTranscript = await axios(
			`https://video.google.com/timedtext?lang=en&v=${parsed_URL}`
		);

		const { data: videoDetail } = await axios(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${process.env.API_KEY}&id=${parsed_URL}`
		);

		console.log(videoDetail);

		const transcript = fetchedTranscript.data.replace(/<[^>]*>/g, "");

		const decodedTranscript = decodeHTMLEntities(transcript);

		axios("http://localhost:3000/api/punctuator", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: { text: decodedTranscript },
		})
			.then(res => {
				console.log(res);
				setSummarizer({
					title: videoDetail.items[0].snippet.title,
					sessionTalk: JSON.parse(res.data.text),
				});
				setLoading(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<GlobalContext.Provider
			value={{
				GetSummarizer,
				summarizer,
				loading,
				handleToggleFormInput,
				toggleFormInput,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
