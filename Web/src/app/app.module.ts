import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course.component';
import { AboutComponent } from './teachers/about.component';
import { WorkersComponent } from './workers/workers.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { ProfileComponent } from './profile/profile.component';
import {AccountInfoService}  from './services/account-info.service'
import { HttpClientModule } from '@angular/common/http';
import { NewpostComponent } from './newpost/newpost.component';
import { CoursesComponent } from './courses/courses.component';
import { ThreadComponent } from './thread/thread.component';
import { JoinComponent } from './join/join.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LessonComponent } from './lesson/lesson.component';
import { WorkerComponent } from './worker/worker.component';
import { TestComponent } from './test/test.component';
import { TeachComponent } from './teach/teach.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { LoginAuthService } from './services/login-auth.service';
import { EditComponent } from './edit/edit.component';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeacherAuthService } from './service/teacher-auth.service';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TestviewComponent } from './testview/testview.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    AboutComponent,
    WorkersComponent,
    FooterComponent,
    NavbarComponent,
    CategoryComponent,
    HomeComponent,
    ForumComponent,
    ProfileComponent,
    NewpostComponent,
    CoursesComponent,
    ThreadComponent,
    JoinComponent,
    LoginComponent,
    LessonComponent,
    WorkerComponent,
    TestComponent,
    TeachComponent,
    AddcourseComponent,
    EditComponent,
    TeacherLoginComponent,
    TeacherProfileComponent,
    TestviewComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    NgbModule,
    PdfViewerModule,
    FormsModule
  ],
  providers: [AccountInfoService ],
  bootstrap: [AppComponent , LoginAuthService , TeacherAuthService]
})
export class AppModule { }
