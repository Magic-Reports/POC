export abstract class BaseAuditableEntity {
    _id?: string;
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
}
