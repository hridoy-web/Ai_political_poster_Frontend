import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <section className="flex flex-col items-center text-center min-h-screen justify-center px-4 space-y-3.5">

            <h2 className="text-9xl font-bold mb-4 text-gradient-green">404</h2>

            <h3 className=" text-3xl font-extrabold text-brand-">Page Not Found</h3>

            <p className="text-base text-gradient-green">Sorry, the page you are looking for does not exist.</p>

            <Button asChild className="mt-6 h-11 px-6 rounded-full text-base group bg-gradient-green " variant="default" size="lg" >

                <Link href="/">
                    Go Back Home <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>

            </Button>

        </section>
    );
}