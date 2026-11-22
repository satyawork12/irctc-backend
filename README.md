This project aims to build a railway booking backend using microservices architecture, exploring distributed systems concepts and backend engineering practices.

1. Foundation + infrastructure	Node.js setup, Docker Compose, PostgreSQL, Redis, networking, volumes, health checks, environment configuration
2. User service	Express, REST APIs, project structure, validation, error handling, PostgreSQL, Prisma, migrations
3. Authentication	Password hashing, JWT, refresh tokens, OTP, Google OAuth, security, rate limiting
4. API Gateway	Routing, authentication middleware, service discovery, request forwarding
5. Train/search service	Database modelling, query optimization, indexes, pagination, Elasticsearch if justified
6. Booking service	Booking lifecycle, transactions, seat availability, concurrency, race conditions
7. Seat locking + payments	Redis, distributed locks, TTL, idempotency, payment failure handling
8. Inter-service communication	REST, Kafka, events, retries, timeouts, circuit breakers
9. Distributed workflows	Saga, transactional outbox, eventual consistency, compensation
10. Production readiness	Logging, correlation IDs, metrics, tracing, Docker optimization, testing, CI/CD, scaling