import { get, post, put, del } from './apiService';

const API_URL = '/meetings';

const getAllMeetings = (params) => get(`${API_URL}/history`, params);
const getMeetingById = (id) => get(`${API_URL}/${id}`);
const createMeeting = (meetingData) => post(`${API_URL}/create`, meetingData);
const joinMeeting = (data) => post(`${API_URL}/join`, data);
const endMeeting = (id) => put(`${API_URL}/end/${id}`);
const leaveMeeting = (id) => del(`${API_URL}/leave/${id}`);
const updateMeeting = (id, meetingData) => put(`${API_URL}/${id}`, meetingData);

const getMeetingAi = (id) => get(`${API_URL}/${id}/ai`);
const generateMeetingAi = (id) => post(`${API_URL}/${id}/ai/generate`);

export const meetingService = {
    getAllMeetings,
    getMeetingById,
    createMeeting,
    joinMeeting,
    endMeeting,
    leaveMeeting,
    updateMeeting,
    getMeetingAi,
    generateMeetingAi,
};