import React, { useState, useEffect } from 'react';

const BreakPointEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style,
    data,
    markerEnd,
}) => {
    const [controlPoints, setControlPoints] = useState(
        data?.controlPoints || []
    );
    const [path, setPath] = useState('');

    useEffect(() => {
        let newPath = `M ${sourceX},${sourceY}`;
        if (controlPoints.length > 0) {
            controlPoints.forEach((point) => {
                newPath += `L ${point.x},${point.y}`;
            });
        }
        newPath += `L ${targetX},${targetY}`;
        setPath(newPath);
    }, [sourceX, sourceY, targetX, targetY, controlPoints]);

    useEffect(() => {
        setControlPoints(data?.controlPoints || []);
    }, [data?.controlPoints]);

    const defaultStyle = {
        stroke: '#000',
        strokeWidth: 2,
        fill: 'none',
        cursor: 'pointer',
    };

    const edgeStyle = { ...defaultStyle, ...style };

    return (
        <>
            <path
                d={path}
                style={edgeStyle}
                markerEnd={markerEnd}
            />
        </>
    );
};

export default BreakPointEdge;
