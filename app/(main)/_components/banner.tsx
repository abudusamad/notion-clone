import { ConfirmModal } from "@/app/modal/confirm-modal";
import { Button } from "@/components/ui/button"
import { Id } from "@/convex/_generated/dataModel"

interface BannerProps{
    documentId: Id<"documents">;
}

export const Banner = ({documentId}:BannerProps) => {
    return (
        <div className="w-full bg-rose-500 text-center text-sm text-white flex items-center gap-x-2 justify-center">
            <p>This Page is in the Trash</p>
            <Button
                size="sm"
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal"
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={()=>{}}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    )
}