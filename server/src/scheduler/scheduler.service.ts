import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Scheduler } from "./scheduler.entity";

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(Scheduler)
    private schedulerRepository: Repository<Scheduler>,
  ) {}

  async createScheduler() {
    // return this.schedulerRepository.save();
  }

  async deleteScheduler() {
    // return this.schedulerRepository.delete();
  }

  async getAllSchedulers() {
    // return this.schedulerRepository.find();
  }

  async updateScheduler() {
    // return this.schedulerRepository.update();
  }

  async getSchedulerById() {
    // return this.schedulerRepository.findOne();
  }

  async executeScheduler() {
    // TODO: implement this
  }
}