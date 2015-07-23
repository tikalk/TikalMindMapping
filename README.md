# TikalMindMapping

This will map Tikal employee expertise, to facilitate 'who can help me?'

## Technological stack  
FrontEnd: `AngularJS` & `ES6`  
BackEnd: `NodeJS` & `OrientDB`

## How to use  
* Install OrientDB  
* Create a folder named `conf/dev` under `server` and inside it create a `conf.js` file.  
  The `conf.js` file contents should be similar to:  
```javascript  
exports.dbConf = {
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'root'
};
```
* Execute the `initDB` node script under `server/scripts` - it will bootstrap the db with the employee data.  
