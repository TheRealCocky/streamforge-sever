import { Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}
  @Post('test')
  async sendTestMessage() {
    await this.kafkaService.sendMessage('test-topic', { msg: 'Hello Kafka!' });
    return { status: 'Mensagem enviada!' };
  }
}
