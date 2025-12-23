# TicketBoss – Event Ticketing API

## Setup Instructions
1. Install Node.js & MongoDB
2. Clone the repository
3. Run `npm install`
4. Start MongoDB
5. Run `node src/app.js`

## API Endpoints

### POST /reservations
Request:
{
  "partnerId": "abc-corp",
  "seats": 3
}

Responses:
201 Created
409 Conflict
400 Bad Request

### DELETE /reservations/:id
204 No Content
404 Not Found

### GET /reservations
Returns all reservations

### GET /event/summary
Returns event statistics

## Technical Decisions
- Used MongoDB with optimistic concurrency (`version` field)
- Used atomic updates to prevent overselling
- Simple RESTful API design
- Clean separation of concerns
