export enum ApiFetchMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface ApiFetchArgs {
  path: string;
  method: ApiFetchMethod;
  headers?: Record<string, string>;
}

export async function apiFetch({
  path,
  method,
  headers,
}: ApiFetchArgs): Promise<string> {
  const response: Response = await window.fetch(path, {
    method,
    headers,
  });

  const responseText = await response.text();

  return responseText;
}
