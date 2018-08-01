const mongoose = require('mongoose');


let jumboBreaks = mongoose.Schema({
    width: {type: String, required: true},
    item_code: {type: String, required: true},
    destination: {type: String, required: true},
    dia: {type: String, required: true},
    weight: {type: String, required: true},
    qchk: {type: String, required: true},
    qcstat: {type: String, required: true},
    dfcode: {type: String, required: true},
    qc_dest: {type: String, required: true},
    fd: {type: String},
    md: {type: String},
    bd: {type: String},
    lot_number: {type: String, required: true},
    remarks: {type: String, required: true},
    jumbo_db_id: {type: String, required: true},
    jumbo_lot_id: {type: String, required: true}
});

let JumboBreaks = module.exports = mongoose.model('JumboBreaks', jumboBreaks);