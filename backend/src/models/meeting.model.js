import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema(
  {
    meetingCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      default: "Untitled Meeting",
    },

    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    password: {
      type: String,
      default: "",
    },

    isPasswordProtected: {
      type: Boolean,
      default: false,
    },

    waitingRoom: {
      type: Boolean,
      default: true,
    },

    waitingQueue: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isLocked: {
      type: Boolean,
      default: false,
    },

    isChatDisabled: {
      type: Boolean,
      default: false,
    },

    screenSharePermission: {
      type: Boolean,
      default: true,
    },

    recordingPermission: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["scheduled", "live", "ended"],
      default: "live",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
    },

    ai: {
      status: {
        type: String,
        enum: ["NOT_CONFIGURED", "NO_TRANSCRIPT", "PROCESSING", "COMPLETED", "FAILED"],
        default: "NOT_CONFIGURED",
      },
      transcript: [
        {
          sender: String,
          text: String,
          timestamp: String,
        },
      ],
      summary: {
        type: String,
        default: "",
      },
      keyDecisions: [
        {
          type: String,
        },
      ],
      actionItems: [
        {
          text: String,
          done: { type: Boolean, default: false },
        },
      ],
      generatedAt: {
        type: Date,
      },
      error: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

meetingSchema.index({ host: 1, createdAt: -1 });
meetingSchema.index({ participants: 1, createdAt: -1 });
meetingSchema.index({ status: 1 });

const Meeting = mongoose.model("Meeting", meetingSchema);

export { Meeting };