import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  // things that can be used as dependencies for other classes
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
