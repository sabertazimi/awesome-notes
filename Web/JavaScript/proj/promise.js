// flyweight pattern(享元模式)
var promise = function () {
	// initialize code;
	var t = new Date();

	promise = function () {
		return t;
	};

    	// 使得第一次调用返回正确结果,保证每次调用的行为保持一致
	return promise();
};

var a = promise(),
	b = promise();

console.log(a === b);
console.log(a);
console.log(b);
