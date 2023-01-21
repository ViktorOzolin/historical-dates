import React, {FC, useEffect, useRef} from 'react';
import styles from './Circle.module.scss';
import {CurrentTypeStateType, DataType, UniqueKeyValuesType} from '../../@types/types';
import {Controls} from '../Controls/Controls';
import {Period} from '../Period/Period';
import {getPeriod} from "../../utils";
import gsap from "gsap";

interface CircleProps {
    dateTypes: UniqueKeyValuesType;
    setCurrentType: (type: CurrentTypeStateType) => void;
    currentType: CurrentTypeStateType;
    currentDates: DataType;
}

const {
    wrapper,
    circle,
    point,
    point_active
} = styles;

export const Circle:FC<CircleProps> = ({
        dateTypes,
        setCurrentType,
        currentType,
        currentDates
}) => {
    const circleRef = useRef<HTMLDivElement>(null);
    const {start, end} = getPeriod(currentDates);

    useEffect(() => {

       const tn2 = gsap.to([], 2, {
            bezier:{
                curviness: 1.5,
                values:[{x:100, y:100}, {x:0, y:200}, {x:-100, y:100}, {x:0, y:0}]
            },
                ease:Linear.easeNone, paused:true
       })
        const animation = gsap.to(circleRef.current, 1, {

        })

    },[currentType])

    return (
        <div className={wrapper}>
            <div className={circle} ref={circleRef}>
                {dateTypes.map((type, index) =>
                    <div
                        className={[point, currentType === type ? point_active : ''].join(' ')}
                        key={index}
                        onClick={() => setCurrentType(type)}
                    >
                        <div onClick={() => setCurrentType(type)}>{index + 1}</div>
                        <span>{type}</span>
                    </div>
                )}
            </div>
            <Period start={start} end={end} />
            <Controls
                currentType={currentType}
                setCurrentType={setCurrentType}
                dateTypes={dateTypes}
            />
        </div>
    );
};