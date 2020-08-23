import { NORMAL, ACTIVE, COMPARE, PIVOT } from './constants';

export function makeArray(n:number) {
	var ans:number[][] = [];
	for (let i = 1; i <= n; i++) ans.push([i,NORMAL]);
	return ans;
}
export function getColor(state:number) {
	return state===NORMAL?
		"rgb(60,60,120)" : state===ACTIVE?
			"rgb(100,100,255)" : state===COMPARE?
				"red" : state===PIVOT?
					"blue" : "rgb(80,210,80)";
}
export function sorted(arr:number[][]) {
	for (let i = 0; i < arr.length-1; i++) {
		if (arr[i][0] > arr[i+1][0]) return false;
	}
	return true;
}

export function getAlgoColor(algo:string) {
	switch (algo) {
		case 'bSort': return "rgb(255,0,0)";
		case 'iSort': return "rgb(0,220,0)";
		case 'hSort': return "rgb(0,150,255)";
		case 'qSort': return "rgb(255,120,0)";
		case 'mSort': return "rgb(220,0,220)";
		case 'shuffle': return "rgb(15,15,15)";
	}
	return "black";
}