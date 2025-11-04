// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     instrumentName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     experimentTitle: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     preferredDate: {
//       type: Date,
//       required: true,
//     },
//     durationHours: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Approved", "Rejected"],
//       default: "Pending",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Booking", bookingSchema);
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true, // Index for faster queries
    },
    instrumentName: {
      type: String,
      required: [true, "Instrument name is required"],
      trim: true,
      maxlength: [100, "Instrument name cannot exceed 100 characters"],
    },
    experimentTitle: {
      type: String,
      required: [true, "Experiment title is required"],
      trim: true,
      maxlength: [200, "Experiment title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    preferredDate: {
      type: Date,
      required: [true, "Preferred date is required"],
      validate: {
        validator: function (value) {
          // Ensure date is not in the past
          return value >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Preferred date cannot be in the past",
      },
    },
    durationHours: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 hour"],
      max: [24, "Duration cannot exceed 24 hours"],
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Approved", "Rejected"],
        message: "{VALUE} is not a valid status",
      },
      default: "Pending",
      uppercase: true,
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [500, "Admin notes cannot exceed 500 characters"],
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ preferredDate: 1 });

// Virtual for checking if booking is upcoming
bookingSchema.virtual("isUpcoming").get(function () {
  return this.preferredDate > new Date() && this.status === "APPROVED";
});

// Pre-save middleware to format status
bookingSchema.pre("save", function (next) {
  if (this.status) {
    this.status = this.status.charAt(0).toUpperCase() + this.status.slice(1).toLowerCase();
  }
  next();
});

// Static method to get user's booking statistics
bookingSchema.statics.getUserStats = async function (userId) {
  return this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
};

// Instance method to approve booking
bookingSchema.methods.approve = function (adminId, notes) {
  this.status = "Approved";
  this.reviewedBy = adminId;
  this.reviewedAt = new Date();
  if (notes) this.adminNotes = notes;
  return this.save();
};

// Instance method to reject booking
bookingSchema.methods.reject = function (adminId, notes) {
  this.status = "Rejected";
  this.reviewedBy = adminId;
  this.reviewedAt = new Date();
  if (notes) this.adminNotes = notes;
  return this.save();
};

export default mongoose.model("Booking", bookingSchema);
