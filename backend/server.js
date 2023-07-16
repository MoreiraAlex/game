import express  from 'express';
import {createServer } from 'http'
import cors from 'cors'
import { Server } from 'socket.io';

const app = express();
app.use(cors)
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET"]
    }
});

let messages = []

io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)
    io.emit('serverMessage', messages)
   
    socket.on('clientMessage', (data) => {
        console.log(`Recebi a mensagem do cliente: ${data}`)
        
        const message = {
            userId: socket.id,
            text: data
        }

        messages.push(message)
        io.emit('serverMessage', messages)
    })
    

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`)
    })
 });


server.listen(8000, () => {
    console.log('Rodando na porta 8000...')
});

