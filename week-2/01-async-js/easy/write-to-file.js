const fs = require('fs')

const text = "Hello this is the text using write file"

fs.writeFile('hello.txt',text,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("writeFile successfully executed")
})