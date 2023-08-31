import { AlertState } from "@/components/globalTypes";

const subscribe = async (
  email: string,
  setState: (state: AlertState) => void,
  state: AlertState
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/convertkit/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  if (response.status !== 200) {
    setState({
      ...state,
      open: true,
      severity: "error",
      message: "Something went wrong. Please try again later.",
      title: "Error!",
    });
  } else {
    setState({
      ...state,
      open: true,
      severity: "success",
      message: "Please check your email for a confirmation link.",
      title: "Success!",
    });
  }
};

export { subscribe };
