# HeroesApp

## Dev

1. Clonar el proyecto
2. Ejectuar ```npm install```
3. Levantar backend ```npm run backend_dev```
4. Ejecutar la app ```ng serve -o``` o bien ```ng serve```

╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ 5. para la libreria de visor de PDF´s: https://pdfviewer.net/extended-pdf-viewer/getting-started                ║
║ Ejecutar ```npm i ngx-extended-pdf-viewer --save```                                                             ║
║ Chequear que este en  los assets en ```angular.json```                                                          ║
║ Agregar estas líneas a tu componente:                                                                           ║
║  * En el import statement                                                                                       ║
║ ``` import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer'; ```                                            ║
║  * En el constructor:                                                                                           ║
║    ```pdfDefaultOptions.assetsFolder = 'bleeding-edge';```                                                      ║
║ Agregar NgxExtendedPdfViewerModule en los imports del módulo donde se va a usar.                                ║ 
║  Ahora puede mostrar el archivo PDF así:                                                                        ║
║  ```<ngx-extended-pdf-viewer [src]="'assets/example.pdf'"></ngx-extended-pdf-viewer>```                         ║
╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝  
  
--
  
