import { IsUUID, IsString } from 'class-validator';

export class DeleteTimeSlotParamsDto {
  @IsUUID()
  @IsString()
  id: string;
}