const test1 = { food: null, thing: null, stuff: null };
const keys1 = Object.keys(test1);
const test2 = { food: null, thing: null, stuff: 5 };
const keys2 = Object.keys(test2);
// console.log(typeof keys1);
// console.log(keys1);
// console.log(keys2);
// console.log(typeof keys2);
// console.log(compareKeys(test1, test2));

function compareKeys(a, b) {
	var aKeys = Object.keys(a).sort();
	var bKeys = Object.keys(b).sort();
	return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}
console.log(typeof 2);
console.log(typeof "2");
