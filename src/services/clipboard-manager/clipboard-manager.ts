// Handles clipboard stuff (for sharing links)
export class ClipboardManager {
  public static async writeText(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }
}
