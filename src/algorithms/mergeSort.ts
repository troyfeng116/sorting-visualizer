export function mSort(arr:number[][]) {
	var sequence:any[][] = [];
	mSortAux(arr,0,arr.length-1,sequence);
	return sequence;
}
function mSortAux(arr:number[][],l:number,r:number,sequence:any[][]) {
	if (l >= r) return;
	var m = Math.floor((l+r)/2);
	mSortAux(arr,l,m,sequence);
	mSortAux(arr,m+1,r,sequence);
	merge(arr,l,r,sequence);
}
function merge(arr:number[][],l:number,r:number,sequence:any[][]) {
	var m = Math.floor((l+r)/2);
	var lIndex = l;
	var rIndex = m+1;
	while (lIndex <= m && rIndex <= r) {
		if (arr[lIndex][0] <= arr[rIndex][0]) {
			lIndex++;
			sequence.push([arr.slice(),l,r,lIndex,rIndex]);
		}
		else {
			var temp = arr[rIndex];
			var i = rIndex;
			while (i !== lIndex) {
				arr[i] = arr[i-1];
				i--;
			}
			arr[lIndex] = temp;
			lIndex++;
			m++;
			rIndex++;
			if (rIndex <= r) sequence.push([arr.slice(),l,r,lIndex,rIndex]);
			else sequence.push([arr.slice(),l,r,lIndex,rIndex-1]);
		}
	}
}