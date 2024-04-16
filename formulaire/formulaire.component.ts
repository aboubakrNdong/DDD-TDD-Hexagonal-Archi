import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ICategoryStructure } from './categorymodel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  maxChars = 5;

  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    //alert(this.text.nativeElement.value)
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }



  registerForm!: FormGroup;
  submitted = false;

  countries = ['USA', 'FR', 'Canada'];
  default = 'FR';

  numberCode = ['PR(0032)', 'FR(+33)', 'IS(+35)'];
  defaultCode = 'FR(+33)';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      categoriesList: ['', Validators.required],
      sousCategoriesList: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(10)]],
      selectphone: ['FR(+33)', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pays: ['FR', Validators.required],

      // validates date format yyyy-mm-dd
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      message: ['', Validators.required],
      file: ['', Validators.required],
      fileSource: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }


  public categories: ICategoryStructure[] = [
    { id: 1, name: 'Probleme de connexion', description: 'description1', blogIds: [1, 2] },
    { id: 2, name: 'Devenir actionnaire', description: 'description2', blogIds: [3, 4] },

  ];

  public categorySelected: number = -1;
  public sousCategorie: ICategoryStructure[] = [];
  public sousCategorieSelected: number = -1;
  public showsousCategorie = false;

  public setAnotherSelect(numberId: number) {
    this.categorySelected = numberId;
    this.showsousCategorie = true;
    this.sousCategorie = [];
    switch (numberId) {
      case 1:
        this.sousCategorie = [
          { id: 4, name: 'Probléme à recourir à mes accés (identifiant)', description: 'description4', blogIds: [7, 8] },
          { id: 5, name: 'Problème à recourir à mes accès (mot de passe)', description: 'description5', blogIds: [9, 10] },
        ];
        break;
      case 2:
        this.sousCategorie = [
          { id: 6, name: 'test7', description: 'description7', blogIds: [11, 12] },
          { id: 7, name: 'test8', description: 'description8', blogIds: [13, 14] },
        ];
        break;
      default:
        this.showsousCategorie = false;
        break;
    }
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    
    const formData = new FormData();
    formData.append('file', this.registerForm.get('fileSource')?.value);
    alert('Uploaded Successfully.');
    console.log(formData);
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 20) {
        alert('la taille est trop grande!! :-)\n\n');
      }
      if (file.type != "/pdf" || "/png" || "/jpeg") {
        alert('Veuillez choisir le bon format de fichier:-)\n\n');
      }
        this.registerForm.patchValue({
          fileSource: file
        });
    }
  }
}
