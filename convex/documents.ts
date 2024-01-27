import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const get = query({
	handler: async (ctx) => {
		const tasks = await ctx.db.query("documents").collect();
		return tasks;
	},
});

export const archive = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error("Document not found");
		}
		if (existingDocument.userId !== userId) {
			throw new Error("Unauthorized");
		}

		const recursiveArchive = async (documentId: Id<"documents">) => {
			const children = await ctx.db
				.query("documents")
				.withIndex("by_user_parent", (q) =>
					q.eq("userId", userId).eq("parentDocument", documentId)
				)
				.collect();
			for (const child of children) {
				await ctx.db.patch(child._id, { isArchived: true });
				await recursiveArchive(child._id);
			}
		};
		const document = await ctx.db.patch(args.id, { isArchived: true });
		recursiveArchive(args.id);

		return document;
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

export const getSearch = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const documents = await ctx.db
			.query("documents")
			.withIndex("by_user", (q) => q.eq("userId", userId))
			.filter((q) => q.eq(q.field("isArchived"), false))
			.order("desc")
			.collect();
		return documents;
	},
});

export const getSidebar = query({
	args: {
		parentDocument: v.optional(v.id("documents")),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const documents = await ctx.db
			.query("documents")
			.withIndex("by_user_parent", (q) =>
				q.eq("userId", userId).eq("parentDocument", args.parentDocument)
			)
			.filter((q) => q.eq(q.field("isArchived"), false))
			.order("desc")
			.collect();
		return documents;
	},
});

export const getTrash = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const documents = await ctx.db
			.query("documents")
			.withIndex("by_user", (q) => q.eq("userId", userId))
			.filter((q) => q.eq(q.field("isArchived"), true))
			.order("desc")
			.collect();
		return documents;
	},
});

export const remove = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error("Document not found");
		}
		if (existingDocument.userId !== userId) {
			throw new Error("Unauthorized");
		}

		const document = await ctx.db.delete(args.id);
		return document;
	},
});

export const restore = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error("Document not found");
		}
		if (existingDocument.userId !== userId) {
			throw new Error("Unauthorized");
		}

		const recursiveRestore = async (documentId: Id<"documents">) => {
			const children = await ctx.db
				.query("documents")
				.withIndex("by_user_parent", (q) =>
					q.eq("userId", userId).eq("parentDocument", documentId)
				)
				.collect();
			for (const child of children) {
				await ctx.db.patch(child._id, { isArchived: false });
				await recursiveRestore(child._id);
			}
		};
		await ctx.db.patch(args.id, { isArchived: false });
		recursiveRestore(args.id);
	},
})

export const getById = query({
	args: { documentId: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		const document = await ctx.db.get(args.documentId);

		if(!document) {
			throw new Error("Document not found");
		}

		if(document.isPublished && !document.isArchived) {
			return document;
		}

		if(!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		if(document.userId !== userId) {
			throw new Error("Unauthorized");
		}

		return document;

	}
})


export const update = mutation({
	args: {
		id: v.id("documents"),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
		isPublished: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const { id, ...rest } = args;

		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error("Document not found");
		}

		if (existingDocument.userId !== userId) {
			throw new Error("Unauthorized");
		}

		const document = await ctx.db.patch(args.id, {
			...rest,
		});
		return document;
	}
})

 export const removeIcon = mutation({
	args: { id: v.id("documents") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Not authenticated");
		}

		const userId = identity.subject;

		const existingDocument = await ctx.db.get(args.id);

		if (!existingDocument) {
			throw new Error("Document not found");
		}
		if (existingDocument.userId !== userId) {
			throw new Error("Unauthorized");
		}

		const document = await ctx.db.patch(args.id, { icon: undefined });
		return document;
	},
});