import { createFileRoute } from "@tanstack/react-router";
import Authentication from "@/pages/Authentication";
export const Route = createFileRoute("/auth")({
  component: () => <Authentication />,
});
