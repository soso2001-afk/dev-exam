import { Component, OnInit } from '@angular/core';
import { LeaveRequest, LeaveService } from './leave.service';


@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.css']
})
export class LeaveSummaryComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaveRequests().subscribe(
      (requests) => {
        this.leaveRequests = requests;
      },
      (error) => {
        console.error('Erreur lors du chargement des demandes de congé', error);
      }
    );
  }
}