"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphData = void 0;
var graphData = function (data) {
    var lateArray = [];
    var ontimeArray = [];
    for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var late = 0;
        var ontime = 0;
        var absent = 0;
        var date = new Date();
        var totalDays = new Date(date.getFullYear(), parseInt(key), 0).getDate();
        //@ts-ignore
        for (var _c = 0, value_1 = value; _c < value_1.length; _c++) {
            var entry = value_1[_c];
            if (entry.isLate) {
                late++;
            }
            else {
                ontime++;
            }
        }
        lateArray[parseInt(key) - 1] = late;
        ontimeArray[parseInt(key) - 1] = ontime;
        absent = totalDays - (late + ontime);
        console.log(key, absent);
    }
    return { lateArray: lateArray, ontimeArray: ontimeArray };
};
exports.graphData = graphData;
