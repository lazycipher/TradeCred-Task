const { Schema, model } = require('mongoose');

const FileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
        type: String
    },
    path: {
        type: String
    },
    size: {
        type: Number
    },
    user: {
        id: {
          type: Schema.Types.ObjectId,
          required: true
        },
        username: {
          type: String,
          required: true
        }
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    rowsCount: {
      type: Number,
      default: 0
    },
    inserted: {
      type: Number,
      default: 0
    },
    duplicatesCount: {
      type: Number,
      default: 0
    },
    otherInvalidCount: {
      type: Number,
      default: 0
    }
});

const File = model('file', FileSchema);

module.exports = File;
