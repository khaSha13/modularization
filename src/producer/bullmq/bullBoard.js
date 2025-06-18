const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const QueueManager = require('../../queue/QueueManager');

function setupBullBoard(basePath) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath(basePath);

    createBullBoard({
        queues: QueueManager.getAllQueues().map(q => new BullMQAdapter(q)),
        serverAdapter,
    });

    return serverAdapter;
}

module.exports = setupBullBoard;
