import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { LocationStyled } from './style';

interface LocationItemProps {
  province: {
    title: string;
    city: string;
    coords: number[];
  };
  selectedCityCoords: string;
  changeCity: (coords: string, city: string) => void;
}

function LocationItem({ province, selectedCityCoords, changeCity }: LocationItemProps) {

  const { ref, focused } = useFocusable({
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
