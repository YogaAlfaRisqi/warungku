import { Outlet } from "react-router";

export default function GuestLayout() {
  return (
    <>
      <div>
        <div>
          <h2>Welcome to Waroengku</h2>
          <p>Smart Inventory & Sales App</p>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <Outlet />
    </>
  );
}
