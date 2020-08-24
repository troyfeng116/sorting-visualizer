import { bSort } from './bubbleSort';
import { iSort } from './insertionSort';
import { hSort } from './heapSort';
import { qSort } from './quickSort';
import { mSort } from './mergeSort';
import { fisher_yeats } from './shuffle';
import { makeArray } from './../utility/functions';

const algoStrings = ['bSort', 'iSort', 'hSort', 'qSort', 'mSort', 'shuffle'];
const algorithms = [bSort, iSort, hSort, qSort, mSort, fisher_yeats];
export function generateSample(algo:string) {
	var results:any[][] = [];
	var index = algoStrings.indexOf(algo);
	if (index >= 0) {
		let seq = oneAlgoSample(algo);
		seq.forEach((point) => results.push(point));
	}
	else {
		for (let i = 0; i < 6; i++) {
			let seq = oneAlgoSample(algoStrings[i]);
			seq.forEach((point) => results.push(point));
		}
	}
	return results;
}

function oneAlgoSample(algo:string) {
	var results:any[][] = [];
	for (let n = 10; n <= 120; n+=10) {
		var arr = makeArray(n);
		fisher_yeats(arr);
		var newSeq = algorithms[algoStrings.indexOf(algo)](arr);
		results.push([n, newSeq.length, algo]);
	}
	return results;
}
