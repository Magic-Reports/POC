import { BaseAuditableEntity } from '../_base-auditable.entity';

export class CompanyEntity extends BaseAuditableEntity {
    name: string;
    document?: string;
    logo?: string;
    contactName?: string;
    phone?: string;
    email?: string;
    gatewayId?: string;
}
