# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Demo Mode

This branch supports a frontend-only guest showcase for deployments without a backend.

- Guest login credentials: `guest` / `guest`
- The guest account is persisted in browser storage so refreshes keep the demo session alive
- The seeded demo list includes planned, watching, and completed items
- On Vercel, you can enable the demo behavior with `VITE_GUEST_MODE=true` if you want to force it explicitly
