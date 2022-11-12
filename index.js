const axios = require('axios');
const http = require('http');

const connectionApiFailed = 'Connection to API failed';

class ConnectionApi {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }

    async getServerDynamic() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/dynamic.json`, { timeout: 5000 })
                .then(function (body) {
                    result({ 
                        online: true, 
                        dynamic: body.data
                    });
                })
                .catch(function () {
                    result({ 
                        message: connectionApiFailed, 
                        online: false, 
                        connect: { serverIp: ip, serverPort: port }, 
                        dynamic: { clients: 0, sv_maxclients: 0 } 
                    });
                });
        });
    }

    async getServerConnect() {
        return new Promise((result, reject) => {
            const options = {
                host: this.ip,
                port: this.port,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            http.get(
                options, ({ rawHeaders }) => {   
                    result({ 
                        online: true,
                        cfx: rawHeaders[5],
                        connect: { serverIp: ip, serverPort: port }
                    })
                }
            ).on('error', () => {
                result({ 
                    message: connectionApiFailed, 
                    online: false,
                    connect: { serverIp: ip, serverPort: port }
                });
            }).end()
        });
    }
}

module.exports.ConnectionApi = ConnectionApi;