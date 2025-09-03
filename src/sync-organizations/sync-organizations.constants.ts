export const ORGANIZATION_COLLECTION_NAME = 'Organizations';
export const ORGANIZATION_MODEL = Symbol('OrganizationModel');

export enum OrganizationSubscriptionStatus {
  TRIAL = 'TRIAL',
  PAYING = 'PAYING',
  FREE = 'FREE',
  CANCELLED = 'CANCELLED',
}

export enum OrganizationSubtype {
  PERSONAL = 'PERSONAL',
  DEFAULT_BUSINESS = 'DEFAULT_BUSINESS',
  BPO_MANAGED_BUSINESS = 'BPO_MANAGED_BUSINESS',
  BPO_OFFICE = 'BPO_OFFICE',
}
