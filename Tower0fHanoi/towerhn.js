
//Bước 1: Giải quyết thuần Logic thông qua console.log

//Chia bài toán ra 3 class: Class Disk,class Tower và Class GameEngine để chạy chương trình.

  //Khai bao class Disk
class Disk{
  constructor(nameDisks){
    this.name = nameDisks
  }
}

  //Khai bao class tower
class  Tower {
  constructor(nameTowers){
    this.tower = nameTowers
  }
}

  //Khai bao class GameEngine
// class  GameEngine(){
//   constructor(){
//
//     }
//
//     towerOfHanoi(n, ini, fini, aux) {
//         if (n === 1) {
//             console.log('move disk 1 from ' + ini + ' to ' + fini)
//         } else {
//             towerOfHanoi(n - 1, ini, aux, fini);
//             console.log('move disk ' + n + ' from ' + ini + ' to ' + fini)
//             towerOfHanoi(n - 1, fini, aux, ini)
//         }
//     }
// }
  //Khai báo các Instances (hình mẫu) của Đối tượng Disk,Tower,GameEngine và chạy chương trình:

const DisksTower = new Tower("DiskA","DiskB","DiskC");
console.log(DisksTower)
//Bước 2: Thêm biến data cho class GameEngine để lưu lại các bước thực hiện bài toán

//Bước 3: Draw

//Bước 4: Animation