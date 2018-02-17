'use strict';
const express = require('express');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');

const router = express.Router();

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const db = firebase.firestore();

function checkDb(){
    const ref = db.collection('values');
    var docRef = ref.doc('donkey');
    var setDonkey = docRef.set({
        FullName: 'Donkey',
        ContactNo: '+15157083249',
        State: 'Texas',
        Country: 'United States',
        Affiliation: 'Dragon'
    });
}
checkDb();

function getValues(){
    const ref = db.collection('values');
    return ref.get().then(snapshot=> snapshot.docs);
}

/* GET home page. */
router.get('/', (req, res) => {
    getValues().then(values => {
        var vals = [];
        values.forEach(doc=>{
            vals.push(doc.data());
        });
        res.render('index/index', { title: 'Kevin Portfolio', values: vals });
        return;
    }).catch(ex=>{
        console.log(ex);
    });
    
});

module.exports = router;