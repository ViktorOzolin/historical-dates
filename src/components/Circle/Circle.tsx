import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Circle.module.scss';
import {TypeOfDateType, DataType, UniqueKeyValuesType} from '../../@types/types';
import {Controls} from '../Controls/Controls';
import {Period} from '../Period/Period';
import {getPeriod} from '../../utils';
import gsap from 'gsap';
import {useDynamicRefs} from '../../hooks/useDynamicRefs';
import cn from 'classnames';

interface CircleProps {
    dateTypes: UniqueKeyValuesType;
    setCurrentType: (type: TypeOfDateType) => void;
    currentType: TypeOfDateType;
    currentDates: DataType;
    setIsLoading: (loading: boolean) => void;
}

const degreeToActivePoint = [
    [0, -60, -120, 180, 120, 60],
    [60, 0, -60, -120, 180, 120],
    [120, 60, 0, -60, -120, 180],
    [180, 120, 60, 0, -60, -120],
    [-120, 180, 120, 60, 0, -60],
    [-60, -120, 180, 120, 60, 0],
];

export const Circle:FC<CircleProps> = ({
        dateTypes,
        setCurrentType,
        currentType,
        currentDates,
        setIsLoading
}) => {
    const circleRef = useRef<HTMLDivElement>(null);
    const {start, end} = getPeriod(currentDates);
    const {setRef, getAllRefs} = useDynamicRefs<HTMLDivElement>();
    const [circleRotation, setCircleRotation] = useState(120);
    const [pointIndex, setPointIndex] = useState(0);

    const onPointClickHandler = (type: TypeOfDateType) => {
        setIsLoading(true);
        const activeIndex = dateTypes.indexOf(type);
        const endpoint = degreeToActivePoint[pointIndex][activeIndex];
        setCircleRotation(prevState => prevState + endpoint);
        setPointIndex(activeIndex);
        setCurrentType(type);
    }

    const pointClasses = (type: TypeOfDateType) => cn({
        [styles.point]: true,
        [styles.active]: currentType === type,
    });

    useEffect(() => {
        const points = getAllRefs(dateTypes)?.map(ref => ref?.current);
        const circle = circleRef.current;
        if (points && points.length && circle) {
            gsap.to(points, 1, {rotation: -circleRotation});
            gsap.to(circle, 1, {
                rotation: circleRotation,
                onComplete: () => setIsLoading(false),
            })
        }
    },[circleRotation, dateTypes, getAllRefs, setIsLoading]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.circle} ref={circleRef}>
                {dateTypes.map((type, index) =>
                    <div
                        className={pointClasses(type)}
                        ref={setRef(type)}
                        key={index}
                        onClick={() => onPointClickHandler(type)}
                    >
                        <div onClick={() => setCurrentType(type)}>{index + 1}</div>
                        <span>{type}</span>
                    </div>
                )}
            </div>
            <Period start={start} end={end} />
            <Controls
                currentType={currentType}
                onPointClickHandler={onPointClickHandler}
                dateTypes={dateTypes}
            />
        </div>
    );
};