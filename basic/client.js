const grpcLibrary = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObj = grpcLibrary.loadPackageDefinition(packageDef)
const todoPackage = grpcObj.todoPackage

const client = new todoPackage.Todo('localhost:50051', grpcLibrary.credentials.createInsecure())

// client.sayHello({ name: 'Raphael' }, function (err, response) {
//   console.log('Greeting:', response.message)
// })

// client.readTodos({}, function (err, response) {
//   console.log('reading TODO', response)
// })

// client.createTodo({ id: 36, text: 'Grapes' }, function (err, response) {
//   console.log('creating TODO:', response)
// })

const streamed = client.readStream()
streamed.on('data', function (item) {
  console.log('received', item)
})
streamed.on('end', function (e) {
  console.log('server done')
})
