import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
    onClick: () => void;
    label: string;
    icon: LucideIcon;
}


export const Item = ({
    onClick,
    label,
    icon: Icon,
}: ItemProps) => {
    
   
    return (
        <div
            style={{ paddingLeft: "12px" }}
            className="group min-h-[27px] text-sm pr-3 py-1 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium
            "
        >
            <div className="h-full flex items-center gap-x-2 rounded-sm hover:bg-neutral-300 mr-1">
                <Icon className="shrink-0 h-[18px] w-[18px] text-muted-foreground" />
                <span className="truncate">
                    {label}
                </span>
                
          </div>
        </div>
    )
}