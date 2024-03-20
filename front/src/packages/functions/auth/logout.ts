import { api } from "../../../services/api.service";
import { delStorageItem } from "../storage.functions";
import { toast } from "sonner";
import { UserContextValue, UserStatus } from "../../types";

export async function logout(User: UserContextValue) {
  const response = await api.logoutRequest();

  if (response.success) {
    try {
      delStorageItem("user");
      toast("Déconnexion réussie");
      User.setStatus(UserStatus.Deconnected);
      User.setName("guess");
      User.setEmail("default@gmail.com");
      User.setId(0);
    } catch {
      toast("Déconnexion réussie");
    }
  } else {
    toast("Echec lors de la déconnexion:", response.errors);
  }
}
