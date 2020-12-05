/** Dependencies */
// Mongoose
const mongoose = require('mongoose')

/** Page Specific Functions */
// Allow empty string for name.firstName
function abbreviationRequired() {
  let abbr = this.abbreviation
  return typeof abbr === 'string' ? false : true
}

/** Data Schema */
// Job Schema
const JobSchema = new mongoose.Schema({
  // Name
  name: { type: String, trim: true, required: true },
  // Short Name
  abbreviation: { type: String, trim: true, required: abbreviationRequired },
  // Status (1 = Published, 0 = Unpublished)
  status: { type: Number, required: true, default: 0 },
  // Creator
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

/** Export */
module.exports = mongoose.model('Job', JobSchema)