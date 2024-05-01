"use client";

import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { redirect } from "next/navigation";
import { Member, getIntials } from "@/utils/helpers";


interface AvatarDisplayPros{
    users: Member[];
}

export const AvatarDisplay = ({
    users,
}:AvatarDisplayPros) => {
    const { user } = useUser();
    if (!user) {
        redirect("/")
    }

	return (
		<HoverCard>
			<HoverCardTrigger>
                <Avatar className="h-8 w-8" >
                    
                    <AvatarImage
                        src={`${user?.imageUrl || "default_iamge_url"}`}
                        alt="Profile picture"
                    />
                    <AvatarFallback>
                        {getIntials(user?.username || user?.fullName || "user")}
                    </AvatarFallback>
                    <div className="bg-green-500 w-[10px] h-[10px] rounded-full absolute bottom-1 left-0 transform translate-y-1/2 translate-x-1/2 "
                        id="online-indicator"
                    />
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="capitalize">
                {user?.username || user?.fullName || "user"}
            </HoverCardContent>
		</HoverCard>
	);
};
