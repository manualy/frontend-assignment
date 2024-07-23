interface SessionCache {
  email: string | null;
  accessToken: string | null;
}

interface SessionState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type Session = SessionCache & SessionState;

type ReducerActionType = "isLoading" | "isError" | "login" | "logout";

interface SessionReducerAction<GAction extends ReducerActionType, GPayload> {
  type: GAction;
  payload: GPayload;
}

interface SessionReducerActionWithoutPayload<
  GAction extends ReducerActionType
> {
  type: GAction;
}

type SessionReducerActions =
  | SessionReducerAction<"login", SessionCache>
  | SessionReducerAction<"isError", Session["error"]>
  | SessionReducerActionWithoutPayload<"isLoading">
  | SessionReducerActionWithoutPayload<"logout">;

export type SessionReducerDispatch = React.Dispatch<SessionReducerActions>;

export const initalState: Session = {
  isAuthenticated: window.localStorage.getItem("accessToken") !== null,
  email: window.localStorage.getItem("email"),
  accessToken: window.localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,
};

export const sessionReducer = (
  state: Session,
  action: SessionReducerActions
): Session => {
  switch (action.type) {
    case "login": {
      window.localStorage.setItem("email", action.payload.email!);
      window.localStorage.setItem("accessToken", action.payload.accessToken!);

      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: true,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
      };
    }

    case "logout": {
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("accessToken");

      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: null,
        email: null,
        accessToken: null,
      };
    }

    case "isError": {
      return { ...state, isLoading: false, error: action.payload };
    }

    case "isLoading": {
      return { ...state, isLoading: true };
    }

    default: {
      return initalState;
    }
  }
};
