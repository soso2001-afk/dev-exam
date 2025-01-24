import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { LeaveRequest, LeaveService } from './leave.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-leave',
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.css'],
    imports: [ReactiveFormsModule, CommonModule],
})
export class RequestLeaveComponent {
  leaveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router
  ) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required],
      comments: [''],
    });
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) {
      return;
    }

    const leaveRequest: LeaveRequest = this.leaveForm.value;
    this.leaveService.submitLeaveRequest(leaveRequest).subscribe(
      () => {
        this.router.navigate(['/leave-summary']);
      },
      (error) => {
        console.error('Erreur lors de la soumission de la demande de congé', error);
      }
    );
  }
}