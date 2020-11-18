import Cors from "cors";
import qs from "qs";
import axios from "axios";

const cors = Cors({
	methods: ["GET", "HEAD"],
});

export default async (req, res) => {
	const { text } = req.body;

	const data = await axios({
		method: "post",
		url: "http://bark.phon.ioc.ee/punctuator",
		data: qs.stringify({ text }),
		headers: {
			"content-type": "application/x-www-form-urlencoded;charset=utf-8",
		},
	});

	const cleanText = data.data.replace("( Applause, ),", "");

	console.log(cleanText);

	res.json({ text: JSON.stringify(cleanText) });
};
