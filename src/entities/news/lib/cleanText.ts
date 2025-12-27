export const cleanText = (text: string): string => {
	return text
		.replace(/<[^>]*>/g, "")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">");
};
