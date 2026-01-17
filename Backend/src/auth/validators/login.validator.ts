export function validateLoginInput(
  email: string,
  password: string
): void {
  if (!email || !password) {
    throw new Error("Invalid credentials");
  }
}