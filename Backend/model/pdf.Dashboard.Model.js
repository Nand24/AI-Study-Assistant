const mongoose = require('mongoose');

const pdfDashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pdf: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'FaFilePdf'
    },
    title: {
      type: String,
      default: 'Pdfs Uploaded'
    }
  },
  pdfAttempted: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'FaFilePdf'
    },
    title: {
      type: String,
      default: 'Pdf Attempted'
    }
  },
  totalQuestionAttempted: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'FaQuestion'
    },
    title: {
      type: String,
      default: 'Total Questions Attempted'
    }
  },
  totalQuestionCorrect: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'FaCheck'
    },
    title: {
      type: String,
      default: 'Total Questions Correct'
    }
  },
  wrong: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'FaTimes'
    },
    title: {
      type: String,
      default: 'Total Questions Wrong'
    }
  },
  accuracy: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'FaPercent'
    },
    title: {
      type: String,
      default: 'Accuracy'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const pdfDashboardModel = mongoose.model('PdfDashboard', pdfDashboardSchema);
module.exports = pdfDashboardModel;
