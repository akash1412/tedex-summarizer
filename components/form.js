import { useEffect, useRef, useContext } from "react";

import { GlobalContext } from "../context/context";

const Form = () => {
	const { handleToggleFormInput } = useContext(GlobalContext);

	const inputRef = useRef();
	const formRef = useRef();

	const checkComponentCLick = e => {
		if (formRef.current.contains(e.target)) {
			return;
		}

		handleToggleFormInput();
	};

	useEffect(() => {
		document.addEventListener("mousedown", checkComponentCLick);

		return () => {
			document.removeEventListener("mousedown", checkComponentCLick);
		};
	}, []);

	const { GetSummarizer } = useContext(GlobalContext);

	return (
		<form
			className='flex flex-col items-center  w-full md:w-1/2 '
			onSubmit={e => {
				e.preventDefault();
				GetSummarizer(inputRef.current.value);
				inputRef.current.value = "";
			}}
			ref={formRef}>
			<input
				className='self-stretch py-2 px-2  md:py-6 md:px-3 flex-grow border-2 border-solid border-red-200 focus:bg-gray-100 focus:border-red-400 focus:outline-none focus:border-3'
				placeholder='paste video url'
				type='text'
				ref={inputRef}
				// onKeyDown={}
			/>
			<button className=' bg-red-700 text-white text-sm  mt-2 px-8 py-1 rounded hover:bg-red-300'>
				Read
			</button>
		</form>
	);
};

export default Form;
