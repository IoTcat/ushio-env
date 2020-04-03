/*  ushio-env
*
*  By iotcat (https://iotcat.me)
*  MIT Licensed
* 
*/
module.exports = async (o_params) => {

    /* params process */
    var params = {
        redis: {
            host: "redis",
            port: 6379
        },
        mysql: {
            dbKeysDir: '/mnt/config/dbKeys'
        },
        debug: {
            format: (time, content) => {
                return `Ushio-env: ${tool.time.format(time)} :: ${content}`;
            },
            output: console.log,

        }
    };    

	Object.assign(params, o_params);

    /* output obj */
    var o = {};

    /* package import */
    const fs = require('fs');

    /* tool func */
    var tool = {
        time: {
            format: date => {   
                let year=date.getFullYear();
                let mon=date.getMonth()+1;
                let da=date.getDate();
                let h=date.getHours();
                let m=date.getMinutes();
                let s=date.getSeconds();
                return year+'-'+mon+'-'+da+' '+h+':'+m+':'+s;
            }
        },
        log: s => params.debug.output(params.debug.format(new Date(), s)),

    }


    /* exec */

    /* redis */
    var redis = require('redis').createClient(params.redis.port, params.redis.host);
    redis.on('error', err => {
        tool.log(err);
    });

    /* mysql */
    var mysql = alias => {
        let m = require('mysql');
        let s = {};
        let res;
        try{
            s = JSON.parse(fs.readFileSync(params.mysql.dbKeysDir + '/' + alias));
        }catch(e){
            tool.log('In mysql part, cannot read dbKeys from '+params.mysql.dbKeysDir+'/'+alias); 
        }
        try{
            res = m.createConnection(s); 
        }catch(e){
            tool.log('In mysql part, cannot create connection.'); 
        }
        return res;
    };


    return new Promise((resolve, reject) => {
        o.redis = redis;
        o.mysql = mysql;
        
        resolve(o);
    });
}
