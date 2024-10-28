import Banner from "@/app/component/Common/Banner"
import Breadcrumb from "@/app/component/Common/Breadcrumb"
import SearchComp from "@/app/component/SearchComp"
import { getApiData } from "@/app/utilities/function"

const Search = async () => {
    const servicePage = await getApiData('services')
    const servicePageData = servicePage?.data?.attributes
    return (
        <>
            <Banner
                title={"Search"}
                src={servicePageData?.banner?.desktopImg?.data?.attributes?.url}
                mobileSrc={servicePageData?.banner?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <SearchComp />
        </>
    )
}

export default Search