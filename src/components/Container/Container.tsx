import React, {FC} from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
    children: React.ReactNode,
    style?: React.CSSProperties,
}

export const Container:FC<ContainerProps> = ({children, style}) => {
    return (
        <div className={styles.container} style={style}>
            {children}
        </div>
    );
};