import { EntityRepository, Repository } from "typeorm";
import { Release } from "./release.entity";

@EntityRepository(Repository)
export class ReleaseRespository extends Repository<Release>{
    
}