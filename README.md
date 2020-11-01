# TradeCred-Task
Deployed: http://tradecredtask.herokuapp.com/ give the dynos some time to boot up before exploring!
## Quick Start

Create a `.env` file in project directory and put the following details inside that.
```
MONGO_URI= ""
JWT_SECRET= ""
MONGO_DB_NAME= ""
PORT= 5000
```

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```
