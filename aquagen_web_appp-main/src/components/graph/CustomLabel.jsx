const CustomLabel = ({ value }) => {
    return (
        <g>
            <text
                x={0}
                y={0}
                dy={-4}
                fill={'black'}
                fontSize={10}
                textAnchor='middle'
            >
                {value}
            </text>
        </g>
    );
};

export default CustomLabel;
