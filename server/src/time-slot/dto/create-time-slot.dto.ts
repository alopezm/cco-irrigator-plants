import {
  IsMilitaryTime,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateTImeSlotDto {
  @IsMilitaryTime()
  @IsString()
  startHour: string;

  @IsMilitaryTime()
  @IsString()
  endHour: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}