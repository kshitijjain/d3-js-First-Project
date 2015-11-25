function processFile(inputFile) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);



    rl.on('line', function (line) {
      var row=line.split(",");
      if(row[4]=="Total" && row[5]=="All ages"){
        if(objArray[i]==null){
          var obj={};
          obj.areaName=row[3];
          obj.illiterateMales=parseInt(row[10]);
          obj.illiterateFemales=parseInt(row[11]);
          obj.literateMales=parseInt(row[13]);
          obj.literateFemales=parseInt(row[14]);
          objArray[i]=obj;
         }
        else{
          objArray[parseInt(row[1])-1].illiterateMales=objArray[parseInt(row[1])-1].illiterateMales+parseInt(row[10]);
          objArray[parseInt(row[1])-1].illiterateFemales=objArray[parseInt(row[1])-1].illiterateFemales+parseInt(row[11]);
          objArray[parseInt(row[1])-1].literateMales=objArray[parseInt(row[1])-1].literateMales+parseInt(row[13]);
          objArray[parseInt(row[1])-1].literateFemales=objArray[parseInt(row[1])-1].literateFemales+parseInt(row[14]);
        }
        i++;

      }
    });

    rl.on('close', function (line) {
        console.log('done reading file.');
        counter++;
        i=0;
        if(counter==2) processFile('IndiaSC2011.csv');
        else if(counter==3) processFile('IndiaST2011.csv');
        else fs.writeFile("part.json",JSON.stringify(objArray,null,2));
    });
}

var i=0;
var counter=1;
var objArray=[];
processFile('India2011.csv');
