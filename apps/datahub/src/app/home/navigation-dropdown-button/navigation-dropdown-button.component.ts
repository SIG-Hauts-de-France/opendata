import { Component, Input } from '@angular/core';

@Component({
  selector: 'datahub-dropdown-button',
  templateUrl: './navigation-dropdown-button.component.html',
  styleUrls: ['./navigation-dropdown-button.component.css'],
})

export class DropdownButtonComponent {
  @Input() label = '';
  showDropdown = false;

  toggleDropdown(show: boolean): void {
    this.showDropdown = show;
  }
}