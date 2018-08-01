const mongoose = require('mongoose');


let UserDetails = mongoose.Schema({
    prod_date: {type: String, required: true},
    shift: {type: String, required: true},
    user_id: {type: String, required: true},
    shift_engineer: {type: String, required: true},
    rewinder_no: {type: String, required: true},
    winder_lot_query: {type: String, required: true},
    batch_no: {type: String, required: true},
    transaction_type: {type: String, required: true}
});

let userDetails = module.exports = mongoose.model('UserDetails', UserDetails);