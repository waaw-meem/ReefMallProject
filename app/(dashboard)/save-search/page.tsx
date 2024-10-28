import SaveSearch from "@/app/component/Accounts/Dashboard/SaveSearch";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Saved Searches - Reef Mall',
}
const SaveSearchPage = () => {
  return <SaveSearch />;
};

export default SaveSearchPage;
