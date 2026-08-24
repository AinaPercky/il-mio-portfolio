export interface MailtoMessage {
  recipient: string;
  subject: string;
  body: string;
}

export const buildMailtoUrl = ({ recipient, subject, body }: MailtoMessage): string => {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${recipient}?${params.toString()}`;
};
