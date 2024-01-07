import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { GalleriaModule } from 'primeng/galleria';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';
import {SelectButtonModule} from 'primeng/selectbutton';
import {MultiSelectModule} from 'primeng/multiselect';

let list = [
  SidebarModule,
  PanelMenuModule,
  DropdownModule,
  InputTextModule,
  InputNumberModule,
  ButtonModule,
  RippleModule,
  CheckboxModule,
  InputTextareaModule,
  GalleriaModule,
  PasswordModule,
  ToolbarModule,
  TagModule,
  ToastModule,
  DialogModule,
  KeyFilterModule,
  TabViewModule,
  FileUploadModule,
  InputMaskModule,
  TableModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  EditorModule,
  ChipsModule,
  SelectButtonModule,
  MultiSelectModule
];
@NgModule({
  declarations: [],
  imports: list,
  exports: list,
})
export class PrimengListModule {}
