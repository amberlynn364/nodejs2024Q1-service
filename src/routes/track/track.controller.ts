import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from 'src/types';
import { TrackIdParams } from './params/trackId.params';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param() { id }: TrackIdParams): Track {
    const track = this.trackService.getTrackById(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Put(':id')
  updateTrackById(
    @Param() { id }: TrackIdParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    const track = this.trackService.updateTrackById(id, updateTrackDto);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  removeTrackById(@Param() { id }: TrackIdParams): void {
    const track = this.trackService.removeTrackById(id);
    if (!track) throw new NotFoundException();
  }
}
