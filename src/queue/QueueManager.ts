// import { Queue } from "bullmq";
// import { BullMQOtel } from "bullmq-otel";
// import { REDIS_CONNECTION } from "../configs/redis";

// class QueueManager {
//     private queues: Record<string, Queue>;

//     private constructor() {
//         if (!REDIS_CONNECTION) {
//             throw new Error('REDIS_CONNECTION not set');
//         }

//         this.queues = {};

//         if (typeof featuresList !== 'undefined') {
//             featuresList.forEach(feature => {
//                 const queueName = feature.name;
//                 this.createQueue(queueName);
//             });
//         }

//         QueueManager.instance = this;
//         return this;
//     }

//     createQueue(queueName) {
//         if (this.queues[queueName]) {
//             console.warn(`Queue "${queueName}" already exists.`);
//             return this.queues[queueName];
//         }

//         console.log(`Creating queue: ${queueName}`);

//         const queue = new Queue(queueName, {
//             connection: REDIS_CONNECTION,
//             telemetry: new BullMQOtel("test")
//         });

//         this.queues[queueName] = queue;
//         return queue;
//     }

//     getQueue(featureName) {
//         const queue = this.queues[featureName];
//         if (!queue) {
//             throw new Error(`Queue for feature "${featureName}" does not exist`);
//         }
//         return queue;
//     }

//     getAllQueues() {
//         return Object.values(this.queues);
//     }

//     addQueue(featureName) {
//         return this.createQueue(featureName);
//     }
// }

// module.exports = new QueueManager();
