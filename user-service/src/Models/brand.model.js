const mongoose = require("mongoose");
const shortid = require("shortid");
const AdminBrandSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `BRAND-${shortid.generate()}`
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
    },
    featured: {
        type: String,
    },
    status: {
        type: String,
        enum: ["accept", "reject", "request"],
        default: "accept",
    },
    name: {
        type: String,
        default: "admin"
    },
    created: {
        type: Date,
        default: Date.now,
    }
})
const AdminBrand = mongoose.model('Brand', AdminBrandSchema);
module.exports = {
    AdminBrand
}