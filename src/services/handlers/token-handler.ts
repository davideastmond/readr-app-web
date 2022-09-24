export class TokenHandler {
  public static setLoginToken(token: string, userId: string) {
    const storage = window.sessionStorage;
    storage.setItem("token", token);
    storage.setItem("userId", userId);
  }

  public static setToken(key: string, value: string): void {
    const storage = window.sessionStorage;
    storage.setItem(key, value);
  }

  public static getToken(key: string): string | null {
    const storage = window.sessionStorage;
    const val = storage.getItem(key);
    return val;
  }
}
