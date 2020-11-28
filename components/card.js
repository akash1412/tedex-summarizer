import { useContext } from "react";

import { GlobalContext } from "../context/context";

const Card = ({ title, description, thumbnail, id }) => {
	const { GetSummarizer } = useContext(GlobalContext);

	return (
		<div
			key={id}
			onClick={() => GetSummarizer(`https://www.youtube.com/watch?v=${id}`)}
			className='w-full flex  mb-5 shadow-lg  overflow-hidden rounded h-card cursor-pointer'>
			<img src={thumbnail} className='w-2/5 md:w-1/3 h-full ' />

			<div className='p-1 flex-grow flex flex-col flex-wrap'>
				<h2 className='text-base font-semibold'>{title}</h2>
			</div>
		</div>
	);
};
// Hu4Yvq-g7_Y
export default Card;
