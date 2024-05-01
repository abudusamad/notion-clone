"use client";

import { useChat } from "@/app/hooks/use-chat";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Input } from "./ui/input";


export const HomeChat = () => {
    const [message, setMessage] = useState("");
    return (
        <Sheet defaultOpen>
			<SheetTrigger asChild defaultChecked>
				<Button
					variant="ghost"
					size="icon"
					className="text-muted-foreground rounded-full hover:bg-zinc-300 dark:hover:selection:bg-gray-600 hover:text-indigo-700 dark:hover:text-zinc-100"
				>
					{""}
					<HoverCard >
						<HoverCardTrigger>
							<svg
								className=" h-6 w-6 stroke-1"
								fill="none"
								height="24"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								width="24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
							</svg>
							<span className="sr-only">Write a Message</span>
						</HoverCardTrigger>
						<HoverCardContent className="capitalize bg-inherit text-sm border-none shadow-none">
							Click to chat
						</HoverCardContent>
					</HoverCard>
				</Button>
            </SheetTrigger>
            <SheetContent>
                <ScrollArea className="border-none max-h-[70vh] overflow-y-auto px-5 bg-text-muted w-full transition flex tex-sm flex-col shadow-none ">
            <h1>Oops look like you have not started chatting</h1>
                    
                </ScrollArea>
                <Input
                    type="text"
                    disabled={false}
                    className="mt-5"
                    placeholder="Send a message to get started"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            setMessage("");
                        }
                    }}
                />
            </SheetContent>
		</Sheet>
	);
};
