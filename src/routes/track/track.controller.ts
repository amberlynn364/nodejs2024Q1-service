import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackIdParams } from './params/trackId.params';
import { Track } from '@prisma/client';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(createTrackDto);
  }

  @Get()
  getTracks(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param() { id }: TrackIdParams): Promise<Track> {
    return this.trackService.getTrackById(id);
  }

  @Put(':id')
  updateTrackById(
    @Param() { id }: TrackIdParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateTrackById(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeTrackById(@Param() { id }: TrackIdParams): Promise<void> {
    await this.trackService.removeTrackById(id);
  }
}
