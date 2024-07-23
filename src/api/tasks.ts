export interface Task {
  id: number;
  name: string;
  bookmarked: boolean;
}

export interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface ListTasksResponse {
  data: Task[];
  meta: Meta;
}

export const listTasks = async (
  token: string,
  payload: {
    per_page: number;
    page: number;
  }
): Promise<ListTasksResponse> => {
  const url = new URL("https://timtest.timenotes.io/api/v1/tasks");
  url.searchParams.append("per_page", payload.per_page.toString());
  url.searchParams.append("page", payload.page.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Fetch failed. Try again.");
  }

  return response.json();
};

export const addNewTask = async (token: string, task: Omit<Task, "id">) => {
  const url = new URL("https://timtest.timenotes.io/api/v1/tasks");

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Fetch failed. Try again.");
  }

  return response.json();
};

export const addBookmark = async (token: string, taskId: number) => {
  const url = new URL(
    `https://timtest.timenotes.io/api/v1/tasks/${taskId}/bookmark`
  );

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Fetch failed. Try again.");
  }

  return response.json();
};

export const removeBookmark = async (token: string, taskId: number) => {
  const url = new URL(
    `https://timtest.timenotes.io/api/v1/tasks/${taskId}/unbookmark`
  );

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Fetch failed. Try again.");
  }

  return response.json();
};
