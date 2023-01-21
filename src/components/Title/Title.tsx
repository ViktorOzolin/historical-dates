import React, {FC} from 'react';
import styles from './Title.module.scss';

interface TitleProps {
    children: React.ReactNode;
}

const {
    wrapper,
    title,
} = styles;

export const Title:FC<TitleProps> = ({children}) => {
    return (
        <div className={wrapper}>
            <h1 className={title}>{children}</h1>
        </div>
    );
};