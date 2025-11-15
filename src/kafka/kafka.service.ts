import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    const brokerEnv = process.env.KAFKA_BROKER || 'localhost:9092';
    const brokers = brokerEnv.split(',').map(b => b.trim());

    this.kafka = new Kafka({ brokers });
  }

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    console.log('Kafka Producer conectado →', this.kafka);
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
