export async function CreateUserAPI(
  email: string,
  password: string,
  username: string
) {
  const backendUrl = process.env.BACKENDAPI;
  const res = await fetch(backendUrl + "/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      active: true,
    }),
  });

  if (!res.ok) {
    throw new Error(`Sign-up failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function emailExists(email: string): Promise<boolean> {
  const backendUrl = process.env.BACKENDAPI;
  const res = await fetch(
    `${backendUrl}/auth/email-exists?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Email check failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function usernameExists(username: string): Promise<boolean> {
  const backendUrl = process.env.BACKENDAPI;
  const res = await fetch(
    `${backendUrl}/auth/username-exists?username=${encodeURIComponent(username)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`Username check failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
