const { EventEmitter } = require('eventemitter3');

class SSEManager {
    constructor() {
        this.connections = new Map();
        this.emitter = new EventEmitter();
    }

    addConnection(userId, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');

        const connection = { userId, res };

        this.connections.set(userId, connection);

        res.on('close', () => {
            this.connections.delete(userId);
        });

        return connection;
    }

    sendNotification({ sender, receiver, message, date }) {
        const payload = {
            sender,
            receiver,
            message,
            date: date || new Date().toISOString()
        };

        this.connections.forEach((connection) => {
            if (connection.userId === receiver) {
                connection.res.write(`data: ${JSON.stringify(payload)}\n\n`);
            }
        });
    }

    on(event, listener) {
        this.emitter.on(event, listener);
    }

    off(event, listener) {
        this.emitter.off(event, listener);
    }

    emit(event, payload) {
        this.emitter.emit(event, payload);
    }
}

const sseManager = new SSEManager();

module.exports = sseManager;
