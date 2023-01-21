import React, {useEffect, useRef, useState} from 'react';

type UseElementWidthType = null | number;

type UseElementReturnType<T> = [React.Ref<T>, UseElementWidthType];

export function useElementWidth<T extends HTMLElement & HTMLDivElement>(): UseElementReturnType<T> {
    const [width, setWidth] = useState<UseElementWidthType>(null);
    const ref = useRef<T | null>(null);

    const observerCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
        const { width } = entries[0].contentRect;
        setWidth(width);
    }

    useEffect(() => {
        const observer = new ResizeObserver(observerCallback);
        const observableValue = ref.current;

        if (observableValue) {
            observer.observe(observableValue);
        } else {
            observer.disconnect();
        }
        return () => {
            if (observableValue) observer.unobserve(observableValue);
        }
    },[ref]);

    return [ref, width];
};