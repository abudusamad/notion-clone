import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updatePresence = mutation({
	args: {
		userId: v.string(),
		lastActive: v.number(),
		lastSeen: v.number(),
		location: v.optional(v.string()),
		userName: v.optional(v.string()),
		userPicture: v.optional(v.string()),
	},
	handler: async (
		ctx,
		{ userId, location, userName, userPicture, lastActive, lastSeen }
	) => {
		const existingPresence = await ctx.db
			.query("presence")
			.withIndex("by_user", (q) => q.eq("userId", userId))
			.unique();
		let presence;
		if (existingPresence) {
			await ctx.db.patch(existingPresence._id, {
				lastActive: Date.now(),
				lastSeen: Date.now(),
				location: location,
				userName: userName,
			});
			presence = await ctx.db.get(existingPresence._id);
		} else {
			const newId = await ctx.db.insert("presence", {
				userId: userId,
				lastActive: Date.now(),
				lastSeen: Date.now(),
				location: location,
				userName: userName,
				userPicture: userPicture,
			});
			presence = await ctx.db.get(newId);
		}
		return presence;
	},
});

export const getPresence = query({
	args: { location: v.string() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}
        const userId = identity.subject;
        if (!userId) {
            throw new Error("No user id");
        }

		const presence = await ctx.db
			.query("presence")
			.withIndex("by_location", (q) => q.eq("location", args.location))
			.collect();
		return presence;
	},
});
