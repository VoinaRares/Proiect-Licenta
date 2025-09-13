import { User } from "./model/user";

export async function CreateUserAPI(
  email: string,
  password: string,
  username: string
) {
  const backendUrl = process.env.BACKENDAPI;
  let response = await fetch(backendUrl + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      active: true,
    }),
  });

  response = await response.json();
  return response;
}

async function fetchUsers(): Promise<User[]> {
   const backendUrl = process.env.BACKENDAPI;
  const response = await fetch(backendUrl + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function emailExists(email: string): Promise<boolean> {
  
  const emails = await fetchUsers()
    .then((data: User[]) => data.map((user) => user.email));
  return emails.includes(email);
}

export async function usernameExists(username: string): Promise<boolean> {
  const users = await fetchUsers()
    .then((data: User[]) => data.map((user) => user.username));
  return users.includes(username);
}
