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
        style={{paddingLeft: "12px"}}
        >
            Item List
        </div>
    )
}