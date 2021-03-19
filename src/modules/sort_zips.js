const fs = require('fs');
const zips = require('./mo_zipcodes.json');

//~ console.log("sorting zips");
//~ zips.sort((a, b) => Number(a.fields.zip) - Number(b.fields.zip));

//~ console.log("printing zips")
//~ for(item of zips){
    //~ console.log(item.fields.zip)
//~ }

//~ console.log("saving zips")
//~ const jsonString = JSON.stringify(zips)
//~ fs.writeFile('./mo_zipcodes.json', jsonString, err => {
    //~ if (err) {
        //~ console.log('Error writing file', err)
    //~ } else {
        //~ console.log('Successfully wrote file')
    //~ }
//~ })

const query = 73104;

function zips_binary_search (arr, x) { 
   
    let start=0, end=arr.length-1; 
    let count = 0      
    // Iterate while start not meets end 
    while (start<=end){ 
        // Find the mid index 
        let mid=Math.floor((start + end)/2); 
   
        // If element is present at mid, return True 
        if (arr[mid].fields.zip==x) return mid; 
  
        // Else look in left or right half accordingly 
        else if (Number(arr[mid].fields.zip) < x)  
             start = mid + 1; 
        else
             end = mid - 1; 
    } 
   
    return false; 
} 

console.log(zips_binary_search(zips, query))
