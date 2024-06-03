import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'

import App from './App.vue'

function setup() {
  const utils = render(App)

  const emailInput = screen.getByRole('textbox', { name: 'Email' })
  const phoneInput = screen.getByRole('textbox', { name: 'Phone number' })
  const submitButton = screen.getByRole('button', { name: 'Save' })

  return {
    emailInput,
    phoneInput,
    submitButton,
    ...utils
  }
}

describe('Contact form - App.vue', () => {
  it('renders properly', () => {
    const { container } = setup()

    expect(!!container.parentNode).toBeTruthy()
  })

  it('has email and phone number with correct labels', async () => {
    const { emailInput, phoneInput } = setup()

    expect(emailInput).toHaveAccessibleName('Email')
    expect(emailInput).not.toHaveAccessibleName('Email*')
    expect(phoneInput).toHaveAccessibleName('Phone number')
    expect(phoneInput).not.toHaveAccessibleName('Phone number*')
  })

  it('has email and phone number as the correct input types', async () => {
    const { emailInput, phoneInput } = setup()

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(phoneInput).toHaveAttribute('type', 'tel')
  })

  it('has email and phone number as required form elements', async () => {
    const { emailInput, phoneInput } = setup()

    expect(emailInput).toBeRequired()
    expect(phoneInput).toBeRequired()
  })

  it('has a accessible hint for the phone number input', async () => {
    const { phoneInput } = setup()

    expect(phoneInput).toHaveAccessibleDescription(
      expect.stringMatching('Hint: Phone number must start with 06.')
    )
  })

  it('shows an error message when email is empty', async () => {
    const { emailInput } = setup()

    await userEvent.click(emailInput)
    await userEvent.tab()

    expect(emailInput).toBeInvalid()
    expect(emailInput).toHaveAccessibleDescription('Error: Email is required.')
  })

  it('shows an error message when phone number is empty', async () => {
    const { phoneInput } = setup()

    await userEvent.click(phoneInput)
    await userEvent.tab()

    expect(phoneInput).toBeInvalid()
    expect(phoneInput).toHaveAccessibleDescription(
      expect.stringMatching('Error: Phone number is required.')
    )
  })

  it('shows an error messages when save is click and form is empty', async () => {
    const { submitButton } = setup()

    await userEvent.click(submitButton)

    const generalErrorMessage = screen.getByText(
      'Error: Failed to save because 2 fields are invalid.',
      { selector: 'p' }
    )

    expect(generalErrorMessage).toBeInTheDocument()
  })

  // it('Speaks the empty form state correct with VoiceOver', async () => {
  //   const { container } = setup()

  //   // Start the Virtual Screen Reader.
  //   await virtual.start({ container: container.parentNode })

  //   // Navigate your environment with the virtual screen reader just as your users would
  //   while ((await virtual.lastSpokenPhrase()) !== 'end of form') {
  //     await virtual.next()
  //   }

  //   // Assert on what your users would really see and hear when using screen readers
  //   expect(await virtual.spokenPhraseLog()).toEqual([
  //     'document',
  //     'heading, Contact page, level 1',
  //     'Fill the required fields',
  //     'form',
  //     'Email',
  //     'textbox, Email, not invalid, required',
  //     'Phone number',
  //     'textbox, Phone number, Hint: Phone number must start with 06., not invalid, required',
  //     'Hint: Phone number must start with 06.',
  //     'button, Save',
  //     'end of form'
  //   ])

  //   // Stop your virtual screen reader instance
  //   await virtual.clearSpokenPhraseLog()
  //   await virtual.stop()
  // })

  //   it('Speaks the assertive error messages correct with VoiceOver', async () => {
  //     const { emailInput, phoneInput, submitButton, container } = setup()

  //     // Start the Virtual Screen Reader.
  //     await virtual.start({ container: container.parentNode })

  //     // Use the app as an user would
  //     await userEvent.click(emailInput)
  //     await userEvent.type(emailInput, 'test')
  //     await userEvent.tab()

  //     await userEvent.click(phoneInput)
  //     await userEvent.type(phoneInput, '1234567890')
  //     await userEvent.tab()

  //     await userEvent.click(submitButton)

  //     // Assert on what your users would really see and hear when using screen readers
  //     expect(await virtual.spokenPhraseLog()).toEqual([
  //       'document',
  //       'textbox, Email, not invalid, required',
  //       'textbox, Phone number, Hint: Phone number must start with 06., not invalid, required',
  //       'assertive: Error: Email must contain @ and . symbols.',
  //       'button, Save',
  //       'assertive: Error: Phone number must start with 06.',
  //       'assertive: Error: Failed to save because 2 fields are invalid.'
  //     ])

  //     // Stop your virtual screen reader instance
  //     await virtual.clearSpokenPhraseLog()
  //     await virtual.stop()
  //   })
})
