import toHaveNoViolations from '@chialab/vitest-axe'
import { expect } from 'vitest'

expect.extend(toHaveNoViolations)
