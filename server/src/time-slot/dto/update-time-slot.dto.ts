import {
  IsMilitaryTime,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateTimeSlotDto {
  @IsOptional()
  @IsMilitaryTime()
  @IsString()
  startHour?: string;

  @IsOptional()
  @IsMilitaryTime()
  @IsString()
  endHour?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}