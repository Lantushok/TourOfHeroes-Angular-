import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  heroForm: FormGroup;
  @Input() hero: Hero;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private location: Location,
              private heroService: HeroService
    ) { }

  ngOnInit() {
    this.initHeroForm();
    this.onChanges();
    this.getHero();

  }
  initHeroForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.required, Validators.maxLength(15)])]
    });
  }
  onChanges() {
    this.heroForm.valueChanges.subscribe(val => {
      if (this.heroForm.valid) {
        this.hero.name = val.name;
      }
    });
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }


}
