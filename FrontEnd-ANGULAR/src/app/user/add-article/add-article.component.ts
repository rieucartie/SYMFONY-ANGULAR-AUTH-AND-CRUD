import { Component, OnInit,Inject } from '@angular/core';
import {  ArticleService } from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import {CategoryService} from "../../service/category.service";
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styles: [

  ]
})
export class AddArticleComponent implements OnInit {
  num : any;
  title : any;
  slug! :string;
  content ! :string;
  picture ! :string;
  category ! :string;

  constructor(public crudApi: ArticleService, public fb: FormBuilder, public toastr: ToastrService,
    public CategoryService: CategoryService,
    private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<AddArticleComponent>) { }
  get f() { return this.crudApi.formData.controls }

  ngOnInit() {

    if (this.crudApi.choixmenu == "A") {
      this.InfoForm()
    }
    this.CategoryService.getAll().subscribe(
      response => {
        this.CategoryService.list = response["hydra:member"];
      }
    );

  }
  //validator
  InfoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      title : ['', [Validators.required]],
      content : ['', [Validators.required]],
      slug : ['', [Validators.required]],
      picture: ['', [Validators.required]],
      category: ['', [Validators.required]]

    });
  }

  resetForm() {
    this.crudApi.formData.reset();
  }
  onSubmit() {
      if (this.crudApi.choixmenu == "A") {
        this.addData();
      }
     else {
       this.updateData()
      }
  }

  lister()
  {
    this.router.navigate(['/articles']);
  }

 addData() {
   this.crudApi.formData.value.category = String("/api/categories/"+this.crudApi.formData.value.category);
    this.crudApi.createData(this.crudApi.formData.value).subscribe(data => {
      this.dialogRef.close();
        this.data = data;
        this.crudApi.categoryid = String("/api/categories/" + this.data.id);
        this.toastr.success('articles ajoutée avec Succes');
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response["hydra:member"];
            },
        );

      }
    );
  }

  updateData() {
    // en cas de fk
    this.crudApi.formData.value.category= String( "/api/categories/"+this.crudApi.formData.value.category);
   // si on enleve le string (.. on obtient l'id de categories 1,2 ..
    this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
      subscribe((data: any) => {
        this.toastr.success('Modification faite avec Success');
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response["hydra:member"];}
         );
        this.router.navigate(['/articles']);
      });
  }
  onChange($event:any){
  }

}

