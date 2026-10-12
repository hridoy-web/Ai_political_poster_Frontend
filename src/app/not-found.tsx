import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center min-h-screen justify-center h-screen">
            <h1 className="text-9xl font-bold mb-4 text-gradient-brand">404</h1>
            <h2 className=" text-4xl font-extrabold">Page Not Found</h2>
            <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>

            <Button asChild className="mt-6 h-11 px-6 rounded-full text-lg" variant="default" size="lg" >
                <Link href="/">
                    Go Back Home
                </Link>
            </Button>
        </div>
    );
}