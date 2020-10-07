import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../util/routes';
import {RouteProp} from '@react-navigation/native';
import {Quote} from '../../model';
import {Trade} from '../../screens/trade/results/types';

export type TradeStackParamList = {
  Trade: undefined;
  TradeForm: {quote: Quote};
  FormResults: undefined;
  OpenTrade: {trade: Trade};
};

/*
 * Configure navigation prop for the application's Trade tab
 */
export type TradeStackNavigationProp = StackNavigationProp<
  TradeStackParamList,
  ROUTES.Trade
>;

/*
 * Configure route prop for the application's Trade screens
 */
export type TradeStackRouteProp = RouteProp<TradeStackParamList, ROUTES.Trade>;

export type TradeStackProps = {
  navigation: TradeStackNavigationProp;
  route: TradeStackRouteProp;
};
