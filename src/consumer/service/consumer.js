const { updateStatusByJobIdMySql } = require("../../repository/LaunchModularizationTrackerRepository");

module.exports = async (job) => {
    const { _id, status, error } = job.data;
    switch (status) {
        // TODO: Update the job status in the db
        case "SUCCESS":
            await updateStatusByJobIdMySql(_id, status);
            job.log("SUCCESS");

            break;

        // TODO: Fetch the latest data using _id and also update the job status in the db
        case "SCHEDULED":
            // await delay(10000);
            // throw new Error("No response received");
            break;

        // TODO: Update the job status in the db
        case "FAILED":
            await updateStatusByJobIdMySql(_id, status);
            throw new Error(error);

        default:
            break;
    }
};
