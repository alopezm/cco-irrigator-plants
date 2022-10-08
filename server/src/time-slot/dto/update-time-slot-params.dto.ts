import { IsUUID, IsString } from 'class-validator';

export class UpdateTimeSlotParamsDto {
  @IsUUID()
  @IsString()
  id: string;
}