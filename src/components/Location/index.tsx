import { FocusContext, useFocusable } from '../../libs/spacial-navigation';
import { LocationStyled } from './style';

function LocationItem({ province, selectedCityCoords, changeCity }) {

  const { ref, focused }: FocusContext = useFocusable({
    onEnterPress: () => changeCity(province.coords.join(','), province.city),
  });

  return (
    <LocationStyled
      ref={ref}
      className={
        `${selectedCityCoords === province.coords.join(',') ? 'active' : ''} ${focused ? 'focused' : ''}`
      }
      data-coords={province.coords.join(',')}
      data-city={province.city}
      onClick={() => changeCity(province.coords.join(','), province.city)}>
      {province.title}
    </LocationStyled>
  )
}

export default LocationItem;
