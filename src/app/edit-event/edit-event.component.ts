import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent {
  loading: boolean = false;
  authState: any = null;
  id: string = '';
  event: any = null;
  checkboxlist: any = [];
  checkboxformarray: Array<any> = [];
  radiooptions_1: any;
  default_radio: any;
  default_checkboxes: any;
  categories = [{
    id: 1, name: '10-15 years', value: null
  },
  {
    id: 2, name: '15-18 years', value: null
  },
  {
    id: 3, name: '18+ years', value: null
  },
  ]

  onChange(name: string, isChecked: boolean) {
    // console.log("checked", name, isChecked)
    let main_index = this.categories.findIndex(n => n.name == name)
    // console.log("main_index", main_index)
    if (isChecked) {
      this.checkboxformarray.push(name);
      this.checkboxlist = this.checkboxformarray
      this.categories[main_index].value = true
    } else {
      let index = this.checkboxformarray.indexOf(name);
      this.checkboxformarray.splice(index, 1);
      this.categories[main_index].value = false
      this.checkboxlist = this.checkboxformarray
    }
  }


  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.getEvent(param.id);
      this.id = param.id;
      // console.log(this.id, "current record id");
    });

  }


  public submit(form: NgForm): void {
    this.checkboxformarray = this.categories.filter(elem => elem.value == true)
    var check_box = []
    this.checkboxformarray.forEach((elem, index) => {
      check_box.push(elem.name)
    })
    if (form.valid) {
      this.loading = true;
      const data = form.value;
      data['radiooptions'] = this.radiooptions_1;
      data['Checkboxvalue'] = check_box;
      // console.log(data['Checkboxvalue'], "data['Checkboxvalue']");
      this.firestore
        .collection('events')
        .doc(this.id)
        .update(data)
        .then(() => {
          this.loading = false;
          this.router.navigate(['events', this.id]);
        });
    }
  }

  getEvent(id: string) {
    this.firestore
      .collection('events')
      .doc(id)
      .ref.get()
      .then((doc: any) => {
        const key = doc.id;
        const data = doc.data();
        this.default_radio = doc.data().radiooptions;
        this.radiooptions_1 = this.default_radio;
        this.event = { ...data, key };
        this.default_checkboxes = doc.data().Checkboxvalue.reverse()
        // console.log("this.default_checkboxes", this.default_checkboxes);
        this.default_checkboxes.forEach((element, index) => {
          for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name == element) {
              // console.log("this.categories[index].name", this.categories[i].name)
              this.categories[i].value = true
            }
          }
        });
        // console.log("this.default_checkboxes", this.categories);

      });
  }
}
