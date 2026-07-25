export type FieldErrors = Record<string, string>;

export interface ValidationResult {
	valid: boolean;
	errors: FieldErrors;
}
