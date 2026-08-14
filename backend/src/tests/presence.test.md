# Phase 4.4 — User Presence System Testing Checklist

## Prerequisites
- Server running: `http://localhost:8000`
- 3 valid JWT tokens: User A, User B, User C
- Socket.IO client connected with `{ auth: { token: "Bearer <jwt>" } }`
- A live meeting created via REST: save `_id` as `meetingId`

---

## 1. User Connects → Presence ONLINE

### Test 1.1 — Emit presence:online on connect
```
Connect User A socket
Emit:   presence:online  →  {}
Expect (User A): presence:state → { userId: A, status: "online", socketCount: 1 }
Expect (User B, if online): user-online → { userId: A, status: "online" }
MongoDB: user.presence.status = "online", lastSeen updated
```

### Test 1.2 — Connect with device info
```
Emit:   presence:online  →  { device: "desktop" }
Expect: presence:state → { device: "desktop", status: "online" }
```

### Test 1.3 — Invalid device type
```
Emit:   presence:online  →  { device: 123 }
Expect: socket:error → { message: "device must be a string" }
```

---

## 2. Presence Update (AWAY / ONLINE)

### Test 2.1 — Set status to AWAY
```
Emit:   presence:update  →  { status: "away" }
Expect (all online): user-presence-update → { userId: A, status: "away", meetingId: null }
MongoDB: user.presence.status = "away"
```

### Test 2.2 — Set status back to ONLINE
```
Emit:   presence:update  →  { status: "online" }
Expect (all online): user-presence-update → { userId: A, status: "online" }
```

### Test 2.3 — Try to set status to OFFLINE directly (blocked)
```
Emit:   presence:update  →  { status: "offline" }
Expect: socket:error → { message: "status must be one of: online, away" }
```

### Test 2.4 — Try to set status to IN_MEETING directly (blocked)
```
Emit:   presence:update  →  { status: "in_meeting" }
Expect: socket:error → { message: "status must be one of: online, away" }
```

---

## 3. Get Presence

### Test 3.1 — Get presence of online user
```
Emit:   presence:get  →  { userId: "<User B id>" }
Expect: presence:state → { userId: B, status: "online", lastSeen: <date> }
```

### Test 3.2 — Get presence of offline user (DB fallback)
```
User C is not connected.
Emit:   presence:get  →  { userId: "<User C id>" }
Expect: presence:state → { userId: C, status: "offline", lastSeen: <last DB date> }
```

### Test 3.3 — Get presence with missing userId
```
Emit:   presence:get  →  {}
Expect: socket:error → { message: "userId is required" }
```

### Test 3.4 — Get presence of non-existent user
```
Emit:   presence:get  →  { userId: "000000000000000000000000" }
Expect: socket:error → { message: "User not found" }
```

---

## 4. Heartbeat

### Test 4.1 — Valid heartbeat
```
Emit:   presence:heartbeat  →  { timestamp: Date.now() }
Expect: presence:heartbeat  →  { lastSeen: <updated date> }
MongoDB: user.presence.lastSeen updated
```

### Test 4.2 — Stale heartbeat (> 60s drift)
```
Emit:   presence:heartbeat  →  { timestamp: Date.now() - 120000 }
Expect: socket:error → { message: "Heartbeat timestamp is too far from server time" }
```

### Test 4.3 — Invalid timestamp type
```
Emit:   presence:heartbeat  →  { timestamp: "now" }
Expect: socket:error → { message: "timestamp must be a positive number (Unix ms)" }
```

### Test 4.4 — Missing timestamp
```
Emit:   presence:heartbeat  →  {}
Expect: socket:error → { message: "timestamp must be a positive number (Unix ms)" }
```

---

## 5. Join Meeting → Status IN_MEETING

### Test 5.1 — User joins meeting
```
Emit:   presence:join-meeting  →  { meetingId: "<id>" }
Expect (all online): user-presence-update → { userId: A, status: "in_meeting", meetingId: "<id>" }
MongoDB: user.presence.status = "in_meeting", lastActiveMeeting = meetingId
```

