const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "rocketlearningfortest-instance-1.ct0fdbsdyb6a.ap-south-1.rds.amazonaws.com",
        port: 3306,
        user: "techadmin",
        password: "Rl@ece@1234",
        database: "test_v2",
        charset: "utf8mb4",
        multipleStatements: true,
        stream: true,
    },
    pool: {
        min: 0,
        max: 100,
        afterCreate: function (conn, done) {
            conn.query("select 1;", function (err) {
                if (err) {
                    done(err, conn);
                } else {
                    conn.query("select 1;", function (err) {
                        done(err, conn);
                    });
                }
            });
        },
    },
    acquireTimeout: 1000000,
    connectTimeout: 180000,
    idleTimeoutMillis: 180000,
    waitForConnections: true,
});

const bookshelf = require("bookshelf")(knex);

module.exports = { knex, bookshelf };
