import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeroSearchComponent } from "../hero-search/hero-search.component";
import { HeroesRoutingModule } from "./heroes-routing.module";
import { HeroesComponent } from "./heroes.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HeroesRoutingModule,
        NgbModule,
    ],
    declarations: [
        HeroesComponent,
        HeroSearchComponent,
    ],
})
export class HeroesModule {}