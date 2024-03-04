"use client";

import { getSpaceNameFromUrl, type Member } from "@/utils/helpers";

import { Avatar } from "./ui/avatar"
import { useUser } from "@clerk/clerk-react";
import { OnlineAvatar } from "./online-avatar";

export const AvatartStack = () => {
    const {user} = useUser();
    return (
        <div className="w-full flex">
            <OnlineAvatar  />
           
        </div>
    )
}