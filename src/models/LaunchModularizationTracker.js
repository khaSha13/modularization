const { bookshelf } = require('../configs/mysql');

const LaunchModularizationTracker = bookshelf.model('LaunchModularizationTracker', { tableName: 'launch_modularization_tracker_test' });

module.exports = {
    LaunchModularizationTracker
}
