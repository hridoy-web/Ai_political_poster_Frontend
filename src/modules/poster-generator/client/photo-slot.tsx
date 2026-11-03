"use client"

import React, { useRef } from "react";
import { PhotoSlotCardProps } from "../generator.types";
import { RefreshCw } from "lucide-react";
import { removeImageBackground } from "@/modules/background-removal";
import { toast } from "sonner";

export function PhotoSlot({
    photoUrl,
    onPhotoChange,
    imageScale = 100,
    imageOffsetX = 0,
    imageOffsetY = 0,
    width,
    height,
    className = "",
}:PhotoSlotCardProps){
    const fileInputRef = useRef<HTMLInputElement | null >(null);
    const handleBoxClick = () => {
        fileInputRef.current?.click();
    }


      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    
    const localUrl = URL.createObjectURL(file);
    onPhotoChange(localUrl);

    // Start background removal
    setTimeout(async () => {
      const toastID = toast.loading("এআই ব্যাকগ্রাউন্ড আলাদা করছে...");
      try {
        const transparentUrl = await removeImageBackground(file, undefined, { fastMode: true });
        if (transparentUrl) {
          onPhotoChange(transparentUrl);
          toast.success("ব্যাকগ্রাউন্ড সফলভাবে রিমুভ হয়েছে!", { id: toastID });
        } else {
          toast.dismiss(toastID);
        }
      } catch (err) {
        console.error("BG Removal error:", err);
        toast.dismiss(toastID);
      }
    }, 600);
  };

return(
    <div
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
      className={`relative rounded-none overflow-hidden select-none ${photoUrl ? "pointer-events-none" : "pointer-events-auto"} ${className}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {photoUrl ? (
        <div className="relative w-full h-full group pointer-events-none">
          <img
            src={photoUrl}
            alt="Candidate Photo"
            style={{
              transform: `translate(${imageOffsetX}px, ${imageOffsetY}px) scale(${imageScale / 100})`,
            }}
            className="w-full h-full object-cover object-top pointer-events-none opacity-0"
          />
          {/*changing Button*/}
          <button
            type="button"
            onClick={handleBoxClick}
         className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs transition-opacity opacity-80 hover:opacity-100 cursor-pointer pointer-events-auto"
          >
            <RefreshCw className="size-3.5" />
            <span>ছবি পরিবর্তন</span>
          </button>
        </div>
      ) : (
        <div
          onClick={handleBoxClick}
         className="w-full h-full bg-transparent border-2 border-dashed border-white rounded-none flex flex-col items-center justify-center p-4 text-center cursor-pointer select-none"
        >
          <h3 className="text-xs font-bold  text-white/90 drop-shadow-sm mt-1 leading-relaxed max-w-[200px]">
          আপনার ছবি বসাতে এই জায়গায় <span className="text-emerald-300 font-bold underline">ট্যাপ করুন</span>
          </h3>
        </div>
      )}
    </div>
  );
}