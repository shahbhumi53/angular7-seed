import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  notifySuccess(message: string) {
    this.toastr.success('Success!', message);
  }

  notifyFailure(message: string) {
    this.toastr.error('', message);
  }

}

