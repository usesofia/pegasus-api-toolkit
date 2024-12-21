import { SetMetadata } from '@nestjs/common';

export const IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY =
  'ignoreGcpServiceAccountGuard';
export const IgnoreGcpServiceAccountGuard = () =>
  SetMetadata(IGNORE_GCP_SERVICE_ACCOUNT_GUARD_KEY, true);
