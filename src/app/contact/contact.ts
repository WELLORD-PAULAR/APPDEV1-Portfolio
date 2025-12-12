import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact {
  private fb = inject(FormBuilder);

  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.submitError.set('Please fill in all fields correctly');
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submitSuccess.set(false);

    const formData = this.contactForm.value;

    // Send email using EmailJS
    // Replace these with your actual EmailJS credentials
    const serviceID = 'service_w70wqvp';  // Your EmailJS service ID
    const templateID = 'template_5biboei'; // Your EmailJS template ID
    const publicKey = '8RQuNv9gw1yQktF59';     // Your EmailJS public key

    const emailData = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey,
      template_params: {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: '20187455@s.ubaguio.edu'
      }
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })
      .then((response) => {
        if (response.ok) {
          this.submitSuccess.set(true);
          this.contactForm.reset();
          setTimeout(() => this.submitSuccess.set(false), 5000);
        } else {
          throw new Error('Failed to send email');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        this.submitError.set('Failed to send message. Please try again later.');
      })
      .finally(() => {
        this.isSubmitting.set(false);
      });
  }
}
