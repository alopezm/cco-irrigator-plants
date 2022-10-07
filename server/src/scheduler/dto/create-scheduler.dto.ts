import {
  IsMilitaryTime,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateSchedulerDto {
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