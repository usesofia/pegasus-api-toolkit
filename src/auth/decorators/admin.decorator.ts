import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '@app/auth/guards/admin.guard';

export const Admin = () => UseGuards(AdminGuard);
