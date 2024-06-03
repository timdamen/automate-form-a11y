<template>
  <main class="">
    <h1 class="card-title">Contact page</h1>
    <p class="card-hint">
      <span aria-hidden="true">*</span>
      Fill the required fields
    </p>
    <div class="card">
      <form novalidate @submit="handleSubmit">
        <div class="field">
          <label for="email" class="field-label" :class="{ error: emailError !== '' }">
            Email
            <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            aria-required="true"
            class="field-input"
            aria-describedby="emailError"
            v-model="email"
            :aria-invalid="emailError !== ''"
            @blur="validateFieldEmail(email)"
          />
          <span class="field-hint">
            <p class="field-error" id="emailError" role="alert">
              {{ emailError }}
            </p>
          </span>
        </div>

        <div class="field">
          <label for="phone" class="field-label" :class="{ error: phoneError !== '' }">
            Phone number
            <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            class="field-input"
            aria-required="true"
            aria-describedby="phoneError phoneHint"
            :aria-invalid="phoneError !== ''"
            v-model="phone"
            @blur="validateFieldPhone(phone)"
          />
          <span class="field-hint">
            <p class="field-error" id="phoneError" role="alert">
              {{ phoneError }}
            </p>
            <p id="phoneHint">Hint: Phone number must start with 06.</p>
          </span>
        </div>

        <p
          class="form-feedback"
          :class="{ error: formFeedbackError, result: formFeedback }"
          role="alert"
        >
          {{ formFeedback }}
        </p>

        <button type="submit" class="button">Save</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const phone = ref('')
const emailError = ref('')
const phoneError = ref('')
const formFeedback = ref('')
const formFeedbackError = ref(false)

const validateFieldEmail = (email) => {
  const isEmpty = email === ''

  if (isEmpty) {
    emailError.value = 'Error: Email is required.'
  } else {
    const isEmailValid = /\S+@\S+\.\S+/.test(email)
    emailError.value = isEmailValid ? '' : 'Error: Email must contain @ and . symbols.'
  }
}
const validateFieldPhone = (phone) => {
  const isEmpty = phone === ''

  if (isEmpty) {
    phoneError.value = 'Error: Phone number is required.'
  } else {
    const isPhoneValid = /^06+/.test(phone)
    phoneError.value = isPhoneValid ? '' : 'Error: Phone number must start with 06.'
  }
}
const handleSubmit = (e) => {
  e.preventDefault()

  validateFieldEmail(email.value)
  validateFieldPhone(phone.value)

  if (emailError.value || phoneError.value) {
    const errorCount = (emailError.value ? 1 : 0) + (phoneError.value ? 1 : 0)

    formFeedbackError.value = true
    formFeedback.value =
      errorCount === 1
        ? `Error: Failed to save because ${errorCount} field is invalid.`
        : `Error: Failed to save because ${errorCount} fields are invalid.`
  } else {
    formFeedbackError.value = false
    formFeedback.value = 'Saved with success. ✅'
  }
}
</script>

<style>
html {
  font-size: 80%;
  --theme-width: 650px;
  --theme-text_0: #333;
  --theme-text_1: #6e6e6e;
  --theme-bg_0: #f7f2ed;
  --theme-bg_1: white;
  --theme-primary: blue;
  --theme-secondary: orange;

  --theme-focus-shadow: var(--theme-bg_0) 0 0 0 2px, var(--theme-secondary) 0 0 0 4px;
}
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: var(--theme-bg_0);
  color: var(--theme-text_0);
  font-family: 'arial', 'sans-serif';
  font-size: 1.6rem;
  font-weight: 300;
  box-sizing: border-box;
  line-height: 1.5;
}
body * {
  box-sizing: inherit;
}
.card {
  position: relative;
  max-width: var(--theme-width);
  width: 100%;
  padding: 24px 16px;
  border: 1px solid var(--theme-primary);
  background-color: var(--theme-bg_1);
  box-shadow: 2px 2px lightgray;
}
.card-title {
  font-size: 1.8rem;
  margin: 0;
  font-weight: 600;
}
.card-hint {
  font-size: 1.3rem;
  margin: 0;
}
.field {
  margin-bottom: 16px;
}
.field-label {
  display: block;
  line-height: 1;
  margin-bottom: 4px;
}
.field-label.error {
  color: red;
}
.field-input {
  max-width: 15rem;
  min-height: 3rem;
  border: none;
  border: 1px solid var(--theme-text_1);
  font-size: 1.6rem;
}
.field-input:focus:not(:focus-visible) {
  outline: none;
}
.field-input:focus-visible {
  outline: none;
  box-shadow: var(--theme-focus-shadow);
}
.field-hint {
  font-size: 1.4rem;
  margin-top: 4px;
  color: var(--theme-text_1);
}
.field-error {
  margin-top: 4px;
  font-size: 1.4rem;
  color: red;
}
.form-feedback {
  padding: 5px;
  padding: 0 5px 0 5px;
  margin-bottom: 10px;
}
.form-feedback.result {
  border: solid 2px green;
}
.form-feedback.error {
  border: solid 2px red;
}
.button {
  display: inline-block;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 8px 20px;
  background-color: var(--theme-primary);
  border: none;
  color: white;
  text-align: center;
}
.button:focus {
  outline: none;
  box-shadow: var(--theme-focus-shadow);
}
</style>
