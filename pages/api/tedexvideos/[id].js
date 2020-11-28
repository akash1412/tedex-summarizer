import axios from "axios";

export default async function (req, res) {
	const { nextPageToken } = req.query;

	let maxResults = 10;

	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${
		process.env.API_KEY
	}&maxResults=${maxResults}&&type=video&channelId=${
		process.env.TED_CHANNEL_ID
	}&order=viewCount&${nextPageToken ? `pageToken=${nextPageToken}` : ""}`;

	const response = await axios(url).catch(err => console.log(err.message));

	res.status(200).json({
		status: "success",
		data: response,
	});
}
