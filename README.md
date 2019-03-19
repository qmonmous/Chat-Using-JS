# Chat-JS-Pouch/CouchDB

- JavaScript ES6
- IndexedDB + [PouchDB](https://pouchdb.com/) + [CouchDB](http://couchdb.apache.org/) (no socket.io)
- DigitalOcean server + HTTPS

*PouchDB bi-directional replication to CouchDB. Uses long-poll so not as snappy as WebSocket, but a matter of seconds at most. Can start without an active internet connection and remote socket established.*