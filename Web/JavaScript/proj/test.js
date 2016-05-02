function Test(name, age) {
    if (!(this instanceof Test)) {
        return new Test();
    }

    this.name = name || 'tazimi';
    this.age = age || 20;
}

Test.prototype.getName = function () {
    return this.name;
}

Test.prototype.getAge = function () {
    return this.age;
}

Test.prototype.setName = function (name) {
    if (this && this.name) {
        this.name = name;
    }
}

Test.prototype.setAge = function (age) {
    if (this && this.age) {
        this.age = age;
    }
}
