import React, {FC} from 'react';
import styles from './Controls.module.scss';
import {Button} from '../Button/Button';
import {CurrentTypeStateType, UniqueKeyValuesType} from '../../@types/types';


interface ControlsProps {
    currentType: CurrentTypeStateType;
    setCurrentType: (type: CurrentTypeStateType) => void;
    dateTypes: UniqueKeyValuesType;
}

const {
    controls,
    btn_group,
    counter
} = styles;

export const Controls:FC<ControlsProps> = ({
        currentType,
        setCurrentType,
        dateTypes
}) => {

    const currentIndex = dateTypes.indexOf(currentType);


    const counterDecrementHandler = () => {
        let type;
        if(currentIndex === 0) {
            type = dateTypes[dateTypes.length - 1];
        } else {
            type = dateTypes[currentIndex - 1];
        }
        setCurrentType(type);
    }
    const counterIncrementHandler = () => {
        let type;
        if(currentIndex === dateTypes.length - 1)  {
            type = dateTypes[0];
        } else {
            type = dateTypes[currentIndex + 1];
        }
        setCurrentType(type);
    }


    return (
        <div className={controls}>
            <span className={counter}>0{currentIndex + 1}/0{dateTypes.length}</span>
            <div className={btn_group}>
                <Button
                    onClick={counterDecrementHandler}
                    disabled={currentIndex === 0}
                />
                <Button
                    onClick={counterIncrementHandler}
                    isNext
                    disabled={currentIndex === dateTypes.length - 1}
                />
            </div>
        </div>
    );
};