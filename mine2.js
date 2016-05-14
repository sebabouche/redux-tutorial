import webpackDevServer from './11_src/src/webpack-dev-server'
import server from './11_src/src/server'

// Change the port below if port 5050 is already in use for you.
// if port equals X, we'll use X for server's port and X+1 for webpack-dev-server's port
const port = 5050

// Start our webpack dev server...
webpackDevServer.listen(port)
// ... and our main app server.
server.listen(port)

console.log(`Server is listening on http://127.0.0.1:${port}`)
