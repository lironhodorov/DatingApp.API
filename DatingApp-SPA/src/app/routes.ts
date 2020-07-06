import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver} from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

export const appRoutes:Routes=[
    {path:'',component:HomeComponent},
    {
        path:'',
        canActivate:[AuthGuard],
        children:[
            {path:'messages',component:MessagesComponent},
            {path:'lists',component:ListsComponent},
            {path:'members',component:MemberListComponent,resolve:{users:MemberListResolver}},
            {path:'members/:id',component:MemberDetailComponent,resolve:{user: MemberDetailResolver}}
        ]
    },
    {path:'**',redirectTo:'',pathMatch:'full'},
];