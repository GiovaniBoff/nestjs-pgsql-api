import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReleaseRespository } from './releases.repository';

@Injectable()
export class ReleasesService {

    constructor(@InjectRepository(ReleaseRespository) private readonly repository: ReleaseRespository) { }
    

    async create(): Promise<any> {
        return null;
    }

    async find(): Promise<any>{
        return null;
    }

    async findById(): Promise<any>{
        return null;
    }

    async update(): Promise<any>{
        return null;
    }

    async updateStatus(): Promise<any>{
        return null;
    }

    async delete(): Promise<any>{
        return null;
    }

    
}
