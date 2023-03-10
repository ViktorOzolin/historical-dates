import React, {FC} from 'react';

interface ArrowProps {
    isNext?: boolean;
    color?: string;
}

export const Arrow:FC<ArrowProps> = ({isNext,color = "#42567A" }) => {
    const d = isNext
        ? 'M1.50012 0.750001L7.75012 7L1.50012 13.25'
        : 'M8.49988 0.750001L2.24988 7L8.49988 13.25';
    return (
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={d} stroke={color} strokeWidth="2"/>
            </svg>
    );
};