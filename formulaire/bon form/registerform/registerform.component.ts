
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Category, SubCategory } from 'src/app/entity/categories';
import { BffService } from 'src/app/services/bff.service';
import { FormStateService } from 'src/app/services/form-state.service';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent {

  
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
  
  @ViewChild("text") text: ElementRef;
  words: any;
  wordCounter() {
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  @ViewChild('nameField') nameField! : ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private bffService: BffService,
    private renderer: Renderer2,
    private formStateService: FormStateService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.formStateService.restoreFormState(this.formName, this.form);
    this.getCategories();
  }

  ngOnDestroy(){
    this.formStateService.saveFormState(this.formName, this.form);
  }

  createForm() {
    this.form = this.formBuilder.group({
      categoriesList: ['', Validators.required ],
      selectedSubcategory: ['', Validators.required],
      identifiant:['', [Validators.pattern("^[a-zA-Z0-9]{10}$"),Validators.maxLength(10), Validators.minLength(8)]],
      emetteur:['', [Validators.pattern("^[a-zA-Z0-9]{10}$")]],
      ccn:['', [Validators.pattern("^[0-9]*$"),Validators.maxLength(7), Validators.minLength(7)]],
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
    this.selectedCategoryId = Number((event.target as HTMLSelectElement).value);
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

  onFormSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
     // return;
      this.renderer.selectRootElement(this.nameField.nativeElement).scrollIntoView({behavior: 'smooth'});
    }
  //  this.form.markAllAsTouched();
      const selectedCategory = this.getCategory(this.selectedCategoryId);
      const selectedSubCategory = this.getSubCategory(this.selectedSubCategoryId);
      const name = this.form.get('firstName')?.value;
      const mydob = this.form.get('message')?.value;

      // Send the selected category, the typoTraductionKey and the name and ...
      this.sendDataToServer({
        categoryTraductionKey: selectedCategory?.typoTraductionKey,
        subCategoryTraductionKey: selectedSubCategory?.sousTypoTraductionKey,
        name: name,
        dob: mydob
      });
  }

  getCategories() {
    const isConnected = "O";
    //handle cache
    let key = 'categories';
    this.cacheData = sessionStorage.getItem(key);
    if (this.cacheData) {
      this.categories = JSON.parse(this.cacheData);
      console.log("cacheData Categoriescompo", JSON.parse(this.cacheData));
      console.log("voila le categories", this.categories);
    }
    else {
      this.bffService.getCategories(isConnected).subscribe(
        (reponse) => {
          this.categories = reponse;
          //Save Data to cache
          sessionStorage.setItem(key, JSON.stringify(reponse))
        })
    }
  }

  sendDataToServer(data: any) {
    console.log('Data to be sent:', data);
  }

  getCategory(categoryId: number): Category | undefined {
    return this.categories.find((category) => category.typoId === categoryId);
  }

  getSubCategory(subCategoryId: number): SubCategory | undefined {
    return this.filteredSubCategories.find((subCategory) => subCategory.sousTypoId === subCategoryId);
  }


 
}


