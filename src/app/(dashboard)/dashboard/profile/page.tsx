import { Suspense } from "react";
import { UserProfileView } from "@/modules/dashboard/server/user-profile-view";

export const metadata = {
    title: "প্রোফাইল সেটিংস - PosterAI",
    description: "আপনার ইউজার প্রোফাইল ও পাসওয়ার্ড ম্যানেজমেন্ট",
};

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">প্রোফাইল সেটিংস</h1>
                <p className="text-sm text-muted-foreground">
                    আপনার অ্যাকাউন্ট প্রোফাইল তথ্য এবং সিকিউরিটি পাসওয়ার্ড পরিচালনা করুন।
                </p>
            </div>

            <Suspense
                fallback={
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        প্রোফাইল তথ্য লোড হচ্ছে...
                    </div>
                }
            >
                <UserProfileView />
            </Suspense>
        </div>
    );
}