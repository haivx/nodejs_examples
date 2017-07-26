const fs = require('fs');
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
// add(2,'3')
// .then(res => console.log(res),err=> console.log(err))

// fs.readFile(__dirname + '/a.txt', 'utf8', (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// })

// let promiseRead = new Promise((resolve, reject) => {
//   fs.readFile(__dirname + '/b.txt', 'utf8', (err, data) => {
//     if (err) return reject(err);
//     resolve(data);
//   });
// })

// promiseRead.then((data) =>{
//   console.log(data);
// }, (err) =>{console.log(err + '');})

let read = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + filename, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  })
}

read('/a.txt')
.then((data)=>{
  console.log(data);
},(err)=>{
  console.log(err + '');
})

