require('dotenv').config({
    path: '../../.env'
});
const { Worker } = require('bullmq');
const { REDIS_CONNECTION: connection } = require('../../configs/redis');
const { featuresList } = require('../../configs/features');
const { pathToFileURL } = require('url');
const QueueManager = require('../../queue/QueueManager');
const { BullMQOtel } = require('bullmq-otel');
require('../../telemetry/consumer.telemetry');

const processorUrl = pathToFileURL(__dirname + '/consumer.js');

featuresList.map(({ name, concurrency }) => {
    const worker = new Worker(
        name,
        processorUrl,
        {
            connection,
            concurrency,
            // settings: {
            //     backoffStrategy: (attemptsMade) => attemptsMade
            // },
            useWorkerThreads: true,
            telemetry: new BullMQOtel("test")
        }
    );

    worker.once('ready', () => {
        console.log(`Worker for ${name} is ready!`);
    });

    worker.on('completed', job => {
        job.log(`${job.id} has completed!`);

        console.log(`${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
        console.error(`${job.id} has failed with ${err.message}`);
    });

    worker.on('error', err => {
        console.error('Worker encountered an error:', err);
    });
});

async function updateJobStatus(feature, status, error, jobID) {
    try {
        console.log(feature, status, error, jobID);
        
        const queue = QueueManager.getQueue(`${feature}_Queue`);

        const failedJobs = await queue.getJobs(['failed'], 0, -1);

        for (const job of failedJobs) {
            const jobKey = job.name;

            console.log(job.data._id, jobID, jobKey);
            

            if (job.data._id == jobID) {
                await job.updateData({
                    ...job.data,
                    error: error,
                    status: status,
                });

                await job.extendLock(jobKey);
                await job.retry();
            }
        }

        return {
            status: 200,
            error: null
        }
    } catch (error) {
        console.error(error);

        return {
            status: 500,
            error
        }
    }

}

module.exports = {
    updateJobStatus
}
