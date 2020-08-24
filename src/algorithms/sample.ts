import { bSort } from './bubbleSort';
import { iSort } from './insertionSort';
import { hSort } from './heapSort';
import { qSort } from './quickSort';
import { mSort } from './mergeSort';
import { fisher_yeats } from './shuffle';
import { makeArray } from './../utility/functions';

const algoStrings = ['bSort', 'iSort', 'hSort', 'qSort', 'mSort'];
const algorithms = [bSort, iSort, hSort, qSort, mSort];
export function generateSample() {
	var results:any[][] = [];
	for (let n = 10; n <= 120; n+=10) {
		var arr = makeArray(n);
		var shuffleSeq = fisher_yeats(arr);
		results.push([n,shuffleSeq.length,'shuffle']);
		for (let i = 0; i < 5; i++) {
			var newArr = arr.slice();
			var newSeq = algorithms[i](newArr);
			results.push([n, newSeq.length, algoStrings[i]]);
		}
	}
	return results;
}