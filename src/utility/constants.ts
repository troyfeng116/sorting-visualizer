import { bSort } from './../algorithms/bubbleSort';
import { iSort } from './../algorithms/insertionSort';
import { hSort } from './../algorithms/heapSort';
import { qSort } from './../algorithms/quickSort';
import { mSort } from './../algorithms/mergeSort';
import { fisher_yeats } from './../algorithms/shuffle';

export const NORMAL = 0;
export const ACTIVE = 1;
export const COMPARE = 2;
export const PIVOT = 3;
export const SORTED = 4;
export const DELAY = 100;

export const algoStrings = ['bSort', 'iSort', 'hSort', 'qSort', 'mSort', 'shuffle'];
export const algoFunctions = [bSort, iSort, hSort, qSort, mSort, fisher_yeats];
export const algoFullNames = ['Bubble Sort', 'Insertion Sort', 'Heap Sort', 'Quick Sort', 'Merge Sort'];
export const algoTable = new Map();
algoStrings.map((val,index) => algoTable.set(val, index));
