export interface IHistoricalDates {
    id: number;
    type: string;
    year: string;
    description: string;
}

export type DataType = Array<IHistoricalDates>;

export type HistoricalDateKey = 'id' | 'type' | 'year' | 'description';

export type UniqueKeyValuesType = Array<string | number>;

export type CurrentTypeStateType = string | number;

export interface IPeriod {
    prev: number;
    next: number;
}
