import { algoStrings, algoFunctions, algoTable } from './../utility/constants';
import { makeArray } from './../utility/functions';
import { fisher_yeats } from './shuffle';

export function generateSample(algo:string) {
	var results:any[][] = [];
	var index = algoTable.get(algo);
	if (index !== undefined) {
		let seq = oneAlgoSample(algo, 5, 128, 5);
		seq.forEach((point) => results.push(point));
	}
	else {
		for (let i = 0; i < 6; i++) {
			let seq = oneAlgoSample(algoStrings[i], 10, 120, 10);
			seq.forEach((point) => results.push(point));
		}
	}
	return results;
}

function oneAlgoSample(algo:string, min:number, max:number, step:number) {
	var results:any[][] = [];
	for (let n = min; n <= max; n+=step) {
		var arr = makeArray(n);
		fisher_yeats(arr);
		var newSeq = algoFunctions[algoTable.get(algo)](arr);
		results.push([n, newSeq.length, algo]);
	}
	return results;
}
