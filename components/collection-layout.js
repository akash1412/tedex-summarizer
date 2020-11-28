const CollectionLayout = ({ children, flexDir, width }) => (
	<div className={`flex ${flexDir} ${width} `}>{children}</div>
);

export default CollectionLayout;
