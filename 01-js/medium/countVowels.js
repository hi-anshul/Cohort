/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    ssr = str.toLowerCase().split('');

    let count = 0;
    for (let i = 0; i < ssr.length; i++) {
     if (ssr[i]=='a' || ssr[i]=='e' || ssr[i]=='i' || ssr[i]=='o' || ssr[i]=='u') {
      count = count+1;  
     }
    }
    return count;
}

module.exports = countVowels;