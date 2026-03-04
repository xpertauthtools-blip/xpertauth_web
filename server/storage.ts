import {
  type User, type InsertUser,
  type Waitlist, type InsertWaitlist,
  type NewsletterSignup, type InsertNewsletterSignup,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistByEmail(email: string): Promise<Waitlist | undefined>;
  addNewsletterSignup(entry: InsertNewsletterSignup): Promise<NewsletterSignup>;
  getNewsletterByEmail(email: string): Promise<NewsletterSignup | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private waitlistEntries: Map<string, Waitlist>;
  private newsletterEntries: Map<string, NewsletterSignup>;

  constructor() {
    this.users = new Map();
    this.waitlistEntries = new Map();
    this.newsletterEntries = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const id = randomUUID();
    const waitlistEntry: Waitlist = {
      ...entry,
      id,
      type: entry.type || "individual",
      createdAt: new Date(),
    };
    this.waitlistEntries.set(id, waitlistEntry);
    return waitlistEntry;
  }

  async getWaitlistByEmail(email: string): Promise<Waitlist | undefined> {
    return Array.from(this.waitlistEntries.values()).find(
      (entry) => entry.email === email,
    );
  }

  async addNewsletterSignup(entry: InsertNewsletterSignup): Promise<NewsletterSignup> {
    const id = randomUUID();
    const signup: NewsletterSignup = {
      ...entry,
      id,
      createdAt: new Date(),
    };
    this.newsletterEntries.set(id, signup);
    return signup;
  }

  async getNewsletterByEmail(email: string): Promise<NewsletterSignup | undefined> {
    return Array.from(this.newsletterEntries.values()).find(
      (entry) => entry.email === email,
    );
  }
}

export const storage = new MemStorage();
