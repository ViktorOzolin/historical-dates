import React, {FC, useEffect, useRef} from 'react';
import styles from './Period.module.scss';
import gsap from 'gsap';



interface PeriodProps {
    start: number;
    end: number;
}

const {
    period,
    period__start,
    period__end,
} = styles;


export const Period:FC<PeriodProps> = ({start, end}) => {
    const startRef = useRef<HTMLSpanElement>(null);
    const endRef = useRef<HTMLSpanElement>(null);
    const prevValues = useRef<PeriodProps>({ start: start, end: end});

    useEffect(() => {
       const animation =  gsap.to(prevValues.current, 1, {
            start,
            end,
            ease: 'power2.out',
            onUpdate: () => {
              if (startRef.current && endRef.current) {
                  startRef.current.innerText = `${Math.round(prevValues.current.start)}`
                  endRef.current.innerText = `${Math.round(prevValues.current.end)}`
              }
            }
        })
        return () => {animation.kill()}
    },[start, end])

    return (
        <div className={period}>
            <span className={period__start} ref={startRef}>{start}</span>
            <span className={period__end} ref={endRef}>{end}</span>
        </div>
    );
};