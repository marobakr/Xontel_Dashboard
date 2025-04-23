import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expand-more-icon',
  standalone: true,
  imports: [],
  template: `<svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.00008 3.92504L1.91256 0.837522C1.68475 0.609716 1.31541 0.609716 1.0876 0.837522C0.859797 1.06533 0.859797 1.43467 1.0876 1.66248L4.5876 5.16248C4.81541 5.39029 5.18475 5.39029 5.41256 5.16248L8.91256 1.66248C9.14037 1.43467 9.14037 1.06533 8.91256 0.837522C8.68475 0.609716 8.31541 0.609716 8.0876 0.837522L5.00008 3.92504Z"
     [attr.fill]=color
    />
    <mask
      id="mask0_2003_171"
      style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="10"
      height="6"
    >
      <path
        d="M5.00008 3.92504L1.91256 0.837522C1.68475 0.609716 1.31541 0.609716 1.0876 0.837522C0.859797 1.06533 0.859797 1.43467 1.0876 1.66248L4.5876 5.16248C4.81541 5.39029 5.18475 5.39029 5.41256 5.16248L8.91256 1.66248C9.14037 1.43467 9.14037 1.06533 8.91256 0.837522C8.68475 0.609716 8.31541 0.609716 8.0876 0.837522L5.00008 3.92504Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_2003_171)"></g>
  </svg>`,
})
export class ExpandMoreIconComponent {
  @Input() color: string = '#646464';
}
