import React from "react";
import OutletDetail from "@/app/component/Accounts/Dashboard/OutletDetail";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Outlet Details - Reef Mall',
}
const OutletDetailPage = () => {
  return <OutletDetail />;
};

export default OutletDetailPage;
