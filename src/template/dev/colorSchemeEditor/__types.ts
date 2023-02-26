import type Color from 'color';

export { }
declare global {


  interface PivotColor {
    hue: number;
    saturation: number;
  }

  interface ColorGrade {
    roleName: string;
    colorCategory: string;
    gradeNumber: string;
  }

}