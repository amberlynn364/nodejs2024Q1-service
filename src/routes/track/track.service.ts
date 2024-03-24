import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  createTrack(data: CreateTrackDto): Promise<Track> {
    return this.db.track.create({ data });
  }

  getTracks(): Promise<Track[]> {
    return this.db.track.findMany();
  }

  getTrackById(id: Track['id']): Promise<Track> {
    return this.db.track.findUniqueOrThrow({ where: { id } });
  }

  updateTrackById(id: Track['id'], data: UpdateTrackDto): Promise<Track> {
    return this.db.track.update({
      where: { id },
      data,
    });
  }

  removeTrackById(id: Track['id']): Promise<Track> {
    return this.db.track.delete({ where: { id } });
  }
}
