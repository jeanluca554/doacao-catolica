import { Form } from "react-router";

type AuthButtonProps = {
  provider: "google" | "facebook";
  children: React.ReactNode;
};

function AuthButton({ children, provider }: AuthButtonProps) {
  const actionURL = `/api/auth/${provider}`;

  return (
    <Form method="POST" action={actionURL} className="flex flex-col flex-1">
      <button
        type="submit"
        className={[
          "flex justify-center items-center gap-4 min-h-11",
          "text-(--text-body) text-sm font-semibold leading-[19.07px]",
          "rounded-md border border-(--border) bg-transparent",
          "hover:brightness-95 cursor-pointer",
          "disabled:cursor-not-allowed disabled:brightness-95 disabled:text-(--text-muted)",
          "max-[500px]:min-h-10 max-[500px]:gap-2",
          provider === "google" && "text-[#4285f4]",
          provider === "facebook" && "text-[#3b5998]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </button>
    </Form>
  );
}

export { AuthButton };
