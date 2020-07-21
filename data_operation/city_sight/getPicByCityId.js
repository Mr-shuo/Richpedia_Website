import picCity from '../../data_src/city_sight/pic_city';


function getPicByCityId(city_id) {
    const picList = [];
    let num = 0;
    picCity.forEach(item => {
      if (item.tail === city_id) {
        picList.push(item.head);
        num += 1;
      }
    });
  
    return { picList, num };
  }
  
  export default getPicByCityId;