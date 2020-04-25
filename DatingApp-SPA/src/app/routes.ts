import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
export const appRoutes:Routes=[
    {path:'',component:HomeComponent},
    {
        path:'',
        canActivate:[AuthGuard],
        children:[
            {path:'messages',component:MessagesComponent},
            {path:'lists',component:ListsComponent},
            {path:'members',component:MemberListComponent}
        ]
    },
    {path:'**',redirectTo:'',pathMatch:'full'},
];