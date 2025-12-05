import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka | null = null;
  private producer: Producer | null = null;

  constructor(private enabled: boolean = true) {
    if (!this.enabled) {
      console.log('⚠️ KafkaService iniciado em modo FAKE (sem Kafka).');
      return;
    }

    const brokerEnv = process.env.KAFKA_BROKER || 'kafka:9092';
    const brokers = brokerEnv.split(',').map((b) => b.trim());

    this.kafka = new Kafka({
      brokers,
      clientId: 'streamforge',
    });
  }

  async onModuleInit() {
    if (!this.enabled || !this.kafka) {
      console.log('⚠️ Kafka desativado — ignorando conexão.');
      return;
    }

    this.producer = this.kafka.producer();
    await this.producer.connect();

    console.log('✅ Kafka Producer conectado com sucesso.');
  }

  async onModuleDestroy() {
    if (!this.enabled || !this.producer) return;
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, message: any) {
    if (!this.enabled || !this.producer) {
      console.log(`⚠️ Kafka OFF → Mensagem ignorada. Topic: ${topic}`);
      return;
    }

    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log(`📨 Mensagem enviada para o tópico: ${topic}`);
  }
}
