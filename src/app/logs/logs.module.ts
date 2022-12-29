import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LogsRoutingModule } from "./logs-routing.module";
import { LogsComponent } from "./logs.component";

@NgModule({
    imports: [
        CommonModule,
        LogsRoutingModule,
    ],
    declarations: [LogsComponent],
})
export class LogsModule {}