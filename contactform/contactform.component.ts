
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Category, SubCategory } from 'src/app/entity/categories';
import { BffService } from 'src/app/services/bff.service';
import { FormStateService } from 'src/app/services/form-state.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent {
  formName = 'form'
  categories: Category[] = []; // Data containing categories and subcategories
  form: FormGroup;
  selectedCategoryId: number;
  filteredSubCategories: SubCategory[] = [];
  selectedSubCategoryId: number;
  cacheData: any;
  submitted = false;
  countries = ['USA', 'FR', 'Canada'];
  default = 'FR';
  numberCode = ['PR(0032)', 'FR(+33)', 'IS(+35)'];
  defaultCode = 'FR(+33)';
  maxChars = 5;
  wordCount: any;
  characters: any;
  placeholderTrad ="";
  placeHolderText="";

  @ViewChild("text") text: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  //translate: any;

  constructor(
    public translate: TranslateService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private bffService: BffService,
    private renderer: Renderer2,
    private formStateService: FormStateService,
    private Translate: TranslateService,
  ) { }

  ngOnInit(): void {

   

    this.createForm();
    this.formStateService.restoreFormState(this.formName, this.form);
    this.getCategories();
    this.charactersCounter();

   
}

showPlaceholder (): void{
  this.translate.get('form.field.placeholder').subscribe((translated: string) => {
    // You can call instant() here
    this.placeholderTrad = translated;
    console.log("show placeholderTrad" + this.placeholderTrad);

    this.placeHolderText = this.placeholderTrad.split(" <br />").join("\n"); 
    
    //this.textPlace = this.placetrans.replace(/(\r\n|\n|\r)/g,"<br />");
    console.log("show placeHolderText" + this.placeHolderText);
  });
}

  ngAfterViewInit () : void {
    if(this.text){
      this.text.nativeElement.addEventListener('input', () => {
        this.charactersCounter();
      })
    }
  }

  ngOnDestroy() {
    this.formStateService.saveFormState(this.formName, this.form);
  }

  createForm() {
    this.form = this.formBuilder.group({
      categoriesList: ['', Validators.required],
      selectedSubcategory: ['', Validators.required],
      identifiant: ['', [Validators.pattern("^[a-zA-Z0-9]{10}$"), Validators.maxLength(10), Validators.minLength(8)]],
      emetteur: ['', [Validators.pattern("^[a-zA-Z0-9]{10}$")]],
      ccn: ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(7), Validators.minLength(7)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      selectphone: ['FR(+33)', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3), Validators.maxLength(10)], this.phoneprefixValidator()],
      email: ['', [Validators.required, Validators.email]],
      pays: ['FR', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      message: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  private phoneprefixValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors| null> => {
    const telephone = control.value;
    return new Promise((resolve, reject)=> {
      if(telephone && !telephone.startsWith('06') && !telephone.startsWith('07')){
        resolve({invalidPrefix: true});
    } else {
      resolve(null);}
    });
    }
  }


  onCategorySelect(event: Event) {
    this.selectedCategoryId = Number((event.target as HTMLSelectElement)?.value);
    const selectedCategory = this.categories.find(
      (category) => category.typoId === this.selectedCategoryId
    );
    this.filteredSubCategories = selectedCategory
      ? selectedCategory.sousCategories
      : [];
    this.form.patchValue({ selectedSubcategory: '' });
  }

  onSubCategorySelect(event: Event) {
    this.selectedSubCategoryId = Number((event.target as HTMLSelectElement).value);
  }

  charactersCounter() {
    this.characters = this.text ? this.text.nativeElement.value.length : 0;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.renderer.selectRootElement(this.nameField.nativeElement).scrollIntoView({ behavior: 'smooth' });
      return;
    }
    //  this.form.markAllAsTouched();
    const selectedCategory = this.getCategory(this.selectedCategoryId);
    const selectedSubCategory = this.getSubCategory(this.selectedSubCategoryId);
    const identifiant = this.form.get('identifiant')?.value;
    const emetteur = this.form.get('emetteur')?.value;
    const ccn = this.form.get('ccn')?.value;
    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;
    const selectphone = this.form.get('selectphone')?.value;
    const telephone = this.form.get('telephone')?.value;
    const email = this.form.get('email')?.value;
    const pays = this.form.get('pays')?.value;
    const dob = this.form.get('dob')?.value;
    const message = this.form.get('message')?.value;
    const acceptTerms = this.form.get('acceptTerms')?.value;

    const data = {
      category: this.Translate.instant(selectedCategory?.typoTraductionKey as string),
      subCategory: this.Translate.instant(selectedSubCategory?.sousTypoTraductionKey as string),
      emetIden: identifiant,
      tituNume: emetteur,
      actiIden: ccn,
      firstName: firstName,
      lastName: lastName,
      selectphone: selectphone,
      telephone: telephone,
      email: email,
      pays: pays,
      dob: dob,
      message: message,
      acceptTerms: acceptTerms,
    }
    // Send the selected category, the typoTraductionKey and the name and ...
    this.sendDataToServer(data);
  }


  getCategories() {
    const isConnected = this.loginService.isAuthenticated() ? 'O' : 'N';
    //handle cache
    let key = 'categories';
    this.cacheData = sessionStorage.getItem(key);
    if (this.cacheData) {
      this.categories = JSON.parse(this.cacheData);
    }
    else {
      this.bffService.getCategories(isConnected).subscribe(
        (reponse) => {
          if(reponse){
            this.categories = reponse;
            //Save Data to cache
            sessionStorage.setItem(key, JSON.stringify(reponse))
          }else {
            console.log('reponse from server is null')
          }
        },
        (error)=> {
          console.log('can not get categories', error);
        }
        );
    }
  }

  
  sendDataToServer(data: any) {
  //  console.log('Data to be sent:', data);
    this.bffService.createDemande(data).subscribe(
      async () => {

        //TODO display a popin when submit is success

        await console.log('Demande crée avec succés!!')
      },
      async (error: HttpErrorResponse) => {
        await console.log(`Erreur de création de la requete: ${error.message}`);
      }
    );
  }


  getCategory(categoryId: number): Category | undefined {
    if(this.categories){
      return this.categories.find((category) => category.typoId === categoryId);
    }
    else {
      console.log("categories is null");
      return;
    }
  }

  getSubCategory(subCategoryId: number): SubCategory | undefined {
    return this.filteredSubCategories.find((subCategory) => subCategory.sousTypoId === subCategoryId);
  }
}


