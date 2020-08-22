export function iSort(arr:number[][]) {
	var sequence = [];
	for (let i = 0; i < arr.length; i++) {
		var toMove = arr[i];
		let j = i-1;
		while (j >= 0 && arr[j][0] > toMove[0]) {
			arr[j+1] = arr[j];
			arr[j] = toMove;
			sequence.push([j,j+1]);
			j--;
		}
	}
	return sequence;
}