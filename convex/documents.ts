import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
