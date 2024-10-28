import UpcomingEvents from "@/app/component/Accounts/Dashboard/UpcomingEvents";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Upcoming Events - Reef Mall',
}

const UpcomingEventsPage = () => {
  return <UpcomingEvents />;
};

export default UpcomingEventsPage;
