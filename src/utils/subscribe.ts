import { addData } from "../../firebase/utils";

const subscribe = async (email: string) => {
  const { result, error } = await addData(
    { email, subscribed: true },
    email,
    "mail-list"
  );

  if (error) {
    console.log("error", error);
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
