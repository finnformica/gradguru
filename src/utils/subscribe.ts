import { addData } from "../../firebase/utils";
import { AlertState } from "../types";

const subscribe = async (
  email: string,
  setState: (state: AlertState) => void,
  state: AlertState
) => {
  const { result, error } = await addData(
    { email, subscribed: true },
    email,
    "mail-list"
  );

  if (error) {
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
      message: "Subscription successful!",
      title: "Success!",
    });
  }

  await addData(
    {
      to: email,
      message: welcomeEmailConfig,
    },
    null,
    "mail"
  );
};

const welcomeEmailConfig = {
  subject: "Welcome to Gradguru",
  text: `
        Welcome! 
  
        Thank you for signing up to Gradguru - we are excited to have you on board. Gradguru is a platform that helps you find the right graduate program for you. We do this by providing you with the tools to find the right program, the right school, and the right funding. Our goal is to help you find the right program for you, and to help you get into that program.
        Gradguru is currently in beta, and we are working hard to make it the best platform for you. Thank you for joining us on this journey.
  
        Best,
        The Gradguru Team
    `,
  html: `
      <h1>Welcome!</h1>
  
      <p>Thank you for signing up to Gradguru - we are excited to have you on board. Gradguru is a platform that helps you find the right graduate program for you. We do this by providing you with the tools to find the right program, the right school, and the right funding. Our goal is to help you find the right program for you, and to help you get into that program.</p>
      <p>Gradguru is currently in beta, and we are working hard to make it the best platform for you. Thank you for joining us on this journey.</p>
      
      <p>Best,</p>
      <p>The Gradguru Team</p>
    `,
};

export { subscribe };
