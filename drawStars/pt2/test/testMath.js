function draw(){
  let str = " ";
  for(let i = 1; i <= 10; i++){
    for(let j =  1; j <= 10; j++){
      if(i === 1| i === 10| j === 1| j === 10){
         str += "+"
         } else{
            str +=" ";
         }
    }
    str += "</br>"
  }
  return str;
}
 document.write(draw())
