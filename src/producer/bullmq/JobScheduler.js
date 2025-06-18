const QueueManager = require('../../queue/QueueManager');

class JobScheduler {
    async upsertJob({ jobID, feature, _id, cronExpression }) {
        const queue = QueueManager.getQueue(`${feature}_Queue`);

        if (!queue) {
            throw new Error(`Queue for feature ${feature} does not exist`);
        }

        const resp = await queue.upsertJobScheduler(
            jobID,
            {
                pattern: cronExpression
            },
            {
                name: jobID,
                data: {
                    _id,
                    status: "SCHEDULED"
                },
                // opts: {
                //     attempts: 5,
                //     backoff: {
                //         type: 'exponential',
                //         delay: 10000,
                //     }
                // }
            },
        );

        if (!resp || !resp.id) {
            throw new Error('Job was not created properly');
        }

        return resp;
    }

    // async removeJob({ jobKey, feature }) {
    //     const queue = QueueManager.getQueue(feature);
    //     const result = await queue.remove(jobKey);

    //     if (!result) {
    //         throw new Error('Job was not removed properly');
    //     }

    //     return result;
    // }

    // async updateJob({ jobKey, feature, _id, cronExpression }) {
    //     await this.removeJob({ jobKey, feature });

    //     return this.upsertJob({ jobKey, feature, _id, cronExpression });
    // }
}

module.exports = new JobScheduler();
