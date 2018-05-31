// Update with your config settings.

module.exports = {

    client: 'pg',
    debug: true,
    connection: 'postgres://qoxkyjqonastys:d09d2f56a0fdbe15008c9944b7464536e0dd2a4deb9f7081c09e2ba38934a3db@ec2-54-243-235-153.compute-1.amazonaws.com:5432/d8shhik6c8ht1r',
    migrations: {
        tableName: 'migrations'
    },
    ssl: true
};
