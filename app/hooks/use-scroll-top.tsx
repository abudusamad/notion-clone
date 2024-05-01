import { useEffect, useState } from "react";

const useScrollTop = (threshold = 10) => {
    const [scrolled , setScrolled] = useState( false);
	useEffect(() => {
        const checkScrollPosition = () => {
			if (window.scrollY > threshold) {
                setScrolled(true);
                
            } else {
                setScrolled(false);
            }
		};

		window.addEventListener("scroll", checkScrollPosition);

		// Cleanup function to remove the event listener when the component unmounts
		return () => window.removeEventListener("scroll", checkScrollPosition);
	}, [threshold]); // Empty dependency array means this effect runs once on mount and cleanup on unmount

	return scrolled;
};

export default useScrollTop;
