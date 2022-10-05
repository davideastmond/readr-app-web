export class TokenHandler {
  public static setAuthToken(token: string, userId: string) {
    const storage = window.sessionStorage;
    storage.setItem("token", token);
    storage.setItem("userId", userId);
  }

  public static setToken(key: string, value: string): void {
    const storage = window.sessionStorage;
    storage.setItem(key, value);
  }

  public static getToken(): string | null {
    const storage = window.sessionStorage;
    const val = storage.getItem("token");
    if (val === "null" || val === "undefined") return null;
    return val;
  }

  public static clearAuthToken() {
    const storage = window.sessionStorage;
    storage.removeItem("token");
    storage.removeItem("userId");
  }

  public static clearToken(key: string): void {
    const storage = window.sessionStorage;
    storage.removeItem(key);
  }
}
