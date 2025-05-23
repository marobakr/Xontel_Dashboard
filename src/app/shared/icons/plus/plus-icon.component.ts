import { Component } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  standalone: true,
  imports: [],
  template: `<svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 2.5C10.4602 2.5 10.8333 2.8731 10.8333 3.33333V9.16667H16.6667C17.1269 9.16667 17.5 9.53976 17.5 10C17.5 10.4602 17.1269 10.8333 16.6667 10.8333H10.8333V16.6667C10.8333 17.1269 10.4602 17.5 10 17.5C9.53976 17.5 9.16667 17.1269 9.16667 16.6667V10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 10C2.5 9.53976 2.8731 9.16667 3.33333 9.16667H9.16667V3.33333C9.16667 2.8731 9.53976 2.5 10 2.5Z"
      fill="#202224"
    />
  </svg> `,
})
export class PlusIconComponent {}
