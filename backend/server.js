[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
file:///C:/Users/XPRISTO/Desktop/backend/full-stack-1/backend/server.js:2
const app=express()
          ^

TypeError: express is not a function
    at file:///C:/Users/XPRISTO/Desktop/backend/full-stack-1/backend/server.js:2:11
    at ModuleJob.run (node:internal/modules/esm/module_job:325:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:606:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)

Node.js v20.19.5
[nodemon] app crashed - waiting for file changes before starting...
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
file:///C:/Users/XPRISTO/Desktop/backend/full-stack-1/backend/server.js:1
const express=req('express')
              ^

ReferenceError: req is not defined
    at file:///C:/Users/XPRISTO/Desktop/backend/full-stack-1/backend/server.js:1:15
    at ModuleJob.run (node:internal/modules/esm/module_job:325:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:606:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)

Node.js v20.19.5
[nodemon] app crashed - waiting for file changes before starting...
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
file:///C:/Users/XPRISTO/Desktop/backend/full-stack-1/backend/server.js:1
const express=require('express')
              ^

ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and 'C:\Users\XPRISTO\Desktop\backend\full-stack-1\backend\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at file:///C:/Users/XPRISTO/Desktop/backend/full-stack-1/backend/server.js:1:15
    at ModuleJob.run (node:internal/modules/esm/module_job:325:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:606:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)

Node.js v20.19.5const express=require('express')
const app=express()
const router=express.Router()
const dotenv=require('dotenv')
const cors=require('cors')
const connectDB=require('./config/db')
const PORT=process.env.PORT || 4000
dotenv.config()
connectDB()
app.use(express.json())
app.use(cors())
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})