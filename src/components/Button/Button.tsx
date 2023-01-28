import React, {FC, forwardRef} from 'react';
import {Arrow} from '../../package/elements/icons/arrow';
import styles from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps {
    primary?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
    isNext?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    ref?: React.ForwardedRef<HTMLButtonElement>;
    style?: React.CSSProperties;
}

export const Button:FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
            primary,
            disabled,
            isNext,
            onClick,
            style,
    } = props;

    const buttonClassNames = cn({
        [styles.button]: true,
        [styles.primary]: primary,
        [styles.disabled]: disabled
    });

    return (
        <button
            className={buttonClassNames}
            disabled={disabled}
            onClick={onClick}
            ref={ref}
            style={style}
        >
            <Arrow isNext={isNext} />
        </button>
    );
});