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