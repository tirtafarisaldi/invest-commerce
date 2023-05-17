import SearchScreen from './SearchScreen';
import DetailNews from './News/DetailNews';
import AllNewsList from './News/AllNewsList';
import {CircleList, AssetList, PlayList} from './Trending';
import MerchantPromoBanner from './MerchantPromoBanner';
import MerchantPromoList from './MerchantPromoList';
import MerchantPromoDetail from './MerchantPromoDetail';
import AdsBanner from './AdsBanner';
import AdsBannerDetail from './AdsBannerDetail';
import Search from './Search';

export interface INews {
  id: number;
  title: string;
  author: string;
  link: string;
  videoUrl: string;
  imageUrl: string;
  content: string;
  sourceId: string;
  language: string;
  category: string;
  publicationDate: string;
  createdAt: string;
  updatedAt: string;
}
export interface DiscoverProps {}
export interface AllNewsListProps {}
export interface IDetailNews {}

export {default as Discover} from './DiscoverContainer';
export {
  SearchScreen,
  DetailNews,
  AllNewsList,
  CircleList,
  AssetList,
  MerchantPromoBanner,
  MerchantPromoList,
  MerchantPromoDetail,
  AdsBanner,
  AdsBannerDetail,
  Search,
  PlayList,
};
