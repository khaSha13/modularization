const envs = process.env;
const featuresList = [];

const CONCURRENCY = parseInt(process.env.CONCURRENCY) || 1;

for (const [name, value] of Object.entries(envs)) {
    
    if (name.includes('_Queue') && value == 'true') {
        featuresList.push({
            name,
            concurrency: CONCURRENCY
        });
    }
}

module.exports = {
    featuresList
};
