import { Cliente } from "./cliente";
import { Plans } from "./plans";

export interface UserPlans {
    id: string;
    user: Cliente;
    plan: Plans;
}