const grpcLibrary = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObj = grpcLibrary.loadPackageDefinition(packageDef)
const todoPackage = grpcObj.todoPackage

const server = new grpcLibrary.Server()

server.bind('0.0.0.0:50051', grpcLibrary.ServerCredentials.createInsecure())

server.addService(todoPackage.Todo.service, {
  createTodo: create,
  readTodos: read,
  SayHello: sayHello,
  readStream: readStream,
})
server.start()

const listTodo = []

// client sent call, callback is server response back.
function create(call, callback) {
  const item = { id: listTodo.length + 1, text: call.request.text }
  listTodo.push(item)
  callback(null, item)
}

function read(call, callback) {
  callback(null, { items: listTodo })
}

function readStream(call, callback) {
  listTodo.forEach((t) => call.write(t))
  call.end()
}

function sayHello(call, callback) {
  //console.log(call)
  callback(null, { message: 'Hello ' + call.request.name })
}
