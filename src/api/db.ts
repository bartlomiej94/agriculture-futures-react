import faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: "fnAEa9l7NtAAw0ZnxmsjolShC0-_RLHZaCEVvP0w"
});

const q = faunadb.query;

export { client, q };