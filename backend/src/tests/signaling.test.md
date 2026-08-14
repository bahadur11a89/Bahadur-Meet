# Phase 4.2 — WebRTC Signaling Testing Checklist

## Socket Connection

| # | Test | Expected |
|---|------|----------|
| 1 | Connect with valid JWT in `socket.auth.token` | Connected, `socket.user` populated |
| 2 | Connect with `Bearer <token>` prefix | Prefix stripped, connected |
| 3 | Connect with token in `socket.handshake.query.token` | Connected (fallback) |
| 4 | Connect with missing token | Rejected: `SOCKET_AUTH: token missing` |
| 5 | Connect with expired JWT | Rejected: `SOCKET_AUTH: invalid or expired token` |
| 6 | Connect with tampered JWT | Rejected: `SOCKET_AUTH: invalid or expired token` |

---

## join-room

| # | Test | Expected |
|---|------|----------|
| 7  | Emit `join-room` with valid `meetingId` | `room-joined` emitted back with `peers: []` |
| 8  | Second user joins same room | First user receives `peer-connected`; second user receives `room-joined` with `peers: [user1]` |
| 9  | Third user joins | Both existing peers receive `peer-connected`; new user gets `peers: [user1, user2]` |
| 10 | Emit `join-room` with non-existent `meetingId` | `socket:error` — Meeting not found |
| 11 | Emit `join-room` for an ended meeting | `socket:error` — Meeting has already ended |
| 12 | Emit `join-room` for a locked meeting | `socket:error` — Meeting is locked by the host |
| 13 | Same user emits `join-room` twice (duplicate) | `socket:error` — Already in this room |
| 14 | Emit `join-room` with missing `meetingId` | `socket:error` — Meeting not found |

---

## offer

| # | Test | Expected |
|---|------|----------|
| 15 | Send valid offer `{ type: "offer", sdp: "..." }` to existing peer | Target receives `offer` with `fromUserId`, `fromSocketId`, `offer` |
| 16 | Send offer with `type: "answer"` | `socket:error` — Invalid offer: type must be 'offer' |
| 17 | Send offer with missing `sdp` | `socket:error` — Invalid offer: sdp must be a non-empty string |
| 18 | Send offer to non-existent `targetUserId` | `socket:error` — Peer not found in room |
| 19 | Send offer as non-object | `socket:error` — Invalid offer: must be an object |

---

## answer

| # | Test | Expected |
|---|------|----------|
| 20 | Send valid answer `{ type: "answer", sdp: "..." }` | Target receives `answer` with `fromUserId`, `fromSocketId`, `answer` |
| 21 | Send answer with `type: "offer"` | `socket:error` — Invalid answer: type must be 'answer' |
| 22 | Send answer with empty `sdp` | `socket:error` — Invalid answer: sdp must be a non-empty string |
| 23 | Send answer to non-existent peer | `socket:error` — Peer not found in room |

---

## ice-candidate

| # | Test | Expected |
|---|------|----------|
| 24 | Send valid ICE candidate object | Target receives `ice-candidate` with `fromUserId`, `candidate` |
| 25 | Send ICE candidate as non-object | `socket:error` — Invalid ICE candidate: must be an object |
| 26 | Send ICE candidate with non-string `candidate` field | `socket:error` — Invalid ICE candidate: candidate field must be a string |
| 27 | Send ICE candidate to non-existent peer | `socket:error` — Peer not found in room |
| 28 | Send multiple ICE candidates in sequence (trickle ICE) | All forwarded in order |

---

## leave-room

| # | Test | Expected |
|---|------|----------|
| 29 | Emit `leave-room` with valid `meetingId` | Remaining peers receive `peer-disconnected` |
| 30 | Last user leaves room | Room deleted from registry |
| 31 | User leaves then rejoins | Treated as fresh join, no duplicate error |

---

## disconnect (transport drop)

| # | Test | Expected |
|---|------|----------|
| 32 | Kill socket connection abruptly | `peer-disconnected` emitted to room; participant removed from registry |
| 33 | Disconnect user who was in no room | No error, no emission |
| 34 | Disconnect last user in room | Room deleted from registry |

---

## Reconnect

| # | Test | Expected |
|---|------|----------|
| 35 | User disconnects and reconnects with same JWT | Can rejoin room with `join-room` |
| 36 | User reconnects with new socketId | Old socketId cleaned up, new one registered |

---

## peer-connected / peer-disconnected (explicit)

| # | Test | Expected |
|---|------|----------|
| 37 | Emit `peer-connected` after ICE completes | Target receives `peer-connected` confirmation |
| 38 | Emit `peer-disconnected` before leaving | Room receives `peer-disconnected` |

---

## Room Registry State

| # | Test | Expected |
|---|------|----------|
| 39 | Check registry after first join | Room exists with 1 participant |
| 40 | Check registry after all leave | Room deleted (size = 0) |
| 41 | Two rooms active simultaneously | Registry holds both independently |

---

## Signal Flow (End-to-End)

```
User A joins room
  → room-joined { peers: [] }

User B joins room
  → User A receives: peer-connected { userId: B }
  → User B receives: room-joined { peers: [A] }

User A sends offer to B
  → User B receives: offer { fromUserId: A, offer: {...} }

User B sends answer to A
  → User A receives: answer { fromUserId: B, answer: {...} }

User A sends ICE candidate to B
  → User B receives: ice-candidate { fromUserId: A, candidate: {...} }

User B sends ICE candidate to A
  → User A receives: ice-candidate { fromUserId: B, candidate: {...} }

WebRTC connection established
  → Both emit peer-connected to each other

User B leaves
  → User A receives: peer-disconnected { userId: B }
  → Room registry updated
```
