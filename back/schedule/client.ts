import { credentials } from '@grpc/grpc-js';
import {
  AddCronRequest,
  AddCronResponse,
  CronServiceClient,
  DeleteCronRequest,
  DeleteCronResponse,
} from '../protos/cron';
import config from '../config';

class Client {
  private client = new CronServiceClient(
    `localhost:${config.cronPort}`,
    credentials.createInsecure(),
  );

  addCron(request: AddCronRequest['crons']): Promise<AddCronResponse> {
    return new Promise((resolve, reject) => {
      this.client.addCron({ crons: request }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  delCron(request: DeleteCronRequest['ids']): Promise<DeleteCronResponse> {
    return new Promise((resolve, reject) => {
      this.client.delCron({ ids: request }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}

export default new Client();
