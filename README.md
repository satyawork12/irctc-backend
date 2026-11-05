This project demonstrates a complete microservices architecture for a railway booking system (IRCTC clone), covering:

Microservices Design Patterns — Database-per-service, API Gateway, Saga
Inter-Service Communication — REST (sync) and Kafka (async/event-driven)
Authentication & Authorization — JWT (access + refresh), OTP via email, Google OAuth
Database Management — PostgreSQL via Prisma ORM (5 services), Elasticsearch (search)
Caching & Locking — Redis for sessions, OTP storage, distributed seat locks
Containerization — Docker Compose for the full infra stack
Resilience — Rate limiting, circuit breakers, Dead-Letter Queues (DLQ) on every Kafka consumer