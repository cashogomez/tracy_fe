import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploadComponent } from './files-upload.component';
import { FilesUploadDirective } from './files-upload.directive';

import { MatDialogModule } from '@angular/material/dialog';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';
import { UploadComponent } from './components/upload/upload.component';
import { FileSizePipe } from "./pipes/file-size/file-size.pipe";

@NgModule({
    declarations: [
        FilesUploadComponent,
        FilesUploadDirective,
        DropZoneDirective,
        UploadComponent,
        FileSizePipe
    ],
    exports: [
        FilesUploadDirective
    ],
    imports: [
        CommonModule,
        MatDialogModule
    ]
})
export class FilesUploadModule { }
