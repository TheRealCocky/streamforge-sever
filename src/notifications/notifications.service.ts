import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(private gateway: NotificationsGateway) {}

  sendProcessed(videoId: string) {
    this.gateway.notifyProcessingDone(videoId);
  }
}
