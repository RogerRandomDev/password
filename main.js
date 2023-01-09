const pass=require('./passwords')
var args=process.argv
args=args.splice(2,999)
var listArgs={}
for(let i=1;i<args.length;i++){
    if(args[i].includes("=")){var arg=args[i].split("=")
    listArgs[arg[0]]=arg[1]}
    else{listArgs[args[i]]=true}
}

switch(args[0]){
    case("list"):pass.loadPasswords();break

    case("find"):if(!listArgs.url){console.log("needs 'url=' arg");break};pass.findPass(listArgs.url);break

    case("create"):
        if(!parseInt(listArgs.length)){console.log("need valid length= arg");break}
        if(listArgs.url==undefined){console.log("needs valid url= arg");break}
        if((listArgs.lower||listArgs.upper||listArgs.symbols||listArgs.numbers)){pass.createPassword(listArgs['lower']!=undefined,listArgs['upper']!=undefined,listArgs['symbols']!=undefined,listArgs['numbers']!=undefined,parseInt(listArgs.length),listArgs.service,listArgs.url)}
        else{console.log("needs at least (1) lower,upper,symbols,number arg to generate password")}
    break
}
