import { SignupFormData } from "../types/SignupFormData";

export function getAuthData(formData: FormData): SignupFormData {
  return {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
  };
}
