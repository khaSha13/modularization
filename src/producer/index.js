// require('dotenv').config({
//     path: "../.env"
// });
// require('../telemetry/producer.telemetry');

// const express = require('express');
// const ProducerService = require('./service/ProducerService');
// const setupBullBoard = require('./bullmq/bullBoard');
// // const { updateJobStatus } = require('./service/consumer.service');

// const app = express();
// app.use(express.json());

// const DASHBOARD_BASE_PATH = process.env.DASHBOARD_BASE_PATH || "/dashboard";
// const bullBoardAdapter = setupBullBoard(DASHBOARD_BASE_PATH);

// app.use(DASHBOARD_BASE_PATH, bullBoardAdapter.getRouter());

// app.post('/produce', async (req, res) => {
//     try {
//         const body = req.body;

//         // TODO: Validation of the body

//         const job = await ProducerService.produceJob(body);

//         return res.status(job.status).json({ message: job.message });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });

// // app.patch('/produce', async (req, res) => {
// //     try {
// //         const body = req.body;

// //         const job = await ProducerService.updateJob(body);

// //         return res.status(200).json({ message: 'Job updated', jobId: job.id });
// //     } catch (error) {
// //         return res.status(500).json({ error: error.message });
// //     }
// // });

// // app.delete('/produce', async (req, res) => {
// //     try {
// //         const { jobKey, feature } = req.body;

// //         await ProducerService.removeJob({ jobKey, feature });

// //         return res.status(200).json({ message: 'Job removed' });
// //     } catch (error) {
// //         return res.status(500).json({ error: error.message });
// //     }
// // });

// // app.patch('/job-status/:job_id', async (req, res) => {
// //     try {
// //         const body = req.body;
// //         const jobID = req.params.job_id;

// //         // TODO: Validation of the body

// //         const job = await updateJobStatus(body.feature, body.response.status, body.response.error, jobID);

// //         return res.status(job.status).json({ message: job.message });
// //     } catch (error) {
// //         return res.status(500).json({ error: error.message });
// //     }
// // });

// app.listen(3000, () => {
//     console.log('Server running on PORT:3000...');
// });


const Redis = require('ioredis');
const redis = new Redis('redis://default:secret@172.25.224.1:6379');

async function scanQueues() {
    let cursor = '0';
    const queueNames = new Set();

    do {
        const [newCursor, keys] = await redis.scan(cursor, 'MATCH', 'bull:*:meta', 'COUNT', 100);
        cursor = newCursor;
        keys.forEach(key => {
            const name = key.split(':')[1];
            queueNames.add(name);
        });
    } while (cursor !== '0');

    console.log(queueNames);
    
    return [...queueNames];
}

scanQueues();
