# Backend — NestJS REST API

A secure, validated REST API for sentiment feedback management built with NestJS, TypeORM, and SQLite.

---

## Overview

This backend provides:

- **REST API** for CRUD operations on sentiments
- **Input Validation** using class-validator and class-transformer
- **Security Hardening** with Helmet and rate limiting
- **Error Handling** with custom exception filters
- **Response Transformation** using interceptors
- **Swagger Documentation** for API endpoints

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run start:dev
```

The API runs on **http://localhost:3000**

### Production Build

```bash
npm run build
npm run start:prod
```

---

## Project Structure

```
src/
├── main.ts                              # Bootstrap & server startup
├── app.module.ts                        # Root module
│
├── config/
│   └── app.config.ts                   # App configuration (ports, env vars)
│
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts    # Global exception handling
│   └── interceptors/
│       └── transform.interceptor.ts    # Response transformation
│
└── sentiments/                         # Sentiments feature module
    ├── sentiments.module.ts            # Module definition
    ├── sentiments.controller.ts        # HTTP route handlers
    ├── sentiments.service.ts           # Business logic
    ├── sentiment.entity.ts             # TypeORM entity
    └── dto/
        ├── create-sentiment.dto.ts     # Request validation DTO
        └── sentiment-response.dto.ts   # Response DTO
```

---

## API Endpoints

### Sentiments

#### Get All Sentiments

```http
GET /sentiments
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Great experience!",
      "createdAt": "2026-04-18T10:30:00Z"
    }
  ],
  "statusCode": 200,
  "message": "success"
}
```

#### Create Sentiment

```http
POST /sentiments
Content-Type: application/json

{
  "rating": 4,
  "comment": "Good service"
}
```

**Request Validation:**

- `rating` (number): Required, must be between 1 and 5
- `comment` (string): Required, max length 500 characters

**Response (201 Created):**

```json
{
  "data": {
    "id": 1,
    "rating": 4,
    "comment": "Good service",
    "createdAt": "2026-04-18T10:30:00Z"
  },
  "statusCode": 201,
  "message": "success"
}
```

#### Error Response (400 Bad Request)

```json
{
  "statusCode": 400,
  "message": ["rating must not be less than 1", "comment should not be empty"],
  "error": "Bad Request"
}
```

---

## Configuration

### Environment Variables

Create a `.env` file in the backend root (optional, sensible defaults provided):

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_PATH=./data/sentiment.db
```

See [src/config/app.config.ts](src/config/app.config.ts) for available configuration options.

---

## Features

### ✅ Input Validation

- Automatic DTO validation using `class-validator`
- Typed request/response DTOs for type safety
- Returns detailed validation error messages

### ✅ Security

- **Helmet** — Sets security HTTP headers
- **Rate Limiting** — Throttles requests per IP (default: 5 requests/10 seconds)
- **Input Sanitization** — Class-transformer removes unknown properties
- **CORS** — Configured for frontend communication

### ✅ Error Handling

- Global exception filter for consistent error responses
- Detailed error messages for debugging
- Proper HTTP status codes (400, 404, 500, etc.)

### ✅ Response Transformation

- Global interceptor transforms all responses to consistent format:
  ```json
  {
    "data": {},
    "statusCode": 200,
    "message": "success"
  }
  ```

### ✅ Persistence

- SQLite database for lightweight data storage
- TypeORM ORM for type-safe database queries
- Automatic timestamp tracking (createdAt)

---

## Available Scripts

| Command              | Description                         |
| -------------------- | ----------------------------------- |
| `npm run start`      | Start the application               |
| `npm run start:dev`  | Start with auto-reload (watch mode) |
| `npm run start:prod` | Start production build              |
| `npm run build`      | Compile TypeScript to JavaScript    |
| `npm run lint`       | Run ESLint (with auto-fix)          |
| `npm run format`     | Format code with Prettier           |

---

## Testing

Currently, unit tests can be added using Jest. To set up:

```bash
npm install --save-dev @nestjs/testing jest ts-jest
```

Then create test files alongside source files (e.g., `sentiments.service.spec.ts`).

---

## Modules

### SentimentsModule

Provides CRUD operations for sentiment feedback:

- **Controller** — HTTP request handlers
- **Service** — Business logic
- **Entity** — Database schema definition
- **DTOs** — Request/response validation

---

## Database

### SQLite

- File-based, zero-configuration database
- Stored at `./data/sentiment.db` (created automatically)
- TypeORM handles schema management

### Entity: Sentiment

```typescript
- id: number (Primary Key, Auto-increment)
- rating: number (1-5)
- comment: string (max 500 chars)
- createdAt: Date (Auto-generated)
```

---

## Debugging

### Enable Debug Mode

Set environment variable:

```bash
DEBUG=* npm run start:dev
```

### Common Issues

**Port 3000 already in use:**

```bash
# Use a different port
PORT=3001 npm run start:dev
```

**Database locked error:**

```bash
# Remove the database and restart
rm -rf data/
npm run start:dev
```

---

## Production Deployment

### Build

```bash
npm run build
```

### Run

```bash
npm run start:prod
```

### Environment

Ensure proper environment variables are set on the production server:

```bash
PORT=3000
NODE_ENV=production
DATABASE_PATH=/var/lib/app/sentiment.db
```

---

## License

MIT
