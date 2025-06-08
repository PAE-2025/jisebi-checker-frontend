import EditUser from "@/features/user/components/EditUser";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <EditUser id={id} />
    </div>
  );
}
