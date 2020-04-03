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
        }
    }


    /* exec */

    /* redis */
    var redis = require('redis').createClient(params.redis.port, params.redis.host);
    redis.on('error', err => {
        params.debug.output(params.debug.format(new Date(), err));
    });




    return new Promise((resolve, reject) => {
       o.redis = redis;

    });
}
