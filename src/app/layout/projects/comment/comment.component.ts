import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../../services/commentService';
import { ProjectDto } from '../../../dto/projectDto';
import { CommentDto } from '../../../dto/commentDto';
import { CountDto } from '../../../dto/countDto';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [ CommentService ]
})
export class CommentComponent implements OnInit {

  @Input() projectId: number;
  
  public content: string = "";
  private commentInt;
  public imgSrc: string;
  public comments: Array<CommentDto>;

  constructor(private commentService: CommentService) {
    this.comments = [];
  }

  ngOnInit() {
    this.imgSrc = localStorage.getItem('profileImg');

    this.getNotReadCommentsList(true);

    this.commentInt = setInterval(() => {
      this.getNotReadCommentsList(false);
    }, 3000);

    setTimeout(() => {
      var textarea = document.querySelector('textarea');
      textarea.addEventListener('keydown', autosize);
      function autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          el.style.cssText = 'height:' + (el.scrollHeight + 20) + 'px';
        },0);
        document.getElementById('charCounter').innerHTML =
            (<HTMLInputElement>document.getElementById('commentBox')).value.length+'/99';
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.commentInt) {
      clearInterval(this.commentInt);
    }
  }

  private getNotReadCommentsList(firstTime: Boolean) {
    this.commentService.getNotReadComments(this.projectId).subscribe(
      (data) => {
        if ( firstTime === true) {
             if(data.length === 0){
              this.getLast();
             }else{
              for(var i of data) {
                this.comments.unshift(i);
              }
              this.getCommentPagination(this.comments[this.comments.length - 1].id);
             }
        } else {
          for(var i of data) {
            this.comments.unshift(i);
          }
        }
      },
      error => console.log(error)
    );
  }

  public createComment() {
    var comment = new CommentDto();
    comment.project = new ProjectDto();
    comment.content = this.content;
    comment.project.id = this.projectId;

    this.commentService.createComment(comment).subscribe(
      (data) => {
        this.comments.unshift(data);
      },
      error => console.log(error)
    );

    this.content = '';
  }

  public deleteComment(id) {
    this.commentService.deleteComment(id).subscribe(
      (data) => {
        
      },
      error => console.log(error)
    );
  }

  public getLast(){
    this.commentService.getLastComment(this.projectId).subscribe(
      (data) => {
        for(var i of data) {
          this.comments.push(i);
        }
      },
      error => console.log(error)
    );
  }

  public getCommentPagination(pMessId: number) {
    var paging = new CountDto();
    paging.amount = 10;
    paging.pMessId = pMessId;

    this.commentService.getCommentPagination(this.projectId, paging).subscribe(
      (data) => {
        for(var i of data){
           this.comments.push(i);
        }
      },
      error => console.log(error)
    );
  }
}