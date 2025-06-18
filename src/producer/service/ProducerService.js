const JobScheduler = require('../bullmq/JobScheduler.js');
const JobRespository = require('../../repository/JobRepository');
const { buildCronExpression } = require('../../utility/cron');

class ProducerService {
    async produceJob(featuresData) {
        const { feature_configs: featureConfigs } = featuresData;

        const launchID = featuresData.launch_id;
        const feature = featureConfigs.automated_feature;
        const featurePayload = featureConfigs.payload;

        for (let [interventionType, interventionTypePayload] of Object.entries(featurePayload)) {
            const executionSchedule = interventionTypePayload.execution_schedule;
            const scheduledAt = executionSchedule.time;
            const scheduledType = executionSchedule.type;

            const cronExpression = buildCronExpression(scheduledType, scheduledAt);

            const jobID = `${launchID}-${interventionType}-${scheduledAt}`;

            const dataToBeInserted = {
                launch_id: featuresData.launch_id,
                feature_configs: featureConfigs
            }

            try {
                // TODO: Check in DB whether this jobID already exists...
                // const isJobExists = await JobRespository.getJobByJobKey(jobID);

                // if (isJobExists) {
                //     return {
                //         status: 409,
                //         message: "Job with the same key already exists",
                //     };
                // }

                const insertedJob = await JobRespository.insertJob(dataToBeInserted);

                if (!insertedJob) {
                    return {
                        status: 500,
                        message: "Couldn't able to insert the job",
                    };
                }

                await JobScheduler.upsertJob({
                    jobID,
                    feature,
                    _id: insertedJob._id,
                    cronExpression
                });

                return {
                    status: 201,
                    message: "Job scheduled successfully",
                };
            } catch (error) {
                console.error('Error producing job:', error);
                throw error;
            }
        }
    }

    // async removeJob({ jobKey, feature }) {
    //     return JobScheduler.removeJob({ jobKey, feature });
    // }

    // async updateJob({ jobKey, feature, _id, cronExpression }) {
    //     return JobScheduler.updateJob({ jobKey, feature, _id, cronExpression });
    // }
}

module.exports = new ProducerService();
