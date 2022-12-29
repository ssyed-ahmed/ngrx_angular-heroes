import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatisticsRoutingModule } from "./statistics-routing.module";
import { StatisticsComponent } from "./statistics.component";

@NgModule({
    imports: [
        CommonModule,
        StatisticsRoutingModule,
    ],
    declarations: [StatisticsComponent],
})
export class StatisticsModule {}