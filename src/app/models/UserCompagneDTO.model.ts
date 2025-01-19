import { User } from "./user.model";

export interface UserCompagneDTO {
  id?: number;
  userId?: number;
  user?: User;
  compagneId?: number;
  supervisorId?: number;
  projectLeaderId?: number;
  fonctionId: number;
  commentaire?: string;
  dateAffectation?: Date;
  dateFinAffectation?: Date;
  dateHeureFormation?: Date;
}