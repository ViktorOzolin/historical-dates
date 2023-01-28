import React from 'react';

type methodType<T> = (key: string | number) => React.RefObject<T> | undefined;

type UseDynamicRefsType<T> = {
    getRef: methodType<T>;
    setRef: methodType<T>;
    getAllRefs: (keys: Array<string | number>) => Array<React.RefObject<T> | undefined> | undefined;
}

export function useDynamicRefs<T>(): UseDynamicRefsType<T>{
    const map = new Map();

    const setRef = (key: string | number): React.RefObject<T> | undefined => {
        if (!key) {
            console.warn('The key is required to set the ref!');
        }
        const ref = React.createRef<T>();
        map.set(key, ref);
        return ref;
    }

    const getRef = (key: string | number): React.RefObject<T> | undefined => {
        if (!key) {
            console.warn('The key is required to get the ref!');
        } else {
            return map.get(key);
        }
    }
    const getAllRefs = (keys: Array<string | number>): Array<React.RefObject<T> | undefined> | undefined => {
        if(!keys) {
            console.warn('The keys array is required to get the refs!')
        } else {
            return keys.map(key => getRef(key));
        }
    }

    return {getRef, setRef, getAllRefs};
}