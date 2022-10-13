export const getPosition = (ref: React.MutableRefObject<HTMLInputElement>) => {
	const x: number = ref.current.offsetLeft;
	const y: number = ref.current.offsetTop;
	return {
		x,
		y,
		width: ref.current.offsetWidth,
		height: ref.current.offsetHeight,
	};
};
