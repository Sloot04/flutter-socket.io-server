const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Pescado rabioso'));
bands.addBand(new Band('v8'));


//Mensajes de Sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('emitir-mensaje', (payload) => {

        //io.emit('nuevo-mensaje', payload); -- emite a todos;
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos a el que lo emitió;
    });

});