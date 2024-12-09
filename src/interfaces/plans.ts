import { Categories } from "./categories";

export interface Plans {
    id: string
    name: string
    ticto_id: string
    ebookPlans: Categories[]
}