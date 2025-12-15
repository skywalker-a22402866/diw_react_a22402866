import ContadorPersonalizado from "../ContadorPersonalizado/ContadorPersonalizado";

type TecnologiaDetailsCardProps = {
  title: string;
  details: string;
};

export default function TecnologiaDetailsCard({
  title,
  details,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="border rounded p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="mb-6">{details}</p>

      <ContadorPersonalizado title={title} />
    </div>
  );
}
