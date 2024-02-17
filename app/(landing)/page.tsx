import Footer from "./_components/Footer";
import { Heading } from "./_components/Heading";
import Hero from "./_components/Hero";

const LandingPage = () => {
	return (
		<div className="min-h-screen md:min-h-[83vh] flex flex-col">
			<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-center font-extrabold">
				Write,{" "}
				<span className="bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-purple-500 to-red-500 animate-text">
					plan,
				</span>{" "}
				share
			</h1>
			<div className="flex flex-col items-center text-center gap-y-6 flex-1 px-6 pb-10">
				<Heading />
				<Hero />
				<Footer />
			</div>
		</div>
	);
};

export default LandingPage;
