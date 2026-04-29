type Props = { success: boolean; message: string };

export default function CardSetup({ success, message }: Props) {
  return (
    <div>
      <span className={success ? "c-green" : "c-red"}>{message}</span>
    </div>
  );
}
