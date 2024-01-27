import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "../hooks/use-cover-image";

const CoverImageModal = () => {
	const coverImage = useCoverImage();

	return (
		<Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-center text-lg font-semibold">Add Cover Image</h2>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default CoverImageModal;
