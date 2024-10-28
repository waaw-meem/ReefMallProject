import Banner from "@/app/component/Common/Banner"
import StoreLocatorComp from "@/app/component/Common/StoreLocator"


const StoreLocator = async () => {


    return (
        <>
            <Banner
                title={"Store Locator"}
                src={"/assets/images/store/desk.jpg"}
                mobileSrc={"/assets/images/store/mob.jpg"}
            />
            <StoreLocatorComp />

        </>
    )
}

export default StoreLocator