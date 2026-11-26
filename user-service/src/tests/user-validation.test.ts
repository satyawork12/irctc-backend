import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("POST /users validation", () => {
  it("should reject an invalid email", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        email: "invalid-email",
        password: "StrongPassword123",
        firstName: "Satya",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed");
  });

  it("should reject a short password", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        email: "test@example.com",
        password: "123",
        firstName: "Satya",
      });

    expect(response.status).toBe(400);
  });

  it("should reject a missing first name", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        email: "test@example.com",
        password: "StrongPassword123",
      });

    expect(response.status).toBe(400);
  });
});