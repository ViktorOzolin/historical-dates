import React, {FC} from 'react';
import styles from './Controls.module.scss';
import {Button} from '../Button/Button';
import {TypeOfDateType, UniqueKeyValuesType} from '../../@types/types';


interface ControlsProps {
    currentType: TypeOfDateType;
    onPointClickHandler: (type: TypeOfDateType) => void;
    dateTypes: UniqueKeyValuesType;
}

export const Controls:FC<ControlsProps> = ({
        currentType,
        onPointClickHandler,
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
        onPointClickHandler(type);
    }
    const counterIncrementHandler = () => {
        let type;
        if(currentIndex === dateTypes.length - 1)  {
            type = dateTypes[0];
        } else {
            type = dateTypes[currentIndex + 1];
        }
        onPointClickHandler(type);
    }

    return (
        <div className={styles.controls}>
            <span className={styles.counter}>0{currentIndex + 1}/0{dateTypes.length}</span>
            <div className={styles.btn_group}>
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