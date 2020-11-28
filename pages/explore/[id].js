import { useState } from "react";
import axios from "axios";

import Card from "../../components/card";

import { useRouter } from "next/router";

// const fetchTedExlist = () => {
// 	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=ted&key=${process.env.API_KEY}&maxResults=10&eventType=completed&type=video`;

// 	axios(url)
// 		.then(res => console.table(res))
// 		.catch(err => console.log(err.response));
// };

const NextPageList = () => {
	const router = useRouter();

	console.log(router);

	return (
		<div className='flex flex-col items-center'>
			{/* 			 
			<h2 className='text-2xl font-black mb-6'> Explore</h2>

			<div className='w-1/2'>
				{tedExVideos.map(
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
			</div> */}
			<h1>Page </h1>
		</div>
	);
};

export default NextPageList;

export const getStaticProps = async content => {
	console.log(content);
	// let nextToken;
	// async function getTalksListAccToPageNo(nextToken) {
	// 	let maxResults = 10;
	// 	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${
	// 		process.env.API_KEY
	// 	}&maxResults=${maxResults}&&type=video&channelId=${
	// 		process.env.TED_CHANNEL_ID
	// 	}&order=viewCount&${nextToken ? `pageToken=${nextToken}` : ""}`;
	// 	const response = await axios(url).catch(err => console.log(err));
	// }
	// const response = getTalksListAccToPageNo(nextToken);
	// const {
	// 	nextPageToken,
	// 	pageInfo: { totalResults, resultsPerPage },
	// } = response.data;
	// nextToken = nextPageToken;
	return {
		props: {
			tedExVideos: "response.data.items",
			// res: response.data,
		},
	};
};

export function getStaticPaths() {
	return {
		paths: [{ params: { token: "CAoQAA" } }, { params: { token: "CAoQAA" } }],
		fallback: false,
	};
}
