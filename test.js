
(async ()=>{
const u = await require(__dirname+'/index.js')();

var m = u.mysql('test');
m.connect();
})()
