console.log(mergeSort([4,7,6], true))


function mergeSort(arr, upToLow)
{
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return merge(mergeSort(left, upToLow), mergeSort(right, upToLow), upToLow);
}

function merge(left, right, upToLow) {
    let result = []

    if (upToLow) {
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
    } else {
        while (left.length && right.length) {
            if (left[0] >= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
    }

    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());

    return result;
}