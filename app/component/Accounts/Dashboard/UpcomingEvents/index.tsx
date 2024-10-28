"use client";
import EventCard from "@/app/component/Common/EventCard";
// import EventsCard from "@/app/component/EventsCard";
import SpinLoader from "@/app/component/Loader/SpinLoader";
import { useGetAllEventsQuery } from "@/redux/reducers/customerApiSlice/CustomerApiSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const UpcomingEvents = () => {
  const { data, error, isLoading } = useGetAllEventsQuery();
  const { data: session } = useSession();
  const router = useRouter();




  if (!data) return null;
  if (error) return <p>Something went wrong</p>;
  if (isLoading) return <SpinLoader size={"small"} />;

  if (session?.user?.type === "vendor") {
    router.push("/user-profile");
  }

  const events = data?.data;

  return (
    <section className="dashboard-container">
      <div className="dashboard-card">
        {events?.length > 0 ? (
          <div className={`custom-row gap-row`}>
            {events?.map((item: any, index: number) => {
              const eventData = {
                title: item?.attributes?.title,
                date: item?.attributes?.date,
                img: item?.attributes?.introductionImg?.data?.attributes?.url,
                ctaLink: item?.attributes?.slug,
                desc: item?.attributes?.shortDesc,
              };
              return (
                <div className="col_12 col_xl_4 col_lg_6" key={index}>
                  <EventCard isSmall={true} {...eventData} />
                </div>
              );
            })}
          </div>
        )
          :
          <div>
            <h6 className='mb-1'>
              There are no events at the moment.
            </h6>
            <h6>
              Stay tuned!
            </h6>
          </div>
        }
      </div>
    </section>
  );
};

export default UpcomingEvents;
