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

export interface TemplateCanvasConfig {
  type: string;
  blankTemplateUrl?: string;
  previewUrl?: string;
  photoSlots?: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    shape?: "circle" | "rounded" | "square";
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
  }>;
  textSlots?: Array<{
    id: string;
    key: string;
    label: string;
    x: number;
    y: number;
    width?: number;
    maxWidth?: number;
    height?: number;
    defaultText: string;
    fontSize: number;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    align?: "left" | "center" | "right";
    shadow?: boolean;
    shadowColor?: string;
    shadowBlur?: number;
    lineHeight?: number;
  }>;
  width?: number;
  height?: number;
  fields?: Array<{ key: string; label: string; type: string }>;
}

export interface PublishedTemplate {
  id: string;
  title: string;
  description?: string | null;
  aspectRatio: string;
  width: number;
  height: number;
  config?: TemplateCanvasConfig;
}