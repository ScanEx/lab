const fastify = require('fastify')({
    logger: true
});

const path = require('path');


const rows = require('./ls8.json');
//const rows = require('./ls81.json'); // json уменьшенный

//использование массива без буффера, меньше на >100 kb

var i =0;
var arr = [];
while(i < rows.length)
{
    const sceneid = rows[i].sceneid.toString();
    const geojson = rows[i].geojson;
    arr.push(sceneid);
    arr.push(geojson);  
    i+=1;  
}

/*
var arr = [];
for (var i in rows){
    const sceneid = rows[i].sceneid;
    const geojson = rows[i].geojson;
    arr.push(sceneid);
    arr.push(geojson);       
}
*/

//костыли́
/*
var j = 0;
var js = [];
while(j < arr.length)
{
    const obj1 = {sceneid: arr[j], geojson: arr[j+1]};
    js.push(obj1);
    j=j+2;
}
const response = JSON.stringify(js);
*/

//использование ArrayBuffer - проигрышь в 11 кб
/*
const buffer = new ArrayBuffer(rows.length);
for (var i in rows){
    const obj = {sceneid: rows[i].sceneid, geojson: rows[i].geojson,};
    const blob = Buffer.from(JSON.stringify(obj));
    buffer[i]= obj;
}
*/

//создание строки через конкатинацию. меньше на 2 кб

/*
var buf = Buffer.from('');
for (var i in rows){
    const obj = {sceneid: rows[i].sceneid, geojson: rows[i].geojson,};
    const blob = Buffer.from(JSON.stringify(obj));
    const totalLength = buf.length + blob.length;
    buf = Buffer.concat([buf, blob], totalLength);
}
*/

//создание объекта из строки

/*
const obj = {sceneid: rows[0].sceneid, geojson: rows[0].geojson};
const blob = Buffer.from(JSON.stringify(obj));
const text = Buffer.from(blob);
*/

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),    
});

fastify.get('/layer', (req, res) => {
    //return rows;    //43.9 mb 3.64 sec (326kb)
    return arr; // 38.3 MB 3.26 sec (326kb)
    //return response; // 43.5 mb 2.26 sec
});


const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();