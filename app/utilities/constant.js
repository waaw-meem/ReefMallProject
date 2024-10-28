import moment from "moment";

export const apiEndpoint = {
  general:
    "general-page?[populate][logo]=*&[populate][menu]=*&[populate][topMenu]=*&[populate][floatingComponent][populate]=*&[populate][socialMedia],[populate][img]=*&[populate][bottomMenu]=*&[populate][footer],[populate][menu]=*&[populate][footerLogo]=*",
  shop: "shop-page?[populate][banner][populate]=*&[populate][exploreSection][populate]=*&[populate][latestOpeningSection][populate]=*&populate[seo][populate]=*",
  offer: `brand-offers?[populate][bannerImg][populate]=*&[populate][mainImg][populate]=*&[populate][brand][populate]=*&filters[endDate][$gte]=${moment().format(
    "yyyy-MM-DD"
  )}`,
  brandCategory:
    "brand-categories?[populate][desktopImg][populate]=*&[populate][mobileImg][populate]=*&[populate][brand][populate]=*&populate[seo][populate]=*",
  ShopCategories:
    "brand-categories?[populate][desktopImg][populate]=*&[populate][mobileImg][populate]=*&[populate][listingImg][populate]=*&[populate][brand][populate]=*&populate[seo][populate]=*&filters[type][$eqi]=shop",
  brands:
    "brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*",
  shopCategoryPage:
    "shop-category-page?[populate][banner][populate]=*&[populate][links][populate]=*&populate[seo][populate]=*",
  eatPage:
    "eat-page?[populate][banner][populate]=*&[populate][exploreSection][populate]=*&[populate][latestSection][populate]=*&populate[seo][populate]=*",
  eatBrands:
    "brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&filters[type][$eqi]=eat",
  eatBrandCategory:
    "brand-categories?[populate][desktopImg][populate]=*&[populate][mobileImg][populate]=*&[populate][listingImg][populate]=*&[populate][brand][populate]=*&filters[type][$eqi]=eat",
  categoryDetail: "brand-categories",
  eatCategoryPage:
    "eat-category-page?[populate][banner][populate]=*&populate[seo][populate]=*",
  giftCardPage:
    "gift-card-page?[populate][banner][populate]=*&[populate][tabs][populate]=*&[populate][headingSection][title][populate]=*&populate[seo][populate]=*",
  cards: "cards?[populate][img][populate]=*&[populate][links][populate]=*",
  cardDetail: "cards",
  privacyPolicyPage:
    "pivacy-page?[populate][banner][populate]=*&populate[seo][populate]=*",
  faqPage:
    "faq-page?[populate][banner][populate]=*&[populate][faqs][populate]=*&populate[seo][populate]=*",
  termsAndServicesPage:
    "terms-page?[populate][banner][populate]=*&populate[seo][populate]=*",
  contactUsPage:
    "contact-us?[populate][banner][populate]=*&[populate][headings][populate]=*&[populate][contactSection][populate]=*&[populate][getInTouchImg][populate]=*&[populate][locationSection][populate]=*&[populate][emailSection][populate]=*&[populate][phoneSection][populate]=*&[populate][socialMedia][populate]=values.img,icon&[populate][getInTouchSection][populate]=*&populate[seo][populate]=*",
  homePage:
    "home-page?[populate][banner][populate]=*&[populate][storeSection][populate]=*&[populate][serviceSection][populate]=*&[populate][amenitiesSection][populate]=*&[populate][amenities][populate]=*&populate[brands][populate]=*&populate[seo][populate]=*",
  servicePage:
    "service?[populate][banner][populate]=*&[populate][headings][populate]=*&populate[seo][populate]=*",
  serviceCard: "service-cards?[populate][img][populate]=*",
  serviceDetail: "service-cards",
  shopLatestOpening:
    "brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&filters[type][$eqi]=shop&filters[islatestOpening][$eq]=true",
  eatLatestOpening:
    "brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&filters[type][$eqi]=eat&filters[islatestOpening][$eq]=true",
  serviceCard: "service-cards?[populate][img][populate]=*",
  shopBrands:
    "brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&filters[type][$eqi]=shop",
  latestOffersEat: `brand-offers?populate=deep&filters[brand][type]=Eat&filters[endDate][$gte]=${moment().format(
    "yyyy-MM-DD"
  )}`,
  latestOffersShop: `brand-offers?populate=deep&filters[brand][type]=Shop&filters[endDate][$gte]=${moment().format(
    "yyyy-MM-DD"
  )}`,
  brandDetail: "brands",
  latestHappening:
    "latest-happening-page?[populate][banner][populate]=*&[populate][eventReserveSection][populate]=*&[populate][eventsHeadingSection][populate]=*&populate[seo][populate]=*",
  events: "events?[populate]=*",
  eventDetail: "events",
  offerPage:
    "offers-page?[populate][banner][populate]=*&populate[seo][populate]=*",
  offers: `brand-offers?[populate][bannerImg][populate]=*&[populate][mainImg][populate]=*&[populate][brand][populate]=*&[populate][desktopImg][populate]=*&[populate][mobileImg][populate]=*&[populate][firstSectionImg][populate]=*&filters[endDate][$gte]=${moment().format(
    "yyyy-MM-DD"
  )}`,
  offerDetail: "brand-offers",
  directory:
    "directory-page?[populate][banner][populate]=*&[populate][headings][populate]=*&populate[seo][populate]=*",
  cuisines:
    "cuisine-page?[populate][banner][populate]=*&populate[seo][populate]=*",
  cuisinesCategory: "cuisines?[populate][logo]=*&[populate][brands]=*",
  amenities:
    "amenities-page?[populate][banner][populate]=*&[populate][services][populate]=*&[populate][headings][populate]=*&populate[seo][populate]=*",
  eventsByDate: `events?[populate]=*&filters[date][$gte]=${moment().format(
    "yyyy-MM-DD"
  )}`,
  latestOpeningShopPage:
    "latest-happening-shop-page?[populate][banner][populate]=*&populate[seo][populate]=*",
  latestOpeningEatPage:
    "latest-happening-eat-page?[populate][banner][populate]=*&populate[seo][populate]=*",
};

// BrandOffer == SliderSections
// Brand == LatestOffers
// BrandCategory == BrandCategory
