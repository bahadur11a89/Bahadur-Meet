import httpStatus from 'http-status';
import asyncHandler from '../utils/asyncHandler.js';
import { getMeetingAiAnalysis, generateMeetingAi, saveMeetingTranscript } from '../services/ai.service.js';

export const getMeetingAiController = asyncHandler(async (req, res) => {
  const { meetingId } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!userId) {
    res.status(httpStatus.UNAUTHORIZED);
    throw new Error('Unauthorized access');
  }

  try {
    const analysis = await getMeetingAiAnalysis(meetingId, userId);
    return res.status(httpStatus.OK).json({
      success: true,
      data: analysis,
    });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR);
    throw new Error(err.message || 'Failed to process AI analysis');
  }
});

export const generateMeetingAiController = asyncHandler(async (req, res) => {
  const { meetingId } = req.params;
  const userId = req.user?.id || req.user?._id;

  if (!userId) {
    res.status(httpStatus.UNAUTHORIZED);
    throw new Error('Unauthorized access');
  }

  try {
    const result = await generateMeetingAi(meetingId, userId);
    return res.status(httpStatus.OK).json({
      success: true,
      message: 'AI Summary generated successfully',
      data: result,
    });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR);
    throw new Error(err.message || 'Failed to generate AI analysis');
  }
});

export const saveTranscriptController = asyncHandler(async (req, res) => {
  const { meetingId } = req.params;
  const { lines } = req.body;
  const userId = req.user?.id || req.user?._id;

  if (!userId) {
    res.status(httpStatus.UNAUTHORIZED);
    throw new Error('Unauthorized access');
  }

  try {
    const transcript = await saveMeetingTranscript(meetingId, userId, lines);
    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Transcript saved successfully',
      data: transcript,
    });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR);
    throw new Error(err.message || 'Failed to save transcript');
  }
});
