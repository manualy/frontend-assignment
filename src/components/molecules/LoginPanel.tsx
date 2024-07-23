import { Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSessionContext } from "../../hooks/useSessionContext";
import { LoginButton } from "../atoms/LoginButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Bunny } from "../../icons/Bunny";
import { useCallback } from "react";
import classNames from "classnames";

interface IFormInput {
  email: string;
  password: string;
}

export const LoginPanel = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInput>();
  const { isLoading, login, error, clearError } = useSessionContext();

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    (data) => {
      login(data);
    },
    [login]
  );

  return (
    <form
      className="flex flex-col gap-4 max-w-lg w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-center w-full py-8">
        <Bunny
          width={64}
          height={64}
          className={classNames(
            error ? "fill-red-500" : "animate-fill-gradient-primary"
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
          }}
          render={({ field }) => (
            <Input
              placeholder="Email"
              type="email"
              {...field}
              onFocus={clearError}
              status={errors.email || error ? "error" : ""}
            />
          )}
        />
        {errors.email && (
          <p className="pl-2 text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
          }}
          render={({ field }) => (
            <Input
              placeholder="Password"
              type="password"
              {...field}
              onFocus={clearError}
              status={errors.password || error ? "error" : ""}
            />
          )}
        />
        {errors.password && (
          <p className="pl-2 text-red-500">{errors.password.message}</p>
        )}
      </div>
      {error && (
        <p className="text-center text-red-500">
          Dane niepoprawne. Spróbuj jeszcze raz.
        </p>
      )}
      <div className="pt-6 w-full flex flex-col">
        {isLoading ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <LoginButton onClick={handleSubmit(onSubmit)} disabled={!isValid} />
        )}
      </div>
    </form>
  );
};
