import {I18nManager} from 'react-native';
import i18n from './i18n';
import RNRestart from 'react-native-restart';

export const handleLang = () => {
  if (i18n.language === 'en') {
    i18n.changeLanguage((i18n.language = 'he')).then(() => {
      I18nManager.forceRTL(true);
    });
    RNRestart.Restart();
  }
};
