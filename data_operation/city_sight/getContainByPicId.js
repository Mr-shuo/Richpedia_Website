import containRp from '../../data_src/city_sight/contain';

function getContainByPicId(pic_id) {
  const picList = [];
  containRp.forEach(item => {
    if (item.head === pic_id) picList.push(item.tail);
  });

  return picList;
}

export default getContainByPicId;