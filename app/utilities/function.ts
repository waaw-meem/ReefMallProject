import { apiEndpoint } from "./constant";

export const getParam = (param: string) => {
  switch (param) {
    case "general":
      return apiEndpoint.general;
    case "shop":
      return apiEndpoint.shop;
    case "offer":
      return apiEndpoint.offer;
    case "brandCategory":
      return apiEndpoint.brandCategory;
    case "ShopCategories":
      return apiEndpoint.ShopCategories;
    case "brands":
      return apiEndpoint.brands;
    case "shopCategoryPage":
      return apiEndpoint.shopCategoryPage;
    case "eat":
      return apiEndpoint.eatPage;
    case "eatBrands":
      return apiEndpoint.eatBrands;
    case "eatBrandCategory":
      return apiEndpoint.eatBrandCategory;
    case "eatCategoryPage":
      return apiEndpoint.eatCategoryPage;
    case "giftCardPage":
      return apiEndpoint.giftCardPage;
    case "cards":
      return apiEndpoint.cards;
    case "giftCard-detail":
      return apiEndpoint.cardDetail;
    case "privacy-policy":
      return apiEndpoint.privacyPolicyPage;
    case "faq":
      return apiEndpoint.faqPage;
    case "terms-and-services":
      return apiEndpoint.termsAndServicesPage;
    case "contact-us":
      return apiEndpoint.contactUsPage;
    case "home-page":
      return apiEndpoint.homePage;
    case "services":
      return apiEndpoint.servicePage;
    case "service-card":
      return apiEndpoint.serviceCard;
    case "serviceCard-detail":
      return apiEndpoint.serviceDetail;
    case "shopLatestBrands":
      return apiEndpoint.shopLatestOpening;
    case "eatLatestBrands":
      return apiEndpoint.eatLatestOpening
    case "service-card":
      return apiEndpoint.serviceCard;
    case "shopBrands":
      return apiEndpoint.shopBrands;
    case "latest-offers-eat":
      return apiEndpoint.latestOffersEat;
    case "latest-offers-shop":
      return apiEndpoint.latestOffersShop;
    case "category-detail":
      return apiEndpoint.categoryDetail;
    case "brand-detail":
      return apiEndpoint.brandDetail;
    case "latest-happening":
      return apiEndpoint.latestHappening;
    case "events":
      return apiEndpoint.events;
    case "event-detail":
      return apiEndpoint.eventDetail;
    case "offers":
      return apiEndpoint.offers;
    case "offers-page":
      return apiEndpoint.offerPage;
    case "offer-detail":
      return apiEndpoint.offerDetail;
    case "directory":
      return apiEndpoint.directory;
    case "cuisines":
      return apiEndpoint.cuisines;
    case "cuisines-category":
      return apiEndpoint.cuisinesCategory;
    case "amenities":
      return apiEndpoint.amenities;
    case "event-by-date":
      return apiEndpoint.eventsByDate;
    case "latest-opening-shop-page":
      return apiEndpoint.latestOpeningShopPage;
    case "latest-opening-eat-page":
      return apiEndpoint.latestOpeningEatPage;
    default:
      return "";
  }
};

export const getApiData = async (endPoint: string, slug?: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/${getParam(endPoint)}${slug ? `/${slug}?populate=*` : ""
      }`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
