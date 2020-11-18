import axios from "axios";

const handleClick = () => {
	const API_KEY = "AIzaSyAA5DCrhk_LIwhfGqY6nUbi-w41W_vzTWE";

	const url = `https://www.googleapis.com/youtube/v3/search?maxResults=1&q=ted&key=${API_KEY}`;

	axios(url)
		.then(res => console.log(res))
		.catch(err => console.log(err.response));
};

const Explore = () => (
	<div>
		Explore
		<button onClick={handleClick}>Click</button>
	</div>
);

export default Explore;
