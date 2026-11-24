import { prisma } from "../config/prisma.js";

async function testDatabase() {
  try {
    await prisma.$connect();

    console.log("Database connected!");

    // 1. CREATE
    const user = await prisma.user.create({
      data: {
        email: `test${Date.now()}@gmail.com`,
        passwordHash: "dummy-hash-for-testing",
        firstName: "Satya",
        lastName: "Prakash",
      },
    });

    console.log("Created user:", user);

    // 2. READ
    const foundUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    console.log("Found user:", foundUser);

    // 3. UPDATE
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: "Updated Satya",
      },
    });

    console.log("Updated user:", updatedUser);

    // 4. DELETE
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    console.log("User deleted successfully!");
  } catch (error) {
    console.error("Database operation failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();