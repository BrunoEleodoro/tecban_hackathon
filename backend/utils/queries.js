var mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID
var db = "";
var anySchema = new mongoose.Schema({}, { strict: false });

module.exports = {
    create: create,
    update: update,
    remove: remove,
    read: read,
    checkIfIsEmpty: checkIfIsEmpty,
    removeAll: removeAll,
    setDatabase: function (dbParam) {
        db = dbParam;
    }
}

function checkIfIsEmpty(value) {
    if (value == undefined || value == "" || value == null) {
        return true
    } else {
        return false
    }
}

async function create(body, model_name, collection_name) {

    return new Promise(async function (resolve, reject) {
        if (checkIfIsEmpty(body) || checkIfIsEmpty(model_name) || checkIfIsEmpty(collection_name)) {
            resolve(false)
            return;
        }
        ;
        var AnyObj = mongoose.model(model_name, anySchema, collection_name);
        new AnyObj(body).save();
        resolve(true)
    });
}

async function update(old_id, new_body, collection_name) {
    return new Promise(async function (resolve, reject) {
        if (checkIfIsEmpty(old_id) || checkIfIsEmpty(new_body) || checkIfIsEmpty(collection_name)) {
            resolve(false)
            return;
        }

        var collection = db.collection(collection_name);
        var novo = JSON.parse(JSON.stringify(new_body))
        delete novo._id
        collection.updateOne({ _id: ObjectId(old_id) }, { $set: novo }).then(function (r) {
            resolve(true)
        });
    });
}

function remove(id, collection) {
    return new Promise(async function (resolve, reject) {
        if (checkIfIsEmpty(id) || checkIfIsEmpty(collection)) {
            resolve(false)
            return;
        };
        db.collection(collection).deleteOne({ "_id": ObjectId(id) }).then(function (r) {
            resolve(true)
        });
    })
}

function removeAll(collection) {
    return new Promise(async function (resolve, reject) {
        if (checkIfIsEmpty(collection)) {
            resolve(false)
            return;
        };
        db.collection(collection).deleteMany({}).then(function (r) {
            resolve(true)
        });
    })
}

function read(filter, projectFields = {}, sort = {}, collection) {
    return new Promise(async function (resolve, reject) {
        if (checkIfIsEmpty(filter) || checkIfIsEmpty(collection)) {
            resolve(false)
            return;
        };
        db.collection(collection).find(filter, projectFields).sort(sort).toArray(function (err, dados) {
            if (err) {
                console.log('erro=' + err);
                reject(err)
            }
            else {
                resolve(dados)
            }
        });
    });
}