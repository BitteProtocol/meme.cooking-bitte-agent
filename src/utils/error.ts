export function errorString(error: unknown): string {
  if (error instanceof Error) {
    return `Error: ${error.message}\nStack: ${error.stack}`;
  }
  return "Unknown error occurred";
}