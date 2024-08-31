import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const save = mutation({
	args: {
		monster: v.string(),
		location: v.string(),
		dateSpotted: v.string(),
		reward: v.number()
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		const user = await ctx.db.query('users').withIndex('by_token', (q) => q.eq('tokenIdentifier', identity?.tokenIdentifier || '')).unique();
		if (!user) throw new Error("User not logged in");
		return await ctx.db.insert('bounty', {
			monster: args.monster,
			location: args.location,
			dateSpotted: args.dateSpotted,
			reward: args.reward,
			witness: user._id,
			open: true
		})
	},
});

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('bounty').collect();
	}
});