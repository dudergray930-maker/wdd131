console.log("Hello, World!");

function double(num) {
    return num * 2;
}

// function expression
const double2 = function(num) {
    return num * 2;
}

const double3 = (num) => {
    return num * 2;
}

function modifyList(list, callback) {
    list.forEach(callback)
}

modifyList([1, 2, 3], function(num) { return num * 2; });