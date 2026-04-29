type Props = { username: string; hostname: string };

export default function Prompt({ username, hostname }: Props) {
  return (
    <span className="text-accent whitespace-nowrap shrink-0 mr-2">
      {username}@{hostname}:~
    </span>
  );
}
