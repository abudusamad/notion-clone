import Image from "next/image";

const Hero = () => {
	return (
		<div className="flex  items-center justify-center max-w-5xl">
			<div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
				<Image
					alt="Hero Image"
					fill
					src="/documents.png"
					className="object-contain"
				/>
            </div>
            <div className="relative h-[400px] w-[400px] hidden md:block">
                <Image
                    alt="Hero Image"
                    fill
                    className="object-contain"
                    src="/reading.png"
                />
            </div>
		</div>
	);
};

export default Hero;
