"use client";

import React, { useState } from "react";
import {
  PhotoSlot,
  TextSlot,
  SampleCandidateData,
  COMMON_TEXT_SLOT_PRESETS,
} from "../types";
import {
  Plus,
  Trash2,
  Type,
  Image as ImageIcon,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  UserCheck,
  Circle,
  Square,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SlotPropertiesPanelProps {
  photoSlots: PhotoSlot[];
  textSlots: TextSlot[];
  selectedSlotId: string | null;
  selectedSlotType: "photo" | "text" | null;
  sampleCandidate: SampleCandidateData;
  onSelectSlot: (id: string | null, type: "photo" | "text" | null) => void;
  onAddPhotoSlot: () => void;
  onAddTextSlot: (preset?: (typeof COMMON_TEXT_SLOT_PRESETS)[0]) => void;
  onUpdatePhotoSlot: (slot: PhotoSlot) => void;
  onUpdateTextSlot: (slot: TextSlot) => void;
  onDeleteSlot: (id: string, type: "photo" | "text") => void;
  onUpdateSampleCandidate: (data: SampleCandidateData) => void;
}

export function SlotPropertiesPanel({
  photoSlots,
  textSlots,
  selectedSlotId,
  selectedSlotType,
  sampleCandidate,
  onSelectSlot,
  onAddPhotoSlot,
  onAddTextSlot,
  onUpdatePhotoSlot,
  onUpdateTextSlot,
  onDeleteSlot,
  onUpdateSampleCandidate,
}: SlotPropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<"slots" | "props" | "test">("slots");

  const selectedPhoto =
    selectedSlotType === "photo" ? photoSlots.find((p) => p.id === selectedSlotId) : null;
  const selectedText =
    selectedSlotType === "text" ? textSlots.find((t) => t.id === selectedSlotId) : null;

  return (
    <div className="flex flex-col h-full bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl overflow-hidden shadow-xl">
      {/* Panel Tab Navigation */}
      <div className="grid grid-cols-3 p-1.5 bg-muted/50 border-b border-border/60">
        <button
          type="button"
          onClick={() => setActiveTab("slots")}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-semibold transition-all ${
            activeTab === "slots"
              ? "bg-card text-foreground shadow-xs font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sliders className="size-3.5 text-brand-primary" />
          <span>স্লটসমূহ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("props")}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-semibold transition-all ${
            activeTab === "props"
              ? "bg-card text-foreground shadow-xs font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Type className="size-3.5 text-brand-green" />
          <span>প্রোপার্টিজ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("test")}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-semibold transition-all ${
            activeTab === "test"
              ? "bg-card text-foreground shadow-xs font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <UserCheck className="size-3.5 text-amber-500" />
          <span>টেস্ট ডেটা</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* ================= TAB 1: SLOTS LIST ================= */}
        {activeTab === "slots" && (
          <div className="space-y-4">
            {/* Action Buttons to Add Slots */}
            <div className="space-y-2">
              <Button
                type="button"
                onClick={onAddPhotoSlot}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-10 gap-2 font-semibold shadow-xs"
              >
                <Plus className="size-4" /> নতুন ফটো স্লট যোগ করুন
              </Button>

              <div className="pt-2">
                <p className="text-[11px] font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                  প্রস্তুত টেক্সট স্লট প্রিসেট:
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {COMMON_TEXT_SLOT_PRESETS.map((preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => onAddTextSlot(preset)}
                      className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-card border border-border/80 hover:border-brand-primary/50 text-left transition-all hover:shadow-xs group"
                    >
                      <Plus className="size-3 text-muted-foreground group-hover:text-brand-primary shrink-0" />
                      <span className="truncate text-[11px] font-medium text-foreground">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-border/60" />

            {/* List of Photo Slots */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-muted-foreground flex items-center justify-between">
                <span>ফটো স্লট ({photoSlots.length})</span>
                <span className="text-[10px] text-brand-green">ছবির অবস্থান</span>
              </span>

              {photoSlots.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground italic text-[11px] bg-muted/20 rounded-2xl border border-dashed border-border">
                  কোনো ফটো স্লট যোগ করা হয়নি।
                </p>
              ) : (
                photoSlots.map((slot) => {
                  const isSelected = selectedSlotType === "photo" && selectedSlotId === slot.id;
                  return (
                    <div
                      key={slot.id}
                      onClick={() => {
                        onSelectSlot(slot.id, "photo");
                        setActiveTab("props");
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-brand-primary/10 border-brand-primary shadow-xs"
                          : "bg-card border-border/70 hover:border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                          <ImageIcon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{slot.label}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {Math.round(slot.x)}, {Math.round(slot.y)} • {Math.round(slot.width)}×
                            {Math.round(slot.height)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSlot(slot.id, "photo");
                        }}
                        className="size-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>

            {/* List of Text Slots */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-muted-foreground flex items-center justify-between">
                <span>টেক্সট স্লটসমূহ ({textSlots.length})</span>
                <span className="text-[10px] text-brand-primary">ডায়নামিক লেখা</span>
              </span>

              {textSlots.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground italic text-[11px] bg-muted/20 rounded-2xl border border-dashed border-border">
                  কোনো টেক্সট স্লট যোগ করা হয়নি।
                </p>
              ) : (
                textSlots.map((slot) => {
                  const isSelected = selectedSlotType === "text" && selectedSlotId === slot.id;
                  return (
                    <div
                      key={slot.id}
                      onClick={() => {
                        onSelectSlot(slot.id, "text");
                        setActiveTab("props");
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-brand-primary/10 border-brand-primary shadow-xs"
                          : "bg-card border-border/70 hover:border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                          <Type className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{slot.label}</p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            &#123;&#123;{slot.key}&#125;&#125; • {slot.fontSize}px
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSlot(slot.id, "text");
                        }}
                        className="size-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: PROPERTIES INSPECTOR ================= */}
        {activeTab === "props" && (
          <div className="space-y-4">
            {!selectedSlotId ? (
              <div className="text-center py-10 space-y-2">
                <HelpCircle className="size-8 text-muted-foreground mx-auto stroke-1" />
                <p className="text-muted-foreground font-medium text-xs">
                  প্রোপার্টিজ পরিবর্তন করতে ক্যানভাস বা স্লট লিস্ট থেকে যেকোনো একটি স্লট সিলেক্ট করুন।
                </p>
              </div>
            ) : selectedPhoto ? (
              /* PHOTO SLOT PROPERTIES */
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <ImageIcon className="size-4 text-emerald-500" />
                    <span>ফটো স্লট এডিটর</span>
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSlot(selectedPhoto.id, "photo")}
                    className="h-7 text-destructive hover:bg-destructive/10 text-[11px]"
                  >
                    মুছে ফেলুন
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label className="text-[11px]">লেবেল নাম</Label>
                  <Input
                    value={selectedPhoto.label}
                    onChange={(e) => onUpdatePhotoSlot({ ...selectedPhoto, label: e.target.value })}
                    className="h-8 rounded-xl text-xs"
                  />
                </div>

                {/* Coordinates & Dimensions */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px]">X কোঅর্ডিনেট</Label>
                    <Input
                      type="number"
                      value={selectedPhoto.x}
                      onChange={(e) => onUpdatePhotoSlot({ ...selectedPhoto, x: Number(e.target.value) })}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">Y কোঅর্ডিনেট</Label>
                    <Input
                      type="number"
                      value={selectedPhoto.y}
                      onChange={(e) => onUpdatePhotoSlot({ ...selectedPhoto, y: Number(e.target.value) })}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">প্রস্থ (Width)</Label>
                    <Input
                      type="number"
                      value={selectedPhoto.width}
                      onChange={(e) => onUpdatePhotoSlot({ ...selectedPhoto, width: Number(e.target.value) })}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">উচ্চতা (Height)</Label>
                    <Input
                      type="number"
                      value={selectedPhoto.height}
                      onChange={(e) => onUpdatePhotoSlot({ ...selectedPhoto, height: Number(e.target.value) })}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Shape Selector */}
                <div className="space-y-1.5 pt-1">
                  <Label className="text-[11px]">ছবির ফ্রেম শেপ (Shape)</Label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "rounded", label: "রাউন্ডেড", icon: Square },
                      { id: "rectangle", label: "রেক্ট্যাঙ্গেল", icon: Square },
                      { id: "circle", label: "সার্কেল", icon: Circle },
                    ].map((shape) => (
                      <button
                        key={shape.id}
                        type="button"
                        onClick={() =>
                          onUpdatePhotoSlot({
                            ...selectedPhoto,
                            shape: shape.id as any,
                          })
                        }
                        className={`flex items-center justify-center gap-1 py-1.5 rounded-xl border text-[11px] font-semibold transition-all ${
                          selectedPhoto.shape === shape.id
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-card border-border hover:bg-muted"
                        }`}
                      >
                        <shape.icon className="size-3" />
                        <span>{shape.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Border Radius (if rounded) */}
                {selectedPhoto.shape === "rounded" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>কর্নার রেডিয়াস</span>
                      <span className="font-bold">{selectedPhoto.borderRadius ?? 20}px</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      value={selectedPhoto.borderRadius ?? 20}
                      onChange={(e) =>
                        onUpdatePhotoSlot({ ...selectedPhoto, borderRadius: Number(e.target.value) })
                      }
                      className="w-full accent-emerald-500"
                    />
                  </div>
                )}

                {/* Border Ring width */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>বর্ডার রিং পুরুত্ব (Border Width)</span>
                    <span className="font-bold">{selectedPhoto.borderWidth ?? 0}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={selectedPhoto.borderWidth ?? 0}
                    onChange={(e) =>
                      onUpdatePhotoSlot({ ...selectedPhoto, borderWidth: Number(e.target.value) })
                    }
                    className="w-full accent-emerald-500"
                  />
                </div>

                {/* Border Ring Color */}
                <div className="space-y-1">
                  <Label className="text-[11px]">বর্ডার রিং কালার</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedPhoto.borderColor || "#ffffff"}
                      onChange={(e) =>
                        onUpdatePhotoSlot({ ...selectedPhoto, borderColor: e.target.value })
                      }
                      className="size-8 rounded-lg cursor-pointer border border-border"
                    />
                    <Input
                      value={selectedPhoto.borderColor || "#ffffff"}
                      onChange={(e) =>
                        onUpdatePhotoSlot({ ...selectedPhoto, borderColor: e.target.value })
                      }
                      className="h-8 rounded-xl text-xs uppercase flex-1"
                    />
                  </div>
                </div>
              </div>
            ) : selectedText ? (
              /* TEXT SLOT PROPERTIES */
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Type className="size-4 text-brand-primary" />
                    <span>টেক্সট স্লট এডিটর</span>
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSlot(selectedText.id, "text")}
                    className="h-7 text-destructive hover:bg-destructive/10 text-[11px]"
                  >
                    মুছে ফেলুন
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px]">লেবেল</Label>
                    <Input
                      value={selectedText.label}
                      onChange={(e) => onUpdateTextSlot({ ...selectedText, label: e.target.value })}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">ভ্যারিয়েবল Key</Label>
                    <Input
                      value={selectedText.key}
                      onChange={(e) => onUpdateTextSlot({ ...selectedText, key: e.target.value })}
                      className="h-8 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px]">ডিফল্ট টেক্সট (একাধিক লাইন সমর্থিত)</Label>
                    <span className="text-[10px] text-muted-foreground">Enter = নতুন লাইন</span>
                  </div>
                  <Textarea
                    value={selectedText.defaultText}
                    onChange={(e) => onUpdateTextSlot({ ...selectedText, defaultText: e.target.value })}
                    className="min-h-[58px] rounded-xl text-xs font-bengali resize-y py-1.5"
                    placeholder="এখানে টেক্সট লিখুন..."
                    rows={2}
                  />
                </div>

                {/* Text Box Dimensions (Width x Height) */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px]">প্রস্থ (Width)</Label>
                    <Input
                      type="number"
                      value={selectedText.width || selectedText.maxWidth || 800}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        onUpdateTextSlot({
                          ...selectedText,
                          width: val,
                          maxWidth: val,
                        });
                      }}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">উচ্চতা (Height)</Label>
                    <Input
                      type="number"
                      value={selectedText.height || 60}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        onUpdateTextSlot({
                          ...selectedText,
                          height: val,
                        });
                      }}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Position Coordinates */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px]">X পজিশন</Label>
                    <Input
                      type="number"
                      value={selectedText.x}
                      onChange={(e) => onUpdateTextSlot({ ...selectedText, x: Number(e.target.value) })}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">Y পজিশন</Label>
                    <Input
                      type="number"
                      value={selectedText.y}
                      onChange={(e) => onUpdateTextSlot({ ...selectedText, y: Number(e.target.value) })}
                      className="h-8 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Font Size & Weight */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>ফন্ট সাইজ (Font Size)</span>
                    <span className="font-bold">{selectedText.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={96}
                    value={selectedText.fontSize}
                    onChange={(e) => onUpdateTextSlot({ ...selectedText, fontSize: Number(e.target.value) })}
                    className="w-full accent-brand-primary"
                  />
                </div>

                {/* Max Width for Wrapping */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>সর্বোচ্চ র‍্যাপিং প্রস্থ (Max Width)</span>
                    <span className="font-bold">{selectedText.width || selectedText.maxWidth || 800}px</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={1080}
                    step={10}
                    value={selectedText.width || selectedText.maxWidth || 800}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onUpdateTextSlot({ ...selectedText, width: val, maxWidth: val });
                    }}
                    className="w-full accent-brand-primary"
                  />
                </div>

                {/* Alignment */}
                <div className="space-y-1">
                  <Label className="text-[11px]">অ্যালাইনমেন্ট (Align)</Label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: "left", label: "বাম", icon: AlignLeft },
                      { id: "center", label: "মাঝখানে", icon: AlignCenter },
                      { id: "right", label: "ডান", icon: AlignRight },
                    ].map((al) => (
                      <button
                        key={al.id}
                        type="button"
                        onClick={() => onUpdateTextSlot({ ...selectedText, align: al.id as any })}
                        className={`flex items-center justify-center gap-1 py-1.5 rounded-xl border text-[11px] font-semibold transition-all ${
                          selectedText.align === al.id
                            ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                            : "bg-card border-border hover:bg-muted"
                        }`}
                      >
                        <al.icon className="size-3" />
                        <span>{al.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color & Presets */}
                <div className="space-y-1.5">
                  <Label className="text-[11px]">টেক্সট কালার</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedText.color || "#ffffff"}
                      onChange={(e) => onUpdateTextSlot({ ...selectedText, color: e.target.value })}
                      className="size-8 rounded-lg cursor-pointer border border-border"
                    />
                    <Input
                      value={selectedText.color || "#ffffff"}
                      onChange={(e) => onUpdateTextSlot({ ...selectedText, color: e.target.value })}
                      className="h-8 rounded-xl text-xs uppercase flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    {["#ffffff", "#fbbf24", "#34d399", "#f87171", "#38bdf8", "#000000"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => onUpdateTextSlot({ ...selectedText, color: c })}
                        className="size-5 rounded-full border border-border/80 shadow-2xs hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ================= TAB 3: SAMPLE CANDIDATE TEST DATA ================= */}
        {activeTab === "test" && (
          <div className="space-y-3.5">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                <UserCheck className="size-4 text-amber-500" />
                <span>স্যাম্পল ক্যান্ডিডেট ডেটা</span>
              </h4>
              <p className="text-[11px] text-muted-foreground">
                এই ডেটা দিয়ে আপনি ক্যানভাসে রিয়েল-টাইম টেস্ট প্রিভিউ দেখতে পারবেন।
              </p>
            </div>

            <div className="space-y-2">
              <div className="space-y-1">
                <Label className="text-[11px]">প্রার্থীর ছবি URL</Label>
                <Input
                  value={sampleCandidate.photoUrl}
                  onChange={(e) =>
                    onUpdateSampleCandidate({ ...sampleCandidate, photoUrl: e.target.value })
                  }
                  className="h-8 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">প্রার্থীর নাম</Label>
                <Input
                  value={sampleCandidate.name}
                  onChange={(e) =>
                    onUpdateSampleCandidate({ ...sampleCandidate, name: e.target.value })
                  }
                  className="h-8 rounded-xl text-xs font-bengali"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">পদবী</Label>
                <Input
                  value={sampleCandidate.designation}
                  onChange={(e) =>
                    onUpdateSampleCandidate({ ...sampleCandidate, designation: e.target.value })
                  }
                  className="h-8 rounded-xl text-xs font-bengali"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">নির্বাচনী এলাকা</Label>
                <Input
                  value={sampleCandidate.area}
                  onChange={(e) =>
                    onUpdateSampleCandidate({ ...sampleCandidate, area: e.target.value })
                  }
                  className="h-8 rounded-xl text-xs font-bengali"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">নির্বাচনী মার্কা</Label>
                <Input
                  value={sampleCandidate.symbol}
                  onChange={(e) =>
                    onUpdateSampleCandidate({ ...sampleCandidate, symbol: e.target.value })
                  }
                  className="h-8 rounded-xl text-xs font-bengali"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">রাজনৈতিক স্লোগান (একাধিক লাইন সমর্থিত)</Label>
                <Textarea
                  value={sampleCandidate.slogan}
                  onChange={(e) =>
                    onUpdateSampleCandidate({ ...sampleCandidate, slogan: e.target.value })
                  }
                  className="min-h-[50px] rounded-xl text-xs font-bengali resize-y py-1.5"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">সৌজন্যে ও প্রচারে</Label>
                <Textarea
                  value={sampleCandidate.courtesy}
                  onChange={(e) =>
                    onUpdateSampleCandidate({ ...sampleCandidate, courtesy: e.target.value })
                  }
                  className="min-h-[50px] rounded-xl text-xs font-bengali resize-y py-1.5"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
