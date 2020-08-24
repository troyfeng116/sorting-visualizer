import { algoStrings, algoFunctions, algoTable } from './../utility/constants';
import { makeArray } from './../utility/functions';
import { fisher_yates } from './shuffle';

export function generateSample(algo:string) {
	var results:any[][] = [];
	var index = algoTable.get(algo);
	if (index !== undefined) {
		let seq = oneAlgoSample(algo, 5, 128, -1);
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
	for (let n = min; n <= max; n += step<0? Math.floor(Math.random()*5)+3 : step) {
		var arr = makeArray(n);
		fisher_yates(arr);
		var newSeq = algoFunctions[algoTable.get(algo)](arr);
		results.push([n, newSeq.length, algo]);
	}
	return results;
}
