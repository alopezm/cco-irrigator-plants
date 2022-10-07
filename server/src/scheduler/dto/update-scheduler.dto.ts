import {
  IsMilitaryTime,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateSchedulerDto {
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