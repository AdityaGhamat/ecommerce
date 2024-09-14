import Profile from "@/components/Profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: () => (
    <div>
      <Profile />
    </div>
  ),
});
