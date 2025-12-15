import ContadorPersonalizado from "../ContadorPersonalizado/ContadorPersonalizado";

type TecnologiaCardProps = {
  title: string;
  description: string;
};

export default function TecnologiaCard({
  title,
  description,
}: TecnologiaCardProps) {
  return (
    <div className="border rounded p-4 shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>

      <ContadorPersonalizado title={title} />
    </div>
  );
}
