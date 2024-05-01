"use client";


import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo } from "react";
import { OnlineAvatar } from "./online-avatar";
import { Member } from "@/utils/helpers";

interface AvatarStackProps {
    nameOfSpace: string;
}

export const AvatartStack = ({nameOfSpace}:AvatarStackProps) => {
    const { user } = useUser();
    const name = useMemo(() => user?.fullName, [user]);
    const imageUrl = useMemo(() => user?.imageUrl, [user]);

    if (!user) {
        redirect("/")
    }

    const updatePresence = useMutation(api.presence.updatePresence);
    useEffect(() => {
        if (user?.id) {
            updatePresence({
                userId: user.id,
                lastActive: Date.now(),
                lastSeen: Date.now(),
                location: nameOfSpace,
                userName: name?? "user",
                userPicture: imageUrl,
            });
        
        }
    }, [nameOfSpace, name, imageUrl, user?.id, updatePresence]);

    const users = useQuery(api.presence.getPresence, { location: nameOfSpace ?? "documents" });
    const activeUsers = users?.filter((user) => user.lastActive > Date.now() - 5 * 60 * 1000);
    const Member = activeUsers?.map((user) => ({
        imageUrl: user.userPicture,
        name: user.userName,
    }));

    if (!activeUsers || activeUsers.length === 0) {
        return
        <div className="text-muted-foreground">
            No active users
        </div>
    }    return (
        <div className="w-full flex">
            <OnlineAvatar users={activeUsers as Member[]}  />
           
        </div>
    )
}