export const AUTHENTICATION_SUBJECT = () => {
  return {
    subject: "Welcome to Magicboard!",
    body: "",
  };
};

export const ACCEPTED_SUBJECT = (projectName: string | undefined) => {
  return {
    subject: `Congrats on slaying!`,
    body: `You have successfully slain the bounty ${projectName}!`,
  };
};
export const DECLINED_SUBJECT = (projectName: string | undefined) => {
  return {
    subject: `Unfortunately yours have been declined`,
    body: `Unfortunately Bounty ${projectName} has been slain by other hunter :(`,
  };
};

export const DELIVERED_SUBJECT = (hunter: string | undefined) => {
  return {
    subject: `${hunter} just delivered the project`,
    body: `${hunter} just delivered the project, check it out!`,
  };
};

export const JOIN_BOUNTY_SUBJECT = (
  projectTitle: string | undefined,
  hunter: string | undefined
) => {
  return {
    subject: `A new hunter is hunting ${projectTitle} bounty`,
    body: `${hunter} started hunting ${projectTitle} bounty`,
  };
};

// const WITHDRAW_SUBJECT = `We're transferring money to your Paypal account`;
