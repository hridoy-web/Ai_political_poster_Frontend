"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverURL } from "@/lib/api/authApi";
import { useAuth } from "@/hooks/get-user-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit3, Lock, User, Check, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
  const { setUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

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

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ছবির আকার সর্বোচ্চ ৫ মেগাবাইট হতে পারবে।");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      toast.info("নতুন প্রোফাইল ছবি নির্বাচন করা হয়েছে। তথ্য আপডেট করতে বাটনে চাপুন।");
    }
  };

  const handleUpdateProfile = async () => {
    if (!formData.name.trim()) {
      toast.error("অনুগ্রহ করে পূর্ণ নাম প্রদান করুন।");
      return;
    }

    try {
      setIsUpdatingProfile(true);

      const submitData = new FormData();
      submitData.append("name", formData.name.trim());
      if (formData.phone) {
        submitData.append("phone", formData.phone.trim());
      }
      if (avatarFile) {
        submitData.append("image", avatarFile);
      }

      const response = await axios.patch(
        `${serverURL}/api/v1/user/profile`,
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!");
        setIsEditing(false);
        const updated = response.data.data;
        if (updated) {
          setUser(updated);
        }
      } else {
        toast.error(response.data?.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
      }
    } catch (error: any) {
      console.error("Update profile failed:", error);
      toast.error(error.response?.data?.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwords.currentPassword) {
      toast.error("বর্তমান পাসওয়ার্ড প্রদান করুন।");
      return;
    }
    if (!passwords.newPassword || passwords.newPassword.length < 8) {
      toast.error("নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const response = await axios.post(
        `${serverURL}/api/v1/user/change-password`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        { withCredentials: true }
      );

      if (response.data?.success) {
        toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
        setPasswords({ currentPassword: "", newPassword: "" });
      } else {
        toast.error(response.data?.message || "পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে।");
      }
    } catch (error: any) {
      console.error("Update password failed:", error);
      toast.error(error.response?.data?.message || "পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে।");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Avatar */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Top Profile Summary Header with Toggle Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-card/80 border border-border/80 backdrop-blur-xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-brand-primary shadow-md">
              <AvatarImage
                src={avatarPreview || user.avatarUrl || ""}
                alt={formData.name || user.name}
              />
              <AvatarFallback className="bg-gradient-brand text-white font-bold text-lg">
                {getInitials(formData.name || user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-brand-primary text-white shadow-md hover:scale-110 transition-transform cursor-pointer"
              disabled={!isEditing}
              title="ছবি পরিবর্তন করুন"
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
              <Check className="w-4 h-4" /> এডিট শেষ
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
                  disabled={!isEditing || isUpdatingProfile}
                  placeholder="আপনার পূর্ণ নাম"
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
                  disabled={!isEditing || isUpdatingProfile}
                  placeholder="০১৮০০০০০০০০"
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
              <Button
                onClick={handleUpdateProfile}
                disabled={isUpdatingProfile}
                className="w-full bg-gradient-brand text-white font-semibold rounded-xl h-10 shadow-md hover:opacity-90 transition-opacity gap-2"
              >
                {isUpdatingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    তথ্য সংরক্ষণ হচ্ছে...
                  </>
                ) : (
                  "তথ্য আপডেট করুন"
                )}
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
                  value={passwords.currentPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, currentPassword: e.target.value })
                  }
                  disabled={!isEditing || isUpdatingPassword}
                  className="bg-background/80 border-border/80 rounded-xl h-10 text-sm focus:border-brand-primary disabled:opacity-75"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  নতুন পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                  disabled={!isEditing || isUpdatingPassword}
                  className="bg-background/80 border-border/80 rounded-xl h-10 text-sm focus:border-brand-primary disabled:opacity-75"
                />
              </div>
            </CardContent>
          </div>

          <div className="p-6 pt-0">
            {isEditing ? (
              <Button
                onClick={handleUpdatePassword}
                disabled={isUpdatingPassword}
                className="w-full bg-gradient-green text-white font-semibold rounded-xl h-10 shadow-md hover:opacity-90 transition-opacity gap-2"
              >
                {isUpdatingPassword ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    পাসওয়ার্ড পরিবর্তন হচ্ছে...
                  </>
                ) : (
                  "পাসওয়ার্ড আপডেট করুন"
                )}
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