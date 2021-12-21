import faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: "fnAEa9l7NtAAw0ZnxmsjolShC0-_RLHZaCEVvP0w",
    domain: "db.eu.fauna.com",
});

const q = faunadb.query;

export { client, q };