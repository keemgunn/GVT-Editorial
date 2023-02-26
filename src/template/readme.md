

## How to implement this template

You have to import `useTemplate` from `./template` and call it inside of `App.vue`.

Here is example : 
```
// inside App.vue

import { useTemplate } from './template';
useTemplate();
```


## Settings

All settings are set to default values. 

To customize settings, copy the settings files in '@/template/defaults' into '@/settings' and mutate values in the copied file. 

Then go to `@/template/settings/index.ts` and change the import source directory (you can just comment/uncomment lines.)



## External Packages

### @vueform/slider
https://github.com/vueform/slider#demo?ref=madewithvuejs.com