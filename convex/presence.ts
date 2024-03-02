import { mutation } from "./_generated/server";

export const updatePresence = mutation({
    args: {
        userId: v.string(),
        lastActive: v.number(),
        location: v.optional(v.string()),
        userName: v.optional(v.string()),
        userPicture: v.optional(v.string()),
        lastSeen: v.number(),
    },
    handler: async (ctx, { userId, location, userName, userPicture, lastSeen }) => {
        const existing = await ctx.db.query("presence")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .unique();
        
        let presence;
        if (existing) {
            
        } 
    }
})