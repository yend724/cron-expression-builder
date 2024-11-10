export type Type = 'asterisk' | 'single' | 'range' | 'step'
export type ValidationSuccess = { success: true; data: string; type: Type }
export type ValidationFailure = { success: false; data: string }
export type ValidationResult = ValidationSuccess | ValidationFailure
