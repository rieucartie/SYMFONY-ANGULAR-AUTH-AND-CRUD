import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  exports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule]
})
export class SharedModule {}
