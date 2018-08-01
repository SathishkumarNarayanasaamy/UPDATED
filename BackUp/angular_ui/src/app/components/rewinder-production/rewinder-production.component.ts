import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../helper/base.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { WinderService } from '../../services/winder.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rewinder-production',
  templateUrl: './rewinder-production.component.html',
  styleUrls: ['./rewinder-production.component.css']
})

export class RewinderProductionComponent extends BaseComponent implements OnInit {
  myControl = new FormControl();
  loginForm: FormGroup;
  public formValid: Boolean = true;
  public invalidLogin: Boolean = true;
  filteredOptions: Observable<string[]>;
  options: string[];

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    // private auth: AuthService,
    private winderService: WinderService
  ) {
    super();
  }

  form: any;
  section_1: any;
  section_2: any;
  section_3: any;

  showAdd: boolean = false;

  ngOnInit() {
    this.buildForm();
    this.getAllJumbos();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this._filter(value) : null)
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option['winder_lot_id'].toLowerCase().includes(filterValue));
  }

  // validation for login
  buildForm() {
    // Section 1
    this.section_1 = new FormGroup({
      prod_date: new FormControl(moment(new Date()).format('DD-MMM-YYYY hh:mm'), []),
      shift: new FormControl("A", [Validators.required]),
      user_id: new FormControl('USR123', [Validators.required]),
      shift_engineer: new FormControl('', []),
      rewinder_no: new FormControl('', []),
      winder_lot_query: new FormControl('', []),
      batch_no: new FormControl('', []),
      transaction_type: new FormControl('', [])
    });
    // Section 2
    this.section_2 = new FormGroup({
      winder_lot_id: new FormControl('', [Validators.required]),
      winder_item: new FormControl('', [Validators.required]),
      actual_wt: new FormControl('', [Validators.required]),
      by_prod: new FormControl('', [Validators.required]),
      by_qc: new FormControl('', [Validators.required]),
      df_code: new FormControl('', [Validators.required]),
      fd: new FormControl('', []),
      md: new FormControl('', []),
      bd: new FormControl('', [])
    });
    // Section 2
    this.section_3 = new FormGroup({
      width: new FormControl('', [Validators.required]),
      item_code: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      dia: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      qchk: new FormControl('', [Validators.required]),
      qcstat: new FormControl('', [Validators.required]),
      dfcode: new FormControl('', [Validators.required]),
      qc_dest: new FormControl('', [Validators.required]),
      fd: new FormControl('', []),
      md: new FormControl('', []),
      bd: new FormControl('', []),
      lot_number: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
    });

    //Form build
    this.form = this._fb.group({
      'section_1': this.section_1,
      'section_2': this.section_2,
      'section_3': this.section_3
    });
  }

  // Add jumbo
  add(valid: boolean, form: any) {
    console.log(valid, form);
    if (this.section_2.valid) {
      this.winderService.addJumbo(form)
        .subscribe(
          data => {
            console.log(data);
            if (data.status === 200) {
              // this.isLogged(data.item);
            } else {
              console.log('error');
              alert('Sorry, something went wrong. Please try again later');
            }
          },
          error => {
            console.log('Error:', error);
            alert('Sorry, something went wrong. Please try again later');
          });
    } else {
      this.formValid = false;
    }
  }


  allJumbos: any;
  getAllJumbos() {
    this.winderService.getJumboDetails().subscribe(
      data => {
        console.log('getAllJumbos', data);
        if (data.status === 200) {
          this.options = data['result'];
        } else {
          console.log('error');
          alert('Sorry, something went wrong. Please try again later');
        }
      },
      error => {
        console.log('Error:', error);
        alert('Sorry, something went wrong. Please try again later');
      });
  }

  selectedWinder: any;
  onWinderSelect(obj) {
    console.log('onWinderSelect', obj);
    this.selectedWinder = obj;
    this.getAllBreaks(obj['_id']);
    this.form.controls.section_2.patchValue(obj);
  }


  selectedJumboBreaks: any;
  getAllBreaks(_id) {
    this.winderService.getJumboBreaks(_id).subscribe(
      data => {
        console.log('getAllBreaks', data);
        if (data.status === 200) {
          this.selectedJumboBreaks = data['result'];
        } else {
          console.log('error');
        }
      },
      error => {
        console.log('Error:', error);
        alert('Sorry, something went wrong. Please try again later');
      });
  }

  sec3Submited: boolean = true;
  addBreaks() {
    if (this.section_3.valid) {
      this.section_3['value']['jumbo_db_id'] = this.selectedWinder['_id'];
      this.section_3['value']['jumbo_lot_id'] = this.selectedWinder['_id'];
      this.winderService.addJumboBreaks(this.section_3['value']).subscribe(
        data => {
          console.log('add breaks', data);
          if (data.status === 200) {
            this.getAllBreaks(this.selectedWinder['_id']);
            this.showAdd = !this.showAdd;
          } else {
            console.log('error');
            alert('Sorry, something went wrong. Please try again later');
          }
        },
        error => {
          console.log('Error:', error);
          alert('Sorry, something went wrong. Please try again later');
        });
    } else {
      this.sec3Submited = false;
    }
  }


  selectedIndex: any;
  selectedLot: any;
  showBarCode(index, lot_number) {
    this.selectedIndex = index;
    this.selectedLot = lot_number;
  }


  delete(index, _id) {
    console.log('delete', index, _id);
    this.winderService.deleteJumboBreaks(_id).subscribe(
      data => {
        if (data.status === 200) {
          this.getAllBreaks(this.selectedWinder['_id']);
          // this.showAdd = !this.showAdd;
          alert('Breaks successfully deleted.');
        } else {
          console.log('error');
          alert('Sorry, something went wrong. Please try again later');
        }
      },
      error => {
        console.log('Error:', error);
        alert('Sorry, something went wrong. Please try again later');
      });
  }
}
