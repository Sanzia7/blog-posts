export const getLastPageLinks = (links) => {
	const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/)
	// return +result[1]
	return Number(result[1])
}
