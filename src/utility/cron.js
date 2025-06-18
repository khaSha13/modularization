module.exports.buildCronExpression = (type, time, daysOfWeek = []) => {
    try {
        const [hour, minute] = time.split(':').map(Number);

        switch (type) {
            case 'daily':
                return `${minute} ${hour} * * *`;
            case 'weekly':
                if (!Array.isArray(daysOfWeek) || daysOfWeek.some(d => d < 0 || d > 6)) {
                    throw new Error('Invalid daysOfWeek array (must be 0-6)');
                }
                return `${minute} ${hour} * * ${daysOfWeek.join(',')}`;
            case 'monthly':
                return `${minute} ${hour} 1 * *`;
            case 'yearly':
                return `${minute} ${hour} 1 1 *`;
            case 'repeat':
                return `${minute} ${hour} * * *`;
            default:
                throw new Error('Invalid schedule type');
        }
    } catch (err) {
        console.log("Error inside buildCronExpression", err.message);
        throw new Error(err.message);
    }
}
