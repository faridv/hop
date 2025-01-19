import React, { JSX, useEffect } from 'react';
import { loadSepehrCategories, loadSepehrChannels } from '../../utils/api';
import { AxiosResponse } from 'axios';
import Loading from '../../components/Loading';
import SepehrMainPage from '../../components/Sepehr/SepehrMainPage';

function Sepehr(): JSX.Element {

  const [categories, setCategories] = React.useState([]);
  const [channels, setChannels] = React.useState({});

  const loadCategories = (): void => {
    loadSepehrCategories()
      .then((response: AxiosResponse<any>) => {
        setCategories(response.data.data);
      });
  }

  const loadCategoryChannels = (id: number) => {
    loadSepehrChannels(id)
      .then((response) => {
        setChannels((prevChannels) => ({
          ...prevChannels,
          [id]: response.data.data
        }));
      });
  }

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (categories.length) {
      categories.forEach((category: any) => {
        loadCategoryChannels(category.id);
      });
    }
  }, [categories])

  return (
    Object.keys(channels).length > 1 && Object.keys(channels).length === categories.length
      ? (<SepehrMainPage categories={categories} channels={channels}/>)
      : (<Loading/>)
  );
}

export default Sepehr;
