import React, {FC, useEffect, useMemo, useState} from 'react';
import styles from './HistoricalDates.module.scss';
import {Slider} from '../Slider/Slider';
import {Circle} from '../Circle/Circle';
import {CurrentTypeStateType, DataType, UniqueKeyValuesType} from '../../@types/types';
import {uniqueKeyValues} from '../../utils';
import {Title} from '../Title/Title';

interface HistoricalDatesProps {
    data: DataType
}

const {
    wrapper,
} = styles;

export const HistoricalDates:FC<HistoricalDatesProps> = ({data}) => {
    const [dateTypes, setDateTypes] = useState<UniqueKeyValuesType>([])
    const [currentType, setCurrentType] = useState<CurrentTypeStateType>('');

    const currentDates = useMemo(() => {
        return data.filter(date => date.type === currentType);
    },[currentType, data]);

    const initial = (data: DataType) => {
        const types = uniqueKeyValues(data, 'type');
        setDateTypes(types);
        setCurrentType(types[0]);
    }

    useEffect(() => {
        if(data) {
            initial(data);
        }
    },[data]);

    return (
            <div className={wrapper}>
                <Title>Исторические даты</Title>
                <Circle
                    dateTypes={dateTypes}
                    currentDates={currentDates}
                    setCurrentType={(type) => {
                        setCurrentType(type)
                    }}
                    currentType={currentType}
                />
                <Slider items={currentDates} />
            </div>
    );
};