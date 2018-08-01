const mongoose = require('mongoose');


let jumboSchema = mongoose.Schema({
    winder_lot_id: { type: String, required: true },
    winder_item: { type: String, required: true },
    actual_wt: { type: String, required: true },
    by_prod: { type: String, required: true },
    by_qc: { type: String, required: true },
    df_code: { type: String, required: true },
    fd: { type: String, required: true },
    md: { type: String, required: true },
    bd: { type: String, required: true }
});

let Jumbo = module.exports = mongoose.model('Jumbo', jumboSchema);