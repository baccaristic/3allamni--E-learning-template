import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CourseComponent } from './course.component';
import { CoursesComponent } from './courses/courses.component';
import { EditComponent } from './edit/edit.component';
import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { LessonComponent } from './lesson/lesson.component';
import { LoginComponent } from './login/login.component';
import { NewpostComponent } from './newpost/newpost.component';
import { ProfileComponent } from './profile/profile.component';
import { TeacherAuthService } from './service/teacher-auth.service';
import { LoginAuthService } from './services/login-auth.service';
import { TeachComponent } from './teach/teach.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TestComponent } from './test/test.component';
import { TestviewComponent } from './testview/testview.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [{path:'home' , component :HomeComponent},{path:"addCourse" , component:AddcourseComponent , canActivate:[TeacherAuthService]},{path:"edit" , component:EditComponent},{path:"course" , component:LessonComponent , canActivate:[LoginAuthService]},{path:"login" , component:LoginComponent , canActivate:[TeacherAuthService ]},{path:"users/profile" ,component:ProfileComponent  , canActivate : [LoginAuthService]} ,{path:"New" , component:NewpostComponent , canActivate:[LoginAuthService]},{path:"" , component:HomeComponent} ,{path:"category" , component:CoursesComponent } , {path:"forum" , component:ForumComponent , canActivate:[LoginAuthService]} , {path:"thread" , component:ThreadComponent , canActivate:[LoginAuthService]} , {path:"join" , component:TeachComponent} , {path:"teacher/login" , component:TeacherLoginComponent} , {path:"teachers/profile" , component:TeacherProfileComponent} , {path:"course/pdf/view" , component:TestviewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingCompnents = [HomeComponent , ForumComponent,ProfileComponent,NewpostComponent , TestviewComponent, AddcourseComponent,TestComponent,CoursesComponent  , ThreadComponent , LoginComponent , LessonComponent , TeachComponent,EditComponent , TeacherLoginComponent , TeacherProfileComponent];