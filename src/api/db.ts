import faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: "secret-goes-here",
    domain: "db.eu.fauna.com",
});

const q = faunadb.query;

export { client, q };