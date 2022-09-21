import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './layout/layout/components/not-found/not-found/not-found.component';
import { AuthorComponent } from './author/author.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/recipes",
        pathMatch: "full"
      },
      {
        path: "recipes",
        loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule),
        data: {title: "Recipes"}
      },
      {
        path: "contact",
        loadChildren: () => import("./contact/contact.module").then(m => m.ContactModule),
        data: {title: "Contact"}
      },
      {
        path: "author",
        component: AuthorComponent,
        data: {title: "Author"}
      },
      {
        path: "login",
        loadChildren: () => import("./auth/auth.module").then(m=>m.AuthModule),
        component: LoginComponent,
        data: {title: "Login"}
      },
      {
        path: "register",
        component: RegisterComponent,
        data: {title: "Register"}
      },
      {
        path: "profile",
        loadChildren: () => import("./profile/profile.module").then(m=>m.ProfileModule),
        component: ProfileComponent,
        data: {title: "Profile"}
      },
      {
        path: "admin",
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
        component: AdminComponent,
        data: {title: "Admin"}
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: {title: "Page not found"}
      },
      {
        path: "**",
        redirectTo: "/404",
        pathMatch: "full"
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    RouterModule.forRoot(routes),
    SharedModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
