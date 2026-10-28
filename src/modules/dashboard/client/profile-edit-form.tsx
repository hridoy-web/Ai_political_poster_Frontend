"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit3, Lock, User, Check, ShieldCheck } from "lucide-react";

interface UserProfileData {
  name: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

interface ProfileEditFormProps {
  user: UserProfileData;
}

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      phone: user.phone,
    });
  }, [user.name, user.phone]);

  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim()) {
      const parts = name.trim().split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "ইউ";
  };

  return (
    <div className="space-y-6">
      {/* Top Profile Summary Header with Toggle Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-card/80 border border-border/80 backdrop-blur-xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-brand-primary shadow-md">
              <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
              <AvatarFallback className="bg-gradient-brand text-white font-bold text-lg">
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-brand-primary text-white shadow-md hover:scale-110 transition-transform"
              disabled={!isEditing}
            >
              <Camera className="w-3 h-3" />
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              {formData.name}
              <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-brand-green/10 text-brand-mint border border-brand-green/20 rounded-full inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {user.role}
              </span>
            </h2>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Edit Toggle Button */}
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className={`rounded-2xl font-semibold gap-2 border-border/80 transition-all ${
            isEditing
              ? "bg-gradient-brand text-white border-none shadow-md"
              : "hover:bg-accent"
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4" /> মোড সেভ করুন
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-brand-primary" /> তথ্য এডিট করুন
            </>
          )}
        </Button>
      </div>

      {/* Grid with Equal Heights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Card 1: Basic Info */}
        <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
          <div>
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-brand-primary" />
                ব্যক্তিগত তথ্য
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  পূর্ণ নাম
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background/80 border-border/80 rounded-xl h-10 text-sm focus:border-brand-primary disabled:opacity-75"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  ফোন নম্বর
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background/80 border-border/80 rounded-xl h-10 text-sm focus:border-brand-primary disabled:opacity-75"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  ইমেইল অ্যাড্রেস (পরিবর্তনযোগ্য নয়)
                </label>
                <Input
                  defaultValue={user.email}
                  disabled
                  className="bg-muted/60 border-border/60 rounded-xl h-10 text-sm cursor-not-allowed text-muted-foreground"
                />
              </div>
            </CardContent>
          </div>

          <div className="p-6 pt-0">
            {isEditing && (
              <Button className="w-full bg-gradient-brand text-white font-semibold rounded-xl h-10 shadow-md hover:opacity-90 transition-opacity">
                তথ্য আপডেট করুন
              </Button>
            )}
          </div>
        </Card>

        {/* Card 2: Password Reset */}
        <Card className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
          <div>
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                <Lock className="w-4 h-4 text-brand-primary" />
                পাসওয়ার্ড পরিবর্তন
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  বর্তমান পাসওয়ার্ড
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={!isEditing}
                  className="bg-background/80 border-border/80 rounded-xl h-10 text-sm focus:border-brand-primary disabled:opacity-75"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  নতুন পাসওয়ার্ড
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={!isEditing}
                  className="bg-background/80 border-border/80 rounded-xl h-10 text-sm focus:border-brand-primary disabled:opacity-75"
                />
              </div>
            </CardContent>
          </div>

          <div className="p-6 pt-0">
            {isEditing ? (
              <Button className="w-full bg-gradient-green text-white font-semibold rounded-xl h-10 shadow-md hover:opacity-90 transition-opacity">
                পাসওয়ার্ড আপডেট করুন
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                পাসওয়ার্ড পরিবর্তন বা তথ্য আপডেট করতে উপরের তথ্য এডিট করুন বোতামে ক্লিক করুন।
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}