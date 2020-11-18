import { useRef } from "react";

const Form = ({ handleFormSubmit }) => {
	const inputRef = useRef();

	return (
		<form
			className='self-center flex w-full md:w-1/2'
			onSubmit={e => {
				e.preventDefault();
				handleFormSubmit(inputRef.current.value);
			}}>
			<input
				className='py-2 px-2  md:py-6 md:px-3 flex-grow border-2 border-solid border-black-100 bg-gray-100'
				placeholder='paste video url'
				type='text'
				ref={inputRef}
			/>
			<button className='w-1/4 md:w-16 bg-black-100 text-white text-sm border-2 border-solid border-black-100'>
				get transcript
			</button>
		</form>
	);
};

export default Form;
