import Banner from "@/app/component/Common/Banner"
import Breadcrumb from "@/app/component/Common/Breadcrumb"
import ContactUsComp from "@/app/component/ContactUs"
import { getApiData } from "@/app/utilities/function"

export async function generateMetadata() {
    const resp = await getApiData("contact-us");
    const data = resp?.data?.attributes;


    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}

const ContactUs = async () => {

    const contactUsPage = await getApiData('contact-us')
    const contactData = contactUsPage?.data?.attributes

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        contactData?.seo?.structuredData ? contactData?.seo?.structuredData : ""
                    ),
                }}
            />
            <Banner
                title={contactData?.banner?.title}
                src={contactData?.banner?.desktopImg?.data?.attributes?.url}
                mobileSrc={contactData?.banner?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <ContactUsComp
                title={contactData?.headings?.title}
                subtitle={contactData?.headings?.desc}
                desc={contactData?.aboutUSheading}
                img={contactData?.getInTouchImg?.data?.attributes?.url}
                locationTitle={contactData?.locationSection?.title}
                locationArray={contactData?.locationSection?.values}
                emailTitle={contactData?.emailSection?.title}
                data={contactData?.emailSection?.values}
                phoneTitle={contactData?.phoneSection?.title}
                data2={contactData?.phoneSection?.values}
                smTitle={contactData?.socialMedia?.title}
                values={contactData?.socialMedia?.values}
                formTitle={contactData?.getInTouchSection?.title}
                formSubtitle={contactData?.getInTouchSection?.desc}
                formDesc={contactData?.fillOutFormMessage}
                locationIcon={contactData?.locationSection?.icon?.data?.attributes?.url}
                emailIcon={contactData?.emailSection?.icon?.data?.attributes?.url}
                phoneIcon={contactData?.phoneSection?.icon?.data?.attributes?.url}
                shareIcon={contactData?.socialMedia?.icon?.data?.attributes?.url}
            />
            {/* <ReserveForm color={"purple"} /> */}
        </>
    )
}

export default ContactUs