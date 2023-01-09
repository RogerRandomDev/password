var {existsSync, readFileSync, writeFileSync} = require('fs');
const { entries } = require('lodash');
const { Entry } = require('yauzl');
const numbers='0123456789'
const lowercase='abcdefghijklmnopqrstuvwxyz'
const uppercase='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const symbols="!@#$%^&*()_+-={}|[]\\/?.,<>\"';:"
var allPasswords={}
var activeToggles=[true,true,true,true]
var passLength=0;var passService="";var passURL="";
//generates file if not already exists
if(!existsSync("./passwords.json")){writeFileSync("./passwords.json",JSON.stringify(allPasswords))}
else{allPasswords=JSON.parse(readFileSync("./passwords.json"))}

function toggle(toChange){activeToggles[toChange]=!activeToggles[toChange]}

function createPassword(lower,upper,sym,num,length,service,url){
    var out=generatePassword(lower,upper,sym,num,length,service,url)
    console.log("Password Generated")
    console.log(out.password)
    savePasswords()
}

//generates password
function generatePassword(lower,upper,sym,num,length,service,url){
    //chooses the valid characters for the generated password
    var charList=""
    if(lower) charList+=lowercase
    if(upper) charList+=uppercase
    if(sym) charList+=symbols
    if(num) charList+=numbers
    var i=0;
    var password=""
    while(i<length){
        i++;
        password+=charList[Math.round(Math.random()*(charList.length-1))]
    }
    var output={password,url,service}
    allPasswords[url]=output
    return output
}

function savePasswords(){
    writeFileSync("./passwords.json",JSON.stringify(allPasswords))
    
}
function loadPasswords(){
    for(let pass of Object.keys(allPasswords)) {
        console.log(pass+" : "+allPasswords[pass].password)
    }
}
function findPass(urlPass){
    console.log(allPasswords[urlPass].password)
}
module.exports = {loadPasswords,savePasswords,createPassword,toggle,generatePassword,findPass}