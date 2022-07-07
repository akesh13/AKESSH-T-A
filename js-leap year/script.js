function leapYear(){
    var year = document.getElementById("year").value;
    if((year%4==0) && (year%100! =0) || (year%400==0)){
        alert(year + "is a leap year");
    }else {
        alert(year + "is not a leap year")
    }
  
 }






//  var result; 
//  year = parseInt(document.getElementById("year").value);
//  if (year/400){
//    result = true
//  }
//  else if(year/100){
//    result = false
//  }
//  else if(year/4){
//    result= true
//  }
//  else{
//    result= false
//  }
//  return result