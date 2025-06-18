const { LaunchModularizationTracker } = require("../models/LaunchModularizationTracker")

async function updateStatusByJobIdMySql(jobID, status) {
    try {
        console.log(jobID, status);
        
        const tracker = await LaunchModularizationTracker.where({ job_id: jobID }).fetch({ require: true });
        await tracker.save({ status }, { patch: true });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    updateStatusByJobIdMySql
}
