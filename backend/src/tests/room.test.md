# Phase 4.3 — Room Management Testing Checklist

## Prerequisites
- Server running on `http://localhost:8000`
- Valid JWT token for at least 3 users (User A = host, User B, User C)
- A meeting created via `POST /api/v1/meetings/create` → save `_id` as `meetingId`
- Socket.IO client connected with `{ auth: { token: "Bearer <jwt>" } }`

---

## 1. Create Room

### Test 1.1 — Host creates room successfully
```
Emit:  room:create  →  { meetingId: "<id>" }
Expect: room-created → { meetingId, hostId, room: { participantCount: 1, locked: false } }
```

### Test 1.2 — Create room with custom maxParticipants
```
Emit:  room:create  →  { meetingId: "<id>", maxParticipants: 5 }
Expect: room-created → { room: { maxParticipants: 5 } }
```

### Test 1.3 — Create room for non-existent meeting
```
Emit:  room:create  →  { meetingId: "000000000000000000000000" }
Expect: socket:error → { message: "Meeting not found" }
```

### Test 1.4 — Create room for ended meeting
```
End meeting via REST, then emit room:create
Expect: socket:error → { message: "Meeting has already ended" }
```

### Test 1.5 — Missing meetingId
```
Emit:  room:create  →  {}
Expect: socket:error → { message: "meetingId is required..." }
```

---

## 2. Join Room

### Test 2.1 — User B joins successfully
```
Emit (User B):  room:join  →  { meetingId: "<id>" }
Expect (User B): room-joined → { meetingId, room, participants: [A, B] }
Expect (User A): user-joined → { userId: B, socketId, participants: [A, B] }
```

### Test 2.2 — User C joins (3 participants)
```
Emit (User C):  room:join  →  { meetingId: "<id>" }
Expect (User C): room-joined → { participants: [A, B, C] }
Expect (User A, B): user-joined → { userId: C }
```

### Test 2.3 — Duplicate join rejected
```
Emit (User B):  room:join  →  { meetingId: "<id>" }  (second time)
Expect: socket:error → { message: "Already in this room" }
```

### Test 2.4 — Join locked room
```
Lock room first (Test 4.1), then:
Emit (User C):  room:join  →  { meetingId: "<id>" }
Expect: socket:error → { message: "Room is locked — no new participants allowed" }
```

### Test 2.5 — Join at max capacity
```
Set maxParticipants: 2, fill room, then:
Emit (User C):  room:join  →  { meetingId: "<id>" }
Expect: socket:error → { message: "Room is at maximum capacity" }
```

### Test 2.6 — Join ended meeting
```
Emit:  room:join  →  { meetingId: "<ended-id>" }
Expect: socket:error → { message: "Meeting has already ended" }
```

---

## 3. Leave Room

### Test 3.1 — Non-host leaves
```
Emit (User B):  room:leave  →  { meetingId: "<id>" }
Expect (all):   user-left   →  { userId: B, newHostId: null, roomDeleted: false }
```

### Test 3.2 — Host leaves (host transfer)
```
Emit (User A):  room:leave  →  { meetingId: "<id>" }
Expect (all):   user-left   →  { userId: A, newHostId: "<User B id>", roomDeleted: false }
```

### Test 3.3 — Last participant leaves (room deleted)
```
Only User A in room. Emit room:leave.
Expect: user-left → { roomDeleted: true }
Registry: room no longer exists
```

---

## 4. Lock / Unlock Room

### Test 4.1 — Host locks room
```
Emit (User A):  room:lock  →  { meetingId: "<id>" }
Expect (all):   room-locked → { meetingId }
```

### Test 4.2 — Non-host tries to lock
```
Emit (User B):  room:lock  →  { meetingId: "<id>" }
Expect: socket:error → { message: "Only the host can perform this action" }
```

### Test 4.3 — Host unlocks room
```
Emit (User A):  room:unlock  →  { meetingId: "<id>" }
Expect (all):   room-unlocked → { meetingId }
```

### Test 4.4 — User joins after unlock
```
After Test 4.3, emit room:join from User C
Expect: room-joined (success)
```

---

## 5. Remove Participant

### Test 5.1 — Host removes User B
```
Emit (User A):  room:remove-user  →  { meetingId: "<id>", targetUserId: "<B id>" }
Expect (User B): user-left → { userId: B, removed: true }
Expect (all):    user-left → { userId: B, removed: true }
```

### Test 5.2 — Non-host tries to remove
```
Emit (User B):  room:remove-user  →  { meetingId: "<id>", targetUserId: "<C id>" }
Expect: socket:error → { message: "Only the host can perform this action" }
```

### Test 5.3 — Remove non-existent participant
```
Emit (User A):  room:remove-user  →  { meetingId: "<id>", targetUserId: "fake-id" }
Expect: socket:error → { message: "Participant not found in room" }
```

---

## 6. End Meeting

### Test 6.1 — Host ends meeting
```
Emit (User A):  room:end-meeting  →  { meetingId: "<id>" }
Expect (all):   room-ended → { meetingId, endedBy: A }
MongoDB: meeting.status = "ended", endedAt set
Registry: room deleted
```

### Test 6.2 — Non-host tries to end
```
Emit (User B):  room:end-meeting  →  { meetingId: "<id>" }
Expect: socket:error → { message: "Only the host can perform this action" }
```

### Test 6.3 — End already-ended meeting
```
Emit room:end-meeting after meeting is ended
Expect: socket:error → { message: "Meeting has already ended" }
```

---

## 7. Disconnect Recovery

### Test 7.1 — Non-host disconnects abruptly
```
Kill User B's socket connection
Expect (all in room): user-left → { userId: B, newHostId: null, roomDeleted: false }
Registry: B removed
```

### Test 7.2 — Host disconnects abruptly (host transfer)
```
Kill User A's socket connection
Expect (all in room): user-left → { userId: A, newHostId: "<next participant id>" }
Registry: A removed, new host assigned
```

### Test 7.3 — Last user disconnects (room cleanup)
```
Kill last socket in room
Expect: room deleted from registry
MongoDB: meeting remains (not auto-ended on disconnect)
```

### Test 7.4 — Reconnect after disconnect
```
User B reconnects with same JWT
Emit room:join → { meetingId }
Expect: room-joined (success, treated as fresh join)
```

---

## 8. Security

### Test 8.1 — Unauthenticated socket
```
Connect without token
Expect: connection rejected — "SOCKET_AUTH: token missing"
```

### Test 8.2 — Expired token
```
Connect with expired JWT
Expect: connection rejected — "SOCKET_AUTH: invalid or expired token"
```

---

## Updated Phase 4 Progress

| Phase | Feature | Status |
|-------|---------|--------|
| 4.1 | Enterprise Socket Server + JWT Auth | ✅ |
| 4.2 | WebRTC Signaling (offer/answer/ICE) | ✅ |
| 4.3 | Room Management (create/join/leave/lock/end) | ✅ |
