export declare function compare<T, U>(var1: T, var2: U): boolean;
export declare function safe<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> | false;
export declare function float(literal: number, fractionDigits?: number): number;
