import React, {FC} from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
    children: React.ReactNode,
    style?: React.CSSProperties,
}

const {container} = styles;

export const Container:FC<ContainerProps> = ({children, style}) => {
    return (
        <div className={container} style={style}>
            {children}
        </div>
    );
};