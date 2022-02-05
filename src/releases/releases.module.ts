import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ReleasesController } from './releases.controller';
import { ReleaseRespository } from './releases.repository';
import { ReleasesService } from './releases.service';

@Module({
  imports:[TypeOrmModule.forFeature([ReleaseRespository])],
  controllers: [ReleasesController],
  providers: [ReleasesService]
})
export class ReleasesModule {}
