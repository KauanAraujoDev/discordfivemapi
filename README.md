# DiscordFivemApi
Package to connect FiveM api to Discord JS

** How-to install: **

```
npm i discordfivemapi
```

**NPM:** [npmjs.com/discordfivemapi](https://www.npmjs.com/package/discordfivemapi)
**Support:** [https://discord.gg/dpC3TS4dRk](https://discord.gg/wW565Huet6)

**How-to use :** 
Here is an example to display the number of players online on a server.
(default port is 30120)

```js
const fivem = require('discodfivemapi')
const server = new fivem.Server('YOUR-IP', 'YOUR-PORT')
```

# Requests :
- getServerStatus - Get server status of the server (online/offline).

- getServerDynamic - Get all dynamic server variables.
- getServerResources - Get all resources from server.
- getServerInfo - Get all infos from server.
- getServerHostName - Get hostname from server.
- getServerConnect - Get cfx connect of server.

- getServerPlayers - Returns all players on the server as an array.
- getServerClients - Return count to players on from server.
- getServerMaxClients - Return all slots to server.

# **Example Server Stats** :

```js
const fivem = require('discodfivemapi')
const server = new fivem.Server('000.000.00.00', '30120')

server.getServerConnect().then((data) => { console.log(data.cfx) })
//return https://cfx.re/join/(cfx)
```
