import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		tokenIdentifier: v.string(),
		role: v.string()
	}).index("by_token", ["tokenIdentifier"]),
	tasks: defineTable({
		text: v.string(),
		isCompleted: v.boolean()
	}),
	bounty: defineTable({
		monster: v.string(),
		location: v.string(),
		dateSpotted: v.string(),
		reward: v.number(),
		witness: v.id('users'),
		open: v.boolean()
	})
});