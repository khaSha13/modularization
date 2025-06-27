const envs = process.env;
const featuresList = [];

const ENV_CONCURRENCY = process.env['CONCURRENCY'] || "";

const CONCURRENCY = parseInt(ENV_CONCURRENCY) || 1;

for (const [name, value] of Object.entries(envs)) {

    if (name.includes('_Queue') && value == 'true') {
        featuresList.push({
            name,
            concurrency: CONCURRENCY
        });
    }
}

export {
    featuresList
}
