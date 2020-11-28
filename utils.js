export const youtubeParser = url => {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	var match = url.match(regExp);
	return match && match[7].length == 11 ? match[7] : false;
};

export function decodeHTMLEntities(text) {
	var entities = [
		["amp", "&"],
		["apos", "'"],
		["#x27", "'"],
		["#x2F", "/"],
		["#39", "'"],
		["#47", "/"],
		["lt", "<"],
		["gt", ">"],
		["nbsp", " "],
		["quot", '"'],
		[" % 20", " "],
	];

	for (var i = 0, max = entities.length; i < max; ++i)
		text = text.replace(
			new RegExp("&" + entities[i][0] + ";", "g"),
			entities[i][1]
		);
	return text;
}
