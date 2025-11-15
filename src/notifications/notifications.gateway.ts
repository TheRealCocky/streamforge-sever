import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  notifyProcessingDone(videoId: string) {
    this.server.emit('video_processed', { videoId });
  }
}
