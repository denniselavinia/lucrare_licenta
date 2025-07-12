function getImgUrl(name) {
	return new URL(`../assets/puzzles/${name}`, import.meta.url);
}

export { getImgUrl };
