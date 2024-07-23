import { createContext, useMemo, useReducer } from "react";
import { useMutation } from "react-query";
import { userLogin } from "../api/login";
import { initalState, Session, sessionReducer } from "../store/SessionReducer";

export type SessionContextValue = Session & {
  login: (params: { email: string; password: string }) => void;
  logout: () => void;
};

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export function SessionContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [session, dispatch] = useReducer(sessionReducer, initalState);

  const mutate = useMutation(userLogin, {
    onMutate: () => {
      dispatch({
        type: "isLoading",
      });
    },
    onSuccess: (data) => {
      dispatch({
        type: "login",
        payload: {
          email: data.email,
          accessToken: data.accessToken,
        },
      });
    },
    onError: (error: Error) => {
      dispatch({
        type: "isError",
        payload: error.message,
      });
    },
  });

  const contextValue = useMemo(
    () => ({
      ...session,
      login: (params: { email: string; password: string }) =>
        mutate.mutate(params),
      logout: () => dispatch({ type: "logout" }),
    }),

    [mutate, session]
  );

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}
