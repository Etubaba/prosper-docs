import { BASE_URL } from "@/constant";
import { cookies } from "next/headers";

import axios from "axios";

export const revalidateToken = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("_t4t5wm");
  const refreshToken = cookie?.value;
  try {
    // const token = getCookie("_t4t5wm");
    const field = {
      refreshToken,
    };

    const { data } = await axios.post(BASE_URL + "auth/refresh", field);
    if (data) {
      console.log("refresh ok", data);

      cookieStore.set("_t4t5wm", data.refreshToken, {
        maxAge: 60 * 60 * 60 * 31,
        secure: true,
      });
      cookieStore.set("_er3434", data.accessToken, {
        secure: true,
        maxAge: 60 * 60 * 60 * 7,
      });
    }
  } catch (err: any) {
    console.log(err.response.data.message);
    // redirect("/auth");
  }
};
