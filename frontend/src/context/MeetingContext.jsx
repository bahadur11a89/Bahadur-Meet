import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';
import { meetingService } from '../services/meeting.service';
import { historyService } from '../services/history.service';
import useApi from '../hooks/useApi';
import { useToast } from '../components/common/ToastProvider';

const MeetingContext = createContext(null);

export const MeetingProvider = ({ children }) => {
    const { showToast } = useToast();

    const [currentMeeting, setCurrentMeeting] = useState(null);
    const [scheduledMeetings, setScheduledMeetings] = useState([]);
    const [meetingHistory, setMeetingHistory] = useState([]);

    // API hooks
    const { request: fetchScheduledMeetingsApi, loading: loadingScheduled, error: errorScheduled } = useApi(meetingService.getAllMeetings);
    const { request: fetchMeetingHistoryApi, loading: loadingHistory, error: errorHistory } = useApi(historyService.getMeetingHistory);
    const { request: createMeetingApi, loading: creatingMeeting, error: createError } = useApi(meetingService.createMeeting);
    const { request: getMeetingDetailsApi, loading: loadingMeetingDetails, error: meetingDetailsError } = useApi(meetingService.getMeetingById);
    const { request: endMeetingApi, loading: endingMeeting } = useApi(meetingService.deleteMeeting); // Assuming deleteMeeting also "ends" it for history

    // --- Actions ---

    const loadScheduledMeetings = useCallback(async (params = { status: 'scheduled' }) => {
        try {
            const response = await fetchScheduledMeetingsApi(params);
            setScheduledMeetings(response.data || []);
        } catch (err) {
            showToast(`Failed to load scheduled meetings: ${err}`, 'error');
        }
    }, [fetchScheduledMeetingsApi, showToast]);

    const loadMeetingHistory = useCallback(async (params = {}) => {
        try {
            const response = await fetchMeetingHistoryApi(params);
            setMeetingHistory(response.data || []);
        } catch (err) {
            showToast(`Failed to load meeting history: ${err}`, 'error');
        }
    }, [fetchMeetingHistoryApi, showToast]);

    const createNewMeeting = useCallback(async (meetingData) => {
        try {
            const response = await createMeetingApi(meetingData);
            showToast('Meeting created successfully!', 'success');
            // Optionally add to scheduledMeetings or navigate to meeting page
            return response.data;
        } catch (err) {
            showToast(`Failed to create meeting: ${err}`, 'error');
            throw err;
        }
    }, [createMeetingApi, showToast]);

    const getMeetingDetails = useCallback(async (meetingId) => {
        try {
            const response = await getMeetingDetailsApi(meetingId);
            setCurrentMeeting(response.data);
            return response.data;
        } catch (err) {
            showToast(`Failed to get meeting details: ${err}`, 'error');
            throw err;
        }
    }, [getMeetingDetailsApi, showToast]);

    const joinMeeting = useCallback(async (meetingId) => {
        // In a real app, this would involve more complex logic (WebRTC setup, etc.)
        // For now, we'll just fetch details and set it as current.
        try {
            const details = await getMeetingDetails(meetingId);
            showToast(`Joined meeting: ${details.title}`, 'success');
            return details;
        } catch (err) {
            showToast(`Failed to join meeting: ${err}`, 'error');
            throw err;
        }
    }, [getMeetingDetails, showToast]);

    const endMeeting = useCallback(async (meetingId) => {
        try {
            await endMeetingApi(meetingId);
            showToast('Meeting ended successfully!', 'success');
            setCurrentMeeting(null); // Clear current meeting state
            // Optionally refresh history or scheduled meetings
        } catch (err) {
            showToast(`Failed to end meeting: ${err}`, 'error');
            throw err;
        }
    }, [endMeetingApi, showToast]);

    const value = useMemo(() => ({
        currentMeeting,
        scheduledMeetings,
        meetingHistory,
        loadingScheduled,
        loadingHistory,
        creatingMeeting,
        loadingMeetingDetails,
        endingMeeting,
        errorScheduled,
        errorHistory,
        createError,
        meetingDetailsError,
        loadScheduledMeetings,
        loadMeetingHistory,
        createNewMeeting,
        getMeetingDetails,
        joinMeeting,
        endMeeting,
        setCurrentMeeting, // Allow direct setting for immediate UI updates if needed
    }), [
        currentMeeting, scheduledMeetings, meetingHistory, loadingScheduled, loadingHistory, creatingMeeting,
        loadingMeetingDetails, endingMeeting, errorScheduled, errorHistory, createError, meetingDetailsError,
        loadScheduledMeetings, loadMeetingHistory, createNewMeeting, getMeetingDetails, joinMeeting, endMeeting
    ]);

    return <MeetingContext.Provider value={value}>{children}</MeetingContext.Provider>;
};

export const useMeetings = () => {
    const context = useContext(MeetingContext);
    if (!context) {
        throw new Error('useMeetings must be used within a MeetingProvider');
    }
    return context;
};

export default MeetingContext;