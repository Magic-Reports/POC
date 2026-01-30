import { BaseAuditableEntity } from '../_base-auditable.entity';

export class UserEntity extends BaseAuditableEntity {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    password?: string;
    firebaseMessagingTokens?: string[];
}
