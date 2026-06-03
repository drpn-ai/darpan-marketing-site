import { createFileRoute, Outlet } from '@tanstack/react-router'

// Layout route for /writing. Renders an Outlet so child routes
// (/writing/ index and /writing/$slug articles) actually mount.
// The index list lives in routes/writing/index.tsx.
export const Route = createFileRoute('/writing')({
  component: WritingLayout,
})

function WritingLayout() {
  return <Outlet />
}
