import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

interface Project {
  title: string;
  description: string;
  url: string;
  safeUrl?: SafeResourceUrl;
  image?: string;
}

interface ProjectCategory {
  name: string;
  projects: Project[];
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects {
  private sanitizer = inject(DomSanitizer);

  categories: ProjectCategory[] = [
    {
      name: 'First Grading',
      projects: [
        {
          title: 'PAULAR-WELLORD_APPDEV1_FG',
          description: 'First grading project demonstrating Angular fundamentals and component structure.',
          url: 'https://wellord-paular.github.io/PAULAR-WELLORD_APPDEV1_FG/',
          image: 'assets/fg1.jpeg'
        },
        {
          title: 'Product Catalog',
          description: 'A product catalog application showcasing Angular directives and data binding.',
          url: 'https://wellord-paular.github.io/APPDEV1-product-catalog/',
          image: 'assets/fg2.jpeg'
        }
      ]
    },
    {
      name: 'Midterms',
      projects: [
        {
          title: 'Search Application',
          description: 'A search feature implementation with Angular reactive forms and services.',
          url: 'https://wellord-paular.github.io/APPDEV1_MG_SEARCH/',
          image: 'assets/mg1.jpeg'
        },
        {
          title: 'Task Manager v2',
          description: 'Enhanced task management application with improved UI/UX.',
          url: 'https://wellord-paular.github.io/APPDEV1-Task-Manager-v2/',
          image: 'assets/mg2.jpeg'
        },
        {
          title: 'Task Manager',
          description: 'Original task management application demonstrating CRUD operations.',
          url: 'https://wellord-paular.github.io/APPDEV1-Task-Manager/',
          image: 'assets/mg3.jpeg'
        },
        {
          title: 'Task Manager v3',
          description: 'Latest version with advanced features and state management.',
          url: 'https://wellord-paular.github.io/APPDEV1-Task-Manager-v3/',
          image: 'assets/mg4.jpeg'
        },
        {
          title: 'Midterm Exam Project',
          description: 'Comprehensive project demonstrating midterm learnings.',
          url: 'https://wellord-paular.github.io/PAULAR-WELLORD_APPDEV1_MIDTERM_EXAM/',
          image: 'assets/mg5.jpeg'
        }
      ]
    },
    {
      name: 'Finals',
      projects: [
        {
          title: 'Volunteer Management System',
          description: 'A comprehensive volunteer management platform demonstrating full-stack development.',
          url: 'https://gabel141.github.io/VolunteerManagementSystem/',
          image: 'assets/finals1.jpeg'
        }
      ]
    }
  ];

  constructor() {
    this.categories = this.categories.map(category => ({
      ...category,
      projects: category.projects.map(project => ({
        ...project,
        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(project.url)
      }))
    }));
  }
}

