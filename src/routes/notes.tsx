import { createFileRoute, Outlet } from '@tanstack/react-router'

// Layout route for /notes. Renders an Outlet so child routes
// (/notes/ index and /notes/$slug articles) actually mount.
// The index list lives in routes/notes/index.tsx.
export const Route = createFileRoute('/notes')({
  component: WritingLayout,
})

function WritingLayout() {
  return <Outlet />
}
