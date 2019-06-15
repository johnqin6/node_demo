
/**
 * 补零
 * @param {number} val 
 */
function fillZero(val) {
    return val > 9 ? val : '0' + val;
}
/**
 * 转换时间格式
 * @param {*time} val 时间
 * @param {string} split 分隔符
 * @param {number} bit 位数 1：年，2：年月，3：年月日，4：年月日时，5：年月日时分 6：年月日时分秒
 */
function formatime(val, split, bit) {
    bit = bit || 5;
    let date = new Date(val);
    let year = date.getFullYear();
    let month = fillZero(date.getMonth());
    let day = fillZero(date.getDate());
    let hours = fillZero(date.getHours());
    let minutes = fillZero(date.getMinutes());
    let seconds = fillZero(date.getSeconds());
    switch(bit){
        case 1:
            return year;
        case 2:
            return year + split + month;
        case 3:
            return year + split + month + split + day;
        case 4:
            return year + split + month + split + day + ' ' + hours;
        case 5:
            return year + split + month + split + day + ' ' + hours + ':' + minutes;
        case 6: 
            return year + split + month + split + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
}
exports.formatime = formatime;