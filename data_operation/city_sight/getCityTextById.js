import cityText from '../../data_src/city_sight/city_text';

function getCityTextById(city_id) {
  const text = {
    sovereign_state: 'default',
    total_area: 'default',
    total_population: 'default',
    time_zone: 'default',
  };
  cityText.forEach(item => {
    if (city_id === item.city_id) {
      text.sovereign_state = item.sovereign_state;
      text.total_area = item.total_area;
      text.total_population = item.total_population;
      text.time_zone = item.time_zone;
    }
  });

  return text;
}

export default getCityTextById;