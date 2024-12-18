import { Role } from "./Enum/roleEnum";
import { UserPlans } from "./userPlans";

export interface Cliente {
    id: string;
    name: string;
    email: string;
    roles?: Role;
    userPlans: UserPlans[];
}