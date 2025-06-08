import ViewUser from "@/features/user/components/ViewUser";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <ViewUser id={id} />
    </div>
  );
}
