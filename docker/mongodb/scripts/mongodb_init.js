const userName = process.env['MONGO_USER'];
const password = process.env['MONGO_PASSWORD'];
db.createUser({
    user: userName,
    pwd: password,
    roles: [{
        role: 'readWrite',
        db: 'toptracker'
    }]
});

db.createCollection('temp');