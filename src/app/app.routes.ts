import {RouterModule, Routes} from "@angular/router";
import {MainCalendarComponent} from "./components/main-calendar/main-calendar.component";
import {ReminderComponent} from "./components/reminder/reminder.component";

const appRoutes: Routes = [
  {path: '', component: MainCalendarComponent},
  {
    path: "remainder",
    component: ReminderComponent
  },
  {path: '**', component: MainCalendarComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes,{ useHash: false });
