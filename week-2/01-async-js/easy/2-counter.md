## Counter without setInterval
//using setTimeout() function

let count = 0;

function counter(){
    count++;
    console.log(count)

    setTimeout(() => {
        counter()
    }, 1000);
}

counter();

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.








































































(Hint: setTimeout)