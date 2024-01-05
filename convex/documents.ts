import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
	handler: async (ctx) => {
		const tasks = await ctx.db.query("documents").collect();
		return tasks;
	},
});

export const create = mutation({
	args: {
		title: v.string(),
		parentDocumet: v.optional(v.id("documents")),
	},

	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const documents = await ctx.db.insert("documents", {
			title: args.title,
			parentDocument: args.parentDocumet,
			userId,
			isArchived: false,
			isPublished: false,
		});
		return documents;
	},
});
