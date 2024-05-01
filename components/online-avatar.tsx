"use client";

import { MAX_USRS_BEFORE_LIST, type Member } from "@/utils/helpers"
import { AvatarDisplay } from "./avatar-display";
import { AvatarDropdown } from "./avatar-dropdown";

export const OnlineAvatar = ({ users }: {
    users:Member[]
}) => {
    return (
        <div className="relative flex">
            <AvatarDisplay
                users={users.slice(0, MAX_USRS_BEFORE_LIST)}
            />
            {users.length <= MAX_USRS_BEFORE_LIST ? "" : (
              <AvatarDropdown otherUsers={users}/>
            )}

        </div>
    )
}