### Test 5.2 — Join non-existent meeting
```
Emit:   presence:join-meeting  →  { meetingId: "000000000000000000000000" }
Expect: socket:error → { message: "Meeting not found" }
```

### Test 5.3 — Join ended meeting
```
Emit:   presence:join-meeting  →  { meetingId: "<ended-meeting-id>" }
Expect: socket:error → { message: "Meeting has already ended" }
```

### Test 5.4 — Missing meetingId
```
Emit:   presence:join-meeting  →  {}
Expect: socket:error → { message: "meetingId is required" }
```

---

## 6. Leave Meeting → Status ONLINE

### Test 6.1 — User leaves meeting
```
(After Test 5.1)
Emit:   presence:leave-meeting  →  (no payload)
Expect (all online): user-presence-update → { userId: A, status: "online", meetingId: null }
MongoDB: user.presence.status = "online"
```

---

## 7. Disconnect → Status OFFLINE

### Test 7.1 — Single device disconnect
```
Disconnect User A socket
Expect (all online): user-offline → { userId: A, lastSeen: <date> }
MongoDB: user.presence.status = "offline", lastSeen updated
Registry: User A removed
```

### Test 7.2 — Explicit presence:offline before disconnect
```
Emit:   presence:offline  →  (no payload)
Expect (all online): user-offline → { userId: A, lastSeen: <date> }
```

---

## 8. Multiple Device Support

### Test 8.1 — Same user connects on two devices
```
Connect User A on Device 1 (desktop)
Emit:   presence:online  →  { device: "desktop" }
Expect: presence:state → { socketCount: 1 }

Connect User A on Device 2 (mobile)
Emit:   presence:online  →  { device: "mobile" }
Expect: presence:state → { socketCount: 2 }

Others receive user-online only ONCE (first connection)
```

### Test 8.2 — One device disconnects (user stays ONLINE)
```
Disconnect Device 1 (desktop)
Expect: NO user-offline broadcast (user still has Device 2)
Registry: socketCount = 1, status = "online"
MongoDB: lastSeen updated, status stays "online"
```

### Test 8.3 — Last device disconnects (user goes OFFLINE)
```
Disconnect Device 2 (mobile)
Expect (all online): user-offline → { userId: A, lastSeen: <date> }
Registry: User A fully removed
MongoDB: status = "offline"
```

### Test 8.4 — Reconnect after full disconnect
```
Connect User A again
Emit:   presence:online  →  {}
Expect: presence:state → { socketCount: 1, status: "online" }
Expect (others): user-online → { userId: A }
```

---

## 9. Security

### Test 9.1 — Unauthenticated socket
```
Connect without token
Expect: connection rejected — "SOCKET_AUTH: token missing"
```

### Test 9.2 — Presence events without emitting presence:online first
```
Connect, skip presence:online, emit presence:update
Expect: socket:error (registry returns null, service handles gracefully)
```

---

## Testing Commands (Socket.IO Client)

```js
// Connect
const socket = io("http://localhost:8000", {
  auth: { token: "Bearer <jwt>" }
});

// Go online
socket.emit("presence:online", { device: "desktop" });
socket.on("presence:state", console.log);
socket.on("user-online", console.log);

// Heartbeat (every 25s)
setInterval(() => {
  socket.emit("presence:heartbeat", { timestamp: Date.now() });
}, 25000);

// Join meeting
socket.emit("presence:join-meeting", { meetingId: "<id>" });
socket.on("user-presence-update", console.log);

// Leave meeting
socket.emit("presence:leave-meeting");

// Set away
socket.emit("presence:update", { status: "away" });

// Get someone's presence
socket.emit("presence:get", { userId: "<target-id>" });

// Explicit offline
socket.emit("presence:offline");
```

---

## Updated Phase 4 Progress

| Phase | Feature | Status |
|-------|---------|--------|
| 4.1 | Enterprise Socket Server + JWT Auth | ✅ |
| 4.2 | WebRTC Signaling (offer/answer/ICE) | ✅ |
| 4.3 | Room Management (create/join/leave/lock/end) | ✅ |
| 4.4 | User Presence System (multi-device, heartbeat) | ✅ |
