export const userLogin = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await fetch("https://timtest.timenotes.io/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Login failed. Try again.");
  }

  return response.json();
};
