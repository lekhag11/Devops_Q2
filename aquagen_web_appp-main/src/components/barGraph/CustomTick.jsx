const RenderCustomTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { offset } = payload;
    const pathX = Math.floor(x - offset) + 0.5;

    return (
        <path
            d={`M${pathX},${y - 64}v${5}`}
            stroke='grey'
        />
    );
};

export default RenderCustomTick;
