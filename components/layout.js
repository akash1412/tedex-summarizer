import Navbar from "./navbar";

console.log(Navbar);

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<div>{children}</div>
		</>
	);
};
export default Layout;
