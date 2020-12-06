/** Dependencies */
// Mongoose
const mongoose = require('mongoose')

/** Page Specific Functions */
// Allow empty string for website
function websiteRequired() {
  let web = this.website
  return typeof web === 'string' ? false : true
}

/** Data Schema */
const ResumeSchema = new mongoose.Schema({
  // Website
  website: { type: String, trim: true, required: websiteRequired },
  // Techs
  techs: { type: mongoose.Schema.Types.ObjectId, ref: "Technology" },
  // Projects
  projects: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  // Status (1 = Published, 0 = Unpublished)
  status: { type: Number, required: true, default: 0 },
  // Creator
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

/** Export */
module.exports = mongoose.model('Resume', ResumeSchema)