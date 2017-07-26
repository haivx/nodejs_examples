/**
 * Created by xuanhai on 20/07/2017.
 */

let square = (a, b, h) => {
    return (a + b) * h / 2;
};
//console.log(square(2,3,2));

let add = (a, b, cb) => {
    setTimeout(() => {
        if (typeof a !== "number" || typeof b !== 'number') {
            return cb(new Error('Tham so phai co kieu number'));
        }
        cb(undefined, a + b);
    }, 1000);
}
let multiply = (a, b, cb) => {
    setTimeout(() => {
        if (typeof a !== "number" || typeof b !== 'number') {
            return cb(new Error('Tham so phai co kieu number'));
        }
        cb(undefined, a * b);
    }, 1000);
}
let devide = (a, b, cb) => {
    setTimeout(() => {
        if (typeof a !== "number" || typeof b !== 'number') {
            return cb(new Error('Tham so phai co kieu number'));
        }
        if (b == 0) return cb(new Error('Chia cho 0'))
        cb(undefined, a / b);
    }, 1000);
}
// add(4,5,(err,result) => {
//     if(err) return console.log(err);;
//     console.log('Ket qua: '+ result);
// })

let dientich = (a, b, h, cb) => {
    add(a, b, (err, result) => {
        if (err) return cb(err);
        multiply(result, h, (err, result) => {
            if (err) return cb(err);
            devide(result, 2, (err, square) => {
                if (err) return cb(err);
                cb(undefined, square);
            })
        })
    })
}
dientich(2, 3, '2', (err, result) => {
    if (err) return console.log(err.toString() );
    console.log(result);
});