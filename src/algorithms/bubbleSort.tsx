export function bSort(arr:number[][]) {
	var sequence = [];
	for (let end = arr.length-1; end > 0; end--) {
		for (let i = 0; i < end; i++) {
			if (arr[i][0] > arr[i+1][0]) {
				var temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
				if (i === end-1) sequence.push([i,i+1,i+1]);
				else sequence.push([i,i+1]);
			}
			if (i === end-1) sequence.push([i+1,i+1,i+1]);
		}
	}
	return sequence;
}