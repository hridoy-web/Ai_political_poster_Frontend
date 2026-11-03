"use client";

import Image from "next/image";
import { Camera, User } from "lucide-react";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/validation/authValidation";
   import { useEffect, useMemo, useRef, type ChangeEvent } from "react";

type Props = {
  image: File | null;
  onChange: (file: File | null) => void;
  onError: (message: string) => void;
};

export default function ProfileImagePicker({ image, onChange, onError }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
 
  const preview = useMemo(
  () => (image ? URL.createObjectURL(image) : null),
  [image],
);

useEffect(() => {
  return () => {
    if (preview) URL.revokeObjectURL(preview);
  };
}, [preview]);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      onError("PNG, JPG অথবা WEBP ছবি নির্বাচন করো।");
    } else if (file.size > MAX_IMAGE_SIZE) {
      onError("ছবির সাইজ সর্বোচ্চ 2 MB হতে পারবে।");
    } else {
      onChange(file);
    }

    e.target.value = ""; 
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label={preview ? "Change profile photo" : "Upload profile photo"}
          className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/30 bg-muted/40 transition hover:border-primary hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Profile image preview"
              width={96}
              height={96}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-10 w-10 text-muted-foreground" />
          )}
        </button>

        <span className="pointer-events-none absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-gradient-brand text-white shadow-md">
          <Camera className="h-4 w-4" />
        </span>

        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleSelect}
          className="hidden"
          tabIndex={-1}
          aria-hidden
        />
      </div>

      <p className="mt-2.5 text-xs font-semibold sm:text-sm">
        Profile photo{" "}
        <span className="font-normal text-muted-foreground">(optional)</span>
      </p>

      <div className="mt-0.5 flex max-w-full items-center gap-2">
        <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
          {image ? image.name : "PNG, JPG or WEBP · Max 2 MB"}
        </p>
        {image && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="shrink-0 text-[10px] font-semibold text-destructive hover:underline sm:text-xs"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}