const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  locationTest : {
    type: {type: String, default: 'Point'},
    coordinates: [Number]
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});
LocationSchema.index({locationTest:'2dsphere'})
// LocationSchema.index({location:'2dsphere'})

module.exports = mongoose.model('location', LocationSchema);