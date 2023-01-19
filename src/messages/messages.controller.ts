import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-essge.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    // FIXME: DON'T DO THIS ON REAL APPS
    this.messagesService = new MessagesService();
  }

  /**
   * Return all the messages in the system
   * @returns all the messages
   */
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  /**
   * This method get executed whenever a POST request is made
   * @param body Request payload. `CreateMessageDto` type tells class transformer to transform the body to CreateMessageDto object
   */
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  /**
   * Finds a message stored at the specified id
   * @param id Id of the required message
   * @returns message record with the specified id
   */
  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
