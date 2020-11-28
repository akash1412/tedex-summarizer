import axios from "axios";

import Card from "../components/card";
import Link from "next/link";
import Layout from "../components/layout";

const Explore = ({ tedExVideos, nextPageToken }) => {
	return (
		<Layout>
			<div className=' z-10 mt-12'>
				<div className='p-2 flex flex-col items-center  '>
					<h2 className='text-2xl font-black mb-6'> Explore</h2>

					<div className='w-full md:w-1/2'>
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
					</div>
					{/* ?token=${nextPageToken} */}
					{nextPageToken ? (
						<Link href={`/explore/CAoQAA`}>
							<a className='bg-gray-300 rounded-b p-2 text-lg'>2</a>
						</Link>
					) : null}
				</div>
			</div>
		</Layout>
	);
};

export default Explore;

export const getStaticProps = async () => {
	let nextToken;

	async function getTalksListAccToPageNo(nextToken) {
		let maxResults = 10;

		const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${
			process.env.API_KEY
		}&maxResults=${maxResults}&&type=video&channelId=${
			process.env.TED_CHANNEL_ID
		}&order=viewCount&${nextToken ? `pageToken=${nextToken}` : ""}`;

		const res = await axios(url).catch(err => console.log(err));

		return res;
	}

	const response = await getTalksListAccToPageNo(nextToken);

	const {
		nextPageToken,
		pageInfo: { totalResults, resultsPerPage },
	} = response.data;

	nextToken = nextPageToken;

	return {
		props: {
			tedExVideos: response.data.items,
			nextPageToken,
			// res: response.data,
		},
	};
};
