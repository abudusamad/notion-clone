import { useParams } from "next/navigation";
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"
import { HomeChat } from "./home-chat";
import { AvatartStack } from "./avatar-stack";
import { AvatarDisplay } from "./avatar-display";


interface AvatarCardProps {
    nameOfSpace: string;
}

export const AvatarCard = ({ nameOfSpace }: AvatarCardProps) => {
    const params = useParams();

    return (
        <Card className="fixed right-8 max-w-[300px] bottom-4 p-3 border border-gray-500 flex  items-center justify-center z-[99]">
            {!params.documentId ? <HomeChat/> : <div className="fon-light">Right Top</div> }
            <Separator
                orientation="vertical"
                className="bg-indigo-500 h-[30px]
                     mx-2"
            
            />
            <AvatartStack nameOfSpace={ nameOfSpace} />
        </Card>
    )
}