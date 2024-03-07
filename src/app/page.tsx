import { UserList } from "@/features/user/user-list/components/user-list";

export default function Home() {
  return (
    <main className="container mx-auto">
      <UserList />
      <UserList />
      <UserList />
      <UserList />
    </main>
  );
}
