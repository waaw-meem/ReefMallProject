import style from "./index.module.scss";

type tabProps = {
  select: any;
  tab: any;
  data?: any;
};

const SearchTabs = ({ select, tab, data }: tabProps) => {
  return (
    <div className={style.tabWrapper}>
      <button
        className={tab === "brand" ? style.active : ""}
        onClick={() => select("brand")}
      >
        <span>Brands ({data?.["brand"]?.length || 0})</span>
      </button>
      {/* <button
        className={tab === "amenities-page" ? style.active : ""}
        onClick={() => select("amenities-page")}
      >
        <span>Amenities ({data?.["amenities-page"]?.length || 0})</span>
      </button> */}
      <button
        className={tab === "brand-offer" ? style.active : ""}
        onClick={() => select("brand-offer")}
      >
        <span>Offers ({data?.["brand-offer"]?.length || 0})</span>
      </button>
      <button
        className={tab === "event" ? style.active : ""}
        onClick={() => select("event")}
      >
        <span>Events ({data?.["event"]?.length || 0})</span>
      </button>
      {/* <button
        className={tab === "cuisine" ? style.active : ""}
        onClick={() => select("cuisine")}
      >
        <span>Cuisine ({data?.["cuisine"]?.length || 0})</span>
      </button>
      <button
        className={tab === "eat-category-page" ? style.active : ""}
        onClick={() => select("eat-category-page")}
      >
        <span>Eat Category ({data?.["eat-category-page"]?.length || 0})</span>
      </button>
      <button
        className={tab === "shop-category-page" ? style.active : ""}
        onClick={() => select("shop-category-page")}
      >
        <span>Shop category ({data?.["shop-category-page"]?.length || 0})</span>
      </button>
      <button
        className={tab === "eat-page" ? style.active : ""}
        onClick={() => select("eat-page")}
      >
        <span>Eat ({data?.["eat-page"]?.length || 0})</span>
      </button>
      <button
        className={tab === "faq-page" ? style.active : ""}
        onClick={() => select("faq-page")}
      >
        <span>Faqs ({data?.["faq-page"]?.length || 0})</span>
      </button>
      <button
        className={tab === "home-page" ? style.active : ""}
        onClick={() => select("home-page")}
      >
        <span>Home page ({data?.["home-page"]?.length || 0})</span>
      </button>
      <button
        className={tab === "latest-happening-eat-page" ? style.active : ""}
        onClick={() => select("latest-happening-eat-page")}
      >
        <span>
          Latest happening Eat(
          {data?.["latest-happening-eat-page"]?.length || 0})
        </span>
      </button>
      <button
        className={tab === "latest-happening-shop-page" ? style.active : ""}
        onClick={() => select("latest-happening-shop-page")}
      >
        <span>
          Latest happening Shop(
          {data?.["latest-happening-shop-page"]?.length || 0})
        </span>
      </button>
      <button
        className={tab === "offers-page" ? style.active : ""}
        onClick={() => select("offers-page")}
      >
        <span>Offers page ({data?.["offers-page"]?.length || 0})</span>
      </button>
      <button
        className={tab === "pivacy-page" ? style.active : ""}
        onClick={() => select("pivacy-page")}
      >
        <span>Privacy policy ({data?.["pivacy-page"]?.length || 0})</span>
      </button> */}
      {/* <button
        className={tab === "service" ? style.active : ""}
        onClick={() => select("service")}
      >
        <span>Services ({data?.["service"]?.length || 0})</span>
      </button> */}
      <button
        className={tab === "service-card" ? style.active : ""}
        onClick={() => select("service-card")}
      >
        <span>Services ({data?.["service-card"]?.length || 0})</span>
      </button>
      {/* <button
        className={tab === "shop-page" ? style.active : ""}
        onClick={() => select("shop-page")}
      >
        <span>Shop ({data?.["shop-page"]?.length || 0})</span>
      </button>
      <button
        className={tab === "terms-page" ? style.active : ""}
        onClick={() => select("terms-page")}
      >
        <span>terms-page ({data?.["terms-page"]?.length || 0})</span>
      </button> */}
    </div>
  );
};

export default SearchTabs;
