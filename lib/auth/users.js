import { createHash } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

export function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

export async function readUsers() {
  try {
    const data = await readFile(usersFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeUsers(users) {
  await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((user) => user.email === email.toLowerCase());
}

export async function createUser({ email, password, name }) {
  const normalizedEmail = email.toLowerCase();
  const users = await readUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email: normalizedEmail,
    password: hashPassword(password),
  };

  users.push(newUser);
  await writeUsers(users);
  return newUser;
}
