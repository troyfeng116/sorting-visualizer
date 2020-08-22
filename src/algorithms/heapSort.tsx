export function hSort(arr:number[][]) {
	var sequence: number[][] = [];
	var size = arr.length;
	for (let i = size-1; i >= 0; i--) {
		heapify(arr,i,size,sequence);
	}
	for (let last = size-1; last > 0; last--) {
		var temp = arr[0];
		arr[0] = arr[last];
		arr[last] = temp;
		sequence.push([0,last,last]);
		heapify(arr,0,last,sequence);
	}
	return sequence;
}
function heapify(arr:number[][],index:number,size:number,seq:number[][]) {
	var maxIndex = index;
	var lChild = 2*index+1;
	var rChild = 2*index+2;
	if (lChild < size && arr[lChild][0] > arr[maxIndex][0]) maxIndex = lChild;
	if (rChild < size && arr[rChild][0] > arr[maxIndex][0]) maxIndex = rChild;
	if (maxIndex !== index) {
		var temp = arr[index];
		arr[index] = arr[maxIndex];
		arr[maxIndex] = temp;
		seq.push([index,maxIndex]);
		heapify(arr,maxIndex,size,seq);
	}
}