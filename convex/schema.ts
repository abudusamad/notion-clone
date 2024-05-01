import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	documents: defineTable({
		title: v.string(),
		userId: v.string(),
		isArchived: v.boolean(),
		parentDocument: v.optional(v.id("documents")),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
		isPublished: v.boolean(),
	})
		.index("by_user", ["userId"])
		.index("by_user_parent", ["userId", "parentDocument"]),

	chats: defineTable({
		userId: v.string(),
		documentId: v.id("documents"),
		message: v.string(),
		userName: v.string(),
		isArchived: v.boolean(),
	})
		.index("by_document", ["documentId"])
		.index("by_user", ["userId"]),

	homeChat: defineTable({
		userId: v.string(),
		message: v.string(),
		userName: v.string(),
		isArchived: v.boolean(),
	}).index("by_user", ["userId"]),

	presence: defineTable({
		userId: v.string(),
		lastSeen: v.number(),
		location: v.optional(v.string()),
		userPicture: v.optional(v.string()),
		userName: v.optional(v.string()),
		lastActive: v.number(),
	})
		.index("by_user", ["userId"])
		.index("by_location", ["location"])
		.index("by_lastSeen", ["lastSeen"]),
});
