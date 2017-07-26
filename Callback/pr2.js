let add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        reject(new Error('Loi moi') + '');
      }
      resolve(a + b);
    }, 2000)
  });
}
let devide = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        reject(new Error('Loi moi') + '');
      }
      if(b === 0) {reject(new Error('Chia cho 0'))};
      resolve(a / b);
    }, 2000)
  });
}
let multiply = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number') {
        reject(new Error('Loi moi') + '');
      }
      resolve(a * b);
    }, 2000)
  });
}

// add('4',5)
// .then((res) =>{return add(res,6)})
// .then((res) =>{console.log(res)})
// .catch(err => console.log(err +''));

let tinhDienTich = (a, b, h) =>{
  add(a, b).
  then((res) => {
    return multiply(res, h)
  })
  .then((result) =>{
    return devide(result, 2)
  })
  .then((square) =>{
    console.log('Dien tich hinh thang: ' +  square);
  })
  .catch((err) => {console.log(new Error('Loi'));})  ;
}
tinhDienTich(6,4,5)