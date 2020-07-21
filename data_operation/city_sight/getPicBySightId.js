/* eslint-disable camelcase */
import picSight from '../../data_src/city_sight/pic_sight';

function getPicBySightId(sight_id) {
  const picList = [];
  let num = 0;
  picSight.forEach(item => {
    if (item.tail === sight_id) {
      picList.push(item.head);
      num += 1;
    }
  });

  return { picList, num };
}

export default getPicBySightId;
