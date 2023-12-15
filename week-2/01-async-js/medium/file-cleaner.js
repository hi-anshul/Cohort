//This can be done using async or sync

const fs = require("fs");

const fileRead = async () => {
  let readData = await fs.readFileSync("hello.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    return data
  });

  let readFileToString = readData.toString();
  let newData = readFileToString.replace(/\s+/g, ' ').trim(); 
  console.log(newData)
  
  await fs.writeFile("hello.txt", newData, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("writeFile successfully executed");
  });  

};

fileRead();


