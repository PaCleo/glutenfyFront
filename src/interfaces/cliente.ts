import { Role } from "./Enum/roleEnum";

export interface Cliente {
    id: string;
    name: string;
    email: string;
    roles?: Role;
}