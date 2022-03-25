import { Component, OnInit,Inject} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ArticleService } from 'src/app/service/article.service';
import {Articles} from "../../model/Articles";
import {AddArticleComponent} from "../add-article/add-article.component";
@Component({
  selector: 'app-list-article',
  templateUrl: './ListArticle.component.html',
  styles: [
  ]
})
export class ListArticleComponent implements OnInit {
  //list !: Articles[];
  constructor(public crudApi: ArticleService,
              public toastr: ToastrService,
              private router: Router,
              public fb: FormBuilder,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<AddArticleComponent>,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.list = response["hydra:member"];
      }
    );
  }
  removeData(id:number) {
    if (window.confirm('Etes vous sur de vouloir suppprimer cette article ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            this.toastr.warning('Article supprimer avec succes!');
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item : Articles) {
    //permet de choisir entre update et add
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";

    this.matDialog.open(AddArticleComponent, dialogConfig);
  }


  addArticles()
  {
      //permet de choisir entre update et add
      this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddArticleComponent, dialogConfig);
    }
  }

