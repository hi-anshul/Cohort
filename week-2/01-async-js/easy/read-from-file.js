const fs = require('fs');

console.log("Before reading file")

fs.readFile('hello.txt','utf-8',(error,data)=>{
    if(error){
        console.log(error)
    }
    console.log(data);
})

let n = 0
for(let i = 0; i<100000000000; i++){
    n+=i;
}

console.log("After calculation")

//Output
// Before reading file
// After calculation
// This is test file