export type BannerTheme = "emerald" | "crimson" | "navy" | "charcoal";

export interface CandidateInfo{
    name:string;
    designation:string;
    area:string;
    bannerTitle:string;
    slogan:string;
    courtesy:string;
}

export interface SloganTopicOption{
    id:string;
    label:string;
    icon:string;
}
export interface PosterStudioState{
    candidate: CandidateInfo;
     photoUrl: string;
     theme: BannerTheme;
     imageScale:number;
     isAiProcessing: boolean;
}

export interface GeneratedSloganItem {
  slogan: string;
  subText?: string;
  tone?: string;
  category?: string;
}

export interface PosterRenderResult {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  outputUrl?: string | null;
  previewUrl?: string | null;
  errorMessage?: string | null;
}