const axios = require('axios');
const http = require('http');

const connectionApiFailed = 'Connection to API failed';
const timeout = { timeout: 5000 };

class Server {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }

    async getServerStatus() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/info.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true,
                        status: 'Online'
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false,
                    status: 'Offline'
                });
            });
        });
    }

    async getServerDynamic() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/dynamic.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true, 
                        dynamic: body.data
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false
                });
            });
        });
    }

    async getServerResources() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/info.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true, 
                        resources: body.data.resources
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false
                });
            });
        });
    }

    async getServerInfo() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/info.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true, 
                        server: body.data.vars
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false
                });
            });
        });
    }

    async getServerPlayers() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/players.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true, 
                        players: body.data
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false
                });
            });
        });
    }

    async getServerClients() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/dynamic.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true, 
                        clients: body.data.clients
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false
                });
            });
        });
    }

    async getServerMaxClients() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/dynamic.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true, 
                        sv_maxclients: body.data.sv_maxclients
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false
                });
            });
        });
    }

    async getServerHostName() {
        return new Promise((result, reject) => {
            axios.get(`http://${this.ip}:${this.port}/dynamic.json`, timeout)
                .then(function (body) {
                    result({ 
                        online: true, 
                        hostname: body.data.hostname
                    });
                }).catch(function () {
                result({ 
                    message: connectionApiFailed, 
                    online: false
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
                        connect: { serverIp: this.ip, serverPort: this.port }
                    })
                }
            ).on('error', () => {
                result({ 
                    message: connectionApiFailed, 
                    online: false
                });
            }).end()
        });
    }
}

module.exports.Server = Server;