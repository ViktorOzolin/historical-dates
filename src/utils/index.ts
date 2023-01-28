import {DataType, HistoricalDateKey, UniqueKeyValuesType} from '../@types/types';

export function uniqueKeyValues(data: DataType, key: HistoricalDateKey): UniqueKeyValuesType  {
    const array = [];
    const dataLength = data.length;

    for (let i = 0; i < dataLength; i++) {
        const currentKey = data[i][key];
        if (i === 0) {
            array.push(currentKey);
        } else if (array.indexOf(currentKey) === -1) {
            array.push(currentKey);
        }
    }
    return array;
}

export function getPeriod(currentDates: DataType) {
        if (currentDates.length) {
            const sorted = currentDates.sort(
                (a,b) => Number(a.year) - Number(b.year));
            const start = Number(sorted[0].year);
            const end =  Number(sorted[sorted.length - 1].year);
            return ({start, end});
        }
        return ({start: 0, end: 0});
}