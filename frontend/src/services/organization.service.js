import { get, post, put, del } from './apiService';

const API_URL = '/organization';

const getOrganizationDetails = () => get(API_URL);
const getMembers = (params) => get(`${API_URL}/members`, params);
const inviteMember = (invitationData) => post(`${API_URL}/invitations`, invitationData);
const updateMemberRole = (memberId, roleData) => put(`${API_URL}/members/${memberId}`, roleData);
const removeMember = (memberId) => del(`${API_URL}/members/${memberId}`);

export const organizationService = {
    getOrganizationDetails,
    getMembers,
    inviteMember,
    updateMemberRole,
    removeMember,
};