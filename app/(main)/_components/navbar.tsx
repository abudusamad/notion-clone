import { MenuIcon } from "lucide-react";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}


const Navbar = ({
    isCollapsed,
    onResetWidth
}:NavbarProps) => {
    return (
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
            {isCollapsed && (
                <MenuIcon
                    onClick={onResetWidth}
                    role="button"
                    className="h-6 w-6 text-muted-foreground"
                />
            
            )}
            <div className="flex items-center justify-between w-full">
                Ttile
                <div className="flex items-center gap-x-2">
                    Publish
                    Menu
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar