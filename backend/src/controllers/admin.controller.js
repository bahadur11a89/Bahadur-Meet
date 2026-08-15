import httpStatus from 'http-status';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { Meeting } from '../models/meeting.model.js';

export const getAdminUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password -token -refreshToken').sort({ createdAt: -1 });

  return res.status(httpStatus.OK).json({
    success: true,
    count: users.length,
    users,
    data: users,
  });
});

export const getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalMeetings = await Meeting.countDocuments();
  const activeMeetings = await Meeting.countDocuments({ status: 'live' });

  return res.status(httpStatus.OK).json({
    success: true,
    stats: {
      totalUsers,
      totalMeetings,
      activeMeetings,
    },
  });
});
