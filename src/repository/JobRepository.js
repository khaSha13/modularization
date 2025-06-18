const { Job } = require("../configs/mongo");
const TimeUtils = require("../utility/time");

class JobRepository {
    async getJobByJobKey(jobKey) {
        const jobQuery = {
            jobKey: jobKey,
            deleted_at: null
        };

        const job = await Job.findOne(jobQuery);

        return job;
    }

    async getJobById(_id) {
        // TODO: set deleted_at null
        const job = await Job.findById(_id);

        return job;
    }

    async insertJob(data) {
        const job = await Job.insertOne({
            ...data,
            created_at: TimeUtils.getCurrentUTCTime().toDate(),
            updated_at: TimeUtils.getCurrentUTCTime().toDate(),
            deleted_at: null
        });

        return job;
    }

    async updateJobById(_id, jobKey, scheduledTimeZone, payload, cronExpression) {
        const job = await Job.findByIdAndUpdate(
            { _id: _id },
            {
                jobKey,
                scheduledTimeZone,
                payload,
                cronExpression,
                updated_at: TimeUtils.getCurrentUTCTime().toDate()
            }
        );

        return job;
    }

    async removeJobById(id) {
        const job = await Job.findByIdAndUpdate(
            { _id: id },
            { deleted_at: TimeUtils.getCurrentUTCTime().toDate() }
        );

        return job;
    }

    async removeJobByJobKey(jobKey) {
        const job = await Job.deleteOne({
            jobKey
        });

        return job;
    }

}

module.exports = new JobRepository();
