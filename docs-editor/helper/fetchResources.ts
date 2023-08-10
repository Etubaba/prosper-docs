import { revalidateToken } from "./revalidateToken";
import { cookies } from "next/headers";

export async function fetchResources(urls: string[]) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("_er3434");
  const token = cookie?.value;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const fetchPromises = urls.map((url) => fetch(url, { headers }));
    const responses = await Promise.all(fetchPromises);
    const responseData = await Promise.all(
      responses.map((response) => response.json())
    );

    if (
      responseData[0].statusCode === 403 ||
      responseData[0].statusCode === 401
    ) {
      revalidateToken();
    }

    return responseData;
  } catch (error: any) {
    revalidateToken();
    console.log(error);

    return [];
  }
}
