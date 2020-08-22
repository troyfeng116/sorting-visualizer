export function qSort(arr:number[][]) {
	var sequence:number[][] = [];
	qSortAux(arr,0,arr.length-1,sequence);
	return sequence;
}
function qSortAux(arr:number[][], l:number, r:number, sequence:number[][]) {
	if (l >= r) return;
	var splitter = arr[r];
	var m = l;
	for (let i = l; i < r; i++) {
		if (arr[i][0] < splitter[0]) {
			let temp = arr[i];
			arr[i] = arr[m];
			arr[m] = temp;
			sequence.push([i,m,l,r]);
			m++;
		}
	}
	arr[r] = arr[m];
	arr[m] = splitter;
	sequence.push([m,r,l,r]);
	qSortAux(arr,l,m-1,sequence);
	qSortAux(arr,m+1,r,sequence);
}