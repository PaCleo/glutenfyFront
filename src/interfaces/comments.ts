import { Reply } from "./replies";

export interface Comments {
    id: string;
    text: string;
    isShadowBanned: boolean;
    replies: Reply[];
}