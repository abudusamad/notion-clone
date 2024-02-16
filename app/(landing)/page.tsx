
import Footer from "./_components/Footer";
import { Heading } from "./_components/Heading";
import Hero from "./_components/Hero";

const LandingPage = () => {
	return (
		<div className="min-h-screen md:min-h-[83vh] flex flex-col">
			<div className="mt-32 md:mt-0 text-3xl sm:text-center-5xl md:text-6xl lg:text-8xl text-center">
				<h1 className="mt-32 md:mt-0 text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-center font-switzerBold">
					Make.{" "}
					<span className="bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-purple-500 to-red-500 animate-text">
						Dreams.
					</span>{" "}
					Happen.
				</h1>
				<Heading />
				<Hero />
			</div>
			<Footer />
		</div>
	);
};

export default LandingPage;
