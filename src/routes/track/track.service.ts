import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/types';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  createTrack(createTrackDto: CreateTrackDto): Track {
    return this.db.track.createData(createTrackDto);
  }

  getTracks(): Track[] {
    return this.db.track.getData();
  }

  getTrackById(id: Track['id']): Track | null {
    return this.db.track.getDataById(id);
  }

  updateTrackById(
    id: Track['id'],
    updateTrackDto: UpdateTrackDto,
  ): Track | null {
    return this.db.track.updateData(id, updateTrackDto);
  }

  removeTrackById(id: Track['id']): Track | null {
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return this.db.track.deleteData(id);
  }
}
