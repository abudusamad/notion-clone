import { MAX_USRS_BEFORE_LIST, Member } from "@/utils/helpers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface AvatarDropdownProps {
    otherUsers: Member[];
}

export const AvatarDropdown = ({otherUsers,}:AvatarDropdownProps) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {otherUsers.slice(MAX_USRS_BEFORE_LIST).length}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-cols">
                    <DropdownMenuLabel>
                        Online Users
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